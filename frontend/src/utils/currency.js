/**
 * Currency utility — maps property countries to their local currencies
 * and converts/formats prices accordingly.
 *
 * Prices in the DB are stored in USD.
 * Exchange rates are approximate and static (update periodically).
 */

// country name → { currency code, locale, rate from USD }
const COUNTRY_CURRENCY_MAP = {
  // South Asia
  'india':              { code: 'INR', locale: 'en-IN',  rate: 83.5 },
  'pakistan':           { code: 'PKR', locale: 'en-PK',  rate: 278 },
  'bangladesh':         { code: 'BDT', locale: 'bn-BD',  rate: 110 },
  'sri lanka':          { code: 'LKR', locale: 'si-LK',  rate: 305 },
  'nepal':              { code: 'NPR', locale: 'ne-NP',  rate: 133 },

  // Southeast Asia
  'thailand':           { code: 'THB', locale: 'th-TH',  rate: 35.5 },
  'indonesia':          { code: 'IDR', locale: 'id-ID',  rate: 15800 },
  'malaysia':           { code: 'MYR', locale: 'ms-MY',  rate: 4.7 },
  'vietnam':            { code: 'VND', locale: 'vi-VN',  rate: 24800 },
  'philippines':        { code: 'PHP', locale: 'fil-PH', rate: 56.5 },
  'singapore':          { code: 'SGD', locale: 'en-SG',  rate: 1.35 },

  // East Asia
  'japan':              { code: 'JPY', locale: 'ja-JP',  rate: 149 },
  'china':              { code: 'CNY', locale: 'zh-CN',  rate: 7.2 },
  'south korea':        { code: 'KRW', locale: 'ko-KR',  rate: 1325 },
  'taiwan':             { code: 'TWD', locale: 'zh-TW',  rate: 31.5 },

  // Europe
  'germany':            { code: 'EUR', locale: 'de-DE',  rate: 0.92 },
  'france':             { code: 'EUR', locale: 'fr-FR',  rate: 0.92 },
  'italy':              { code: 'EUR', locale: 'it-IT',  rate: 0.92 },
  'spain':              { code: 'EUR', locale: 'es-ES',  rate: 0.92 },
  'netherlands':        { code: 'EUR', locale: 'nl-NL',  rate: 0.92 },
  'portugal':           { code: 'EUR', locale: 'pt-PT',  rate: 0.92 },
  'greece':             { code: 'EUR', locale: 'el-GR',  rate: 0.92 },
  'united kingdom':     { code: 'GBP', locale: 'en-GB',  rate: 0.79 },
  'uk':                 { code: 'GBP', locale: 'en-GB',  rate: 0.79 },
  'switzerland':        { code: 'CHF', locale: 'de-CH',  rate: 0.9 },
  'sweden':             { code: 'SEK', locale: 'sv-SE',  rate: 10.5 },
  'norway':             { code: 'NOK', locale: 'nb-NO',  rate: 10.7 },
  'denmark':            { code: 'DKK', locale: 'da-DK',  rate: 6.9 },
  'turkey':             { code: 'TRY', locale: 'tr-TR',  rate: 32 },
  'russia':             { code: 'RUB', locale: 'ru-RU',  rate: 90 },

  // Middle East
  'uae':                { code: 'AED', locale: 'ar-AE',  rate: 3.67 },
  'united arab emirates': { code: 'AED', locale: 'ar-AE', rate: 3.67 },
  'saudi arabia':       { code: 'SAR', locale: 'ar-SA',  rate: 3.75 },
  'qatar':              { code: 'QAR', locale: 'ar-QA',  rate: 3.64 },
  'kuwait':             { code: 'KWD', locale: 'ar-KW',  rate: 0.31 },

  // Americas
  'canada':             { code: 'CAD', locale: 'en-CA',  rate: 1.36 },
  'mexico':             { code: 'MXN', locale: 'es-MX',  rate: 17.5 },
  'brazil':             { code: 'BRL', locale: 'pt-BR',  rate: 5.0 },
  'argentina':          { code: 'ARS', locale: 'es-AR',  rate: 870 },
  'colombia':           { code: 'COP', locale: 'es-CO',  rate: 3900 },

  // Oceania
  'australia':          { code: 'AUD', locale: 'en-AU',  rate: 1.53 },
  'new zealand':        { code: 'NZD', locale: 'en-NZ',  rate: 1.63 },

  // Africa
  'south africa':       { code: 'ZAR', locale: 'en-ZA',  rate: 18.5 },
  'kenya':              { code: 'KES', locale: 'en-KE',  rate: 133 },
  'nigeria':            { code: 'NGN', locale: 'en-NG',  rate: 1570 },
  'egypt':              { code: 'EGP', locale: 'ar-EG',  rate: 48.5 },
  'morocco':            { code: 'MAD', locale: 'ar-MA',  rate: 10.1 },

  // Default / United States
  'usa':                { code: 'USD', locale: 'en-US',  rate: 1 },
  'united states':      { code: 'USD', locale: 'en-US',  rate: 1 },
  'us':                 { code: 'USD', locale: 'en-US',  rate: 1 },
}

/**
 * Get currency info for a given country string.
 * Falls back to USD if country is unknown.
 */
export function getCurrencyForCountry(country = '') {
  const key = country.trim().toLowerCase()
  return COUNTRY_CURRENCY_MAP[key] || { code: 'USD', locale: 'en-US', rate: 1 }
}

/**
 * Format a USD price into the local currency of the given country.
 * @param {number} priceInUSD  - price stored in DB (USD)
 * @param {string} country     - country name from the listing
 * @param {object} options
 * @param {boolean} options.compact - use compact notation (e.g. ₹8.3K)
 * @returns {string} formatted price string
 */
export function formatPrice(priceInUSD, country = '', options = {}) {
  const { code, locale, rate } = getCurrencyForCountry(country)
  const converted = Math.round(priceInUSD * rate)

  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: code,
      maximumFractionDigits: code === 'JPY' || code === 'KRW' || code === 'IDR' || code === 'VND' ? 0 : 0,
      notation: options.compact ? 'compact' : 'standard',
    }).format(converted)
  } catch {
    // Fallback if Intl fails
    return `${code} ${converted.toLocaleString()}`
  }
}

/**
 * Get just the currency symbol for a country.
 */
export function getCurrencySymbol(country = '') {
  const { code, locale } = getCurrencyForCountry(country)
  try {
    return (0).toLocaleString(locale, { style: 'currency', currency: code, minimumFractionDigits: 0 })
      .replace(/[\d,.\s]/g, '')
      .trim()
  } catch {
    return code
  }
}
