import * as ethers from 'ethers'
import { CONTRACT_ABI } from '../resources/contractABI'

function trimDecimalsString(s, maxDecimals = 4) {
  if (typeof s !== 'string') return String(s)
  if (!s.includes('.')) return s
  // Limit to maxDecimals without rounding artifacts
  const [intPart, decPart] = s.split('.')
  const trimmed = decPart.slice(0, maxDecimals)
  // remove trailing zeros
  const decClean = trimmed.replace(/0+$/, '')
  return decClean ? `${intPart}.${decClean}` : intPart
}

function formatLargeNumberWithCommas(s) {
  // only format integer-like strings
  if (typeof s !== 'string') s = String(s)
  if (s.includes('.')) return s
  return s.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * getTokenCount - attempts to get a token balance for an account from a contract
 * Returns string representation of the balance (formatted using decimals when available) or null if unavailable
 */
export async function getTokenCount(account, contractAddress) {
  if (!account || !contractAddress) return null

  try {
    if (!window.ethereum) {
      console.warn('No web3 provider available')
      return null
    }

    // Support ethers v5 and v6 provider APIs
    let provider
    if (ethers && ethers.providers && ethers.providers.Web3Provider) {
      provider = new ethers.providers.Web3Provider(window.ethereum)
    } else if (ethers && ethers.BrowserProvider) {
      provider = new ethers.BrowserProvider(window.ethereum)
    } else {
      console.error('No compatible ethers Web3 provider class found')
      return null
    }

    const contract = new ethers.Contract(contractAddress, CONTRACT_ABI, provider)

    // Try balanceOf (common for ERC20 and ERC721)
    let rawBalance = null
    try {
      rawBalance = await contract.balanceOf(account)
    } catch (err) {
      // balanceOf may throw if signature mismatch — bail out
      console.warn('balanceOf call failed', err)
      return null
    }

    if (rawBalance == null) return null

    // If contract exposes decimals (ERC20), format the value accordingly
    try {
      if (contract.decimals) {
        const decimals = await contract.decimals()
        const dec = (decimals && decimals.toNumber) ? decimals.toNumber() : Number(decimals)
        // formatUnits helper: support ethers v5 (utils.formatUnits) and v6 (formatUnits)
        const formatUnits = (ethers.utils && ethers.utils.formatUnits) ? ethers.utils.formatUnits : ethers.formatUnits
        // formatUnits returns a string with full precision; we trim for UI
        const formatted = formatUnits(rawBalance, dec)
        const trimmed = trimDecimalsString(formatted, 4)
        // remove trailing . if any and format large integers with commas
        if (!trimmed.includes('.')) return formatLargeNumberWithCommas(trimmed)
        return trimmed
      }
    } catch (err) {
      // decimals not available or failed — fallback to integer representation
    }

    const integer = rawBalance.toString()
    return formatLargeNumberWithCommas(integer)
  } catch (err) {
    console.error('getTokenCount error', err)
    return null
  }
}

export default { getTokenCount }
