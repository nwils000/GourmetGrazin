// Single source of truth for the Google Business Profile rating shown on the
// site and emitted in `aggregateRating` schema. Update both values together
// whenever the profile's review count changes.
// A string, so React renders "5.0" rather than collapsing the number to "5".
export const REVIEW_RATING = '5.0'
export const REVIEW_COUNT = 45
export const REVIEW_PROFILE_URL =
  'https://www.google.com/search?q=Gourmet+Grazin%E2%80%99&stick=H4sIAAAAAAAA_-NgU1I1qDBJTDRPS0kyTDFOSTFMMkmxMqiwMDdJM0o0S7NMTk0zSktNWsQq6J5fWpSbWqLgXpRYlZn3qGEmABclvzg9AAAA'
