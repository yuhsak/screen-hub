import { combine, str } from 'envvv'

const parse = combine([str('GA4_TRACKING_ID')()])

export const { GA4_TRACKING_ID } = parse({
  GA4_TRACKING_ID: import.meta.env.VITE_GA4_TRACKING_ID,
})
