import { GA4_TRACKING_ID } from '@/config/env'
import { GA4 } from '@/components/script/ga4'

export function GoogleAnalytics() {
  return !!GA4_TRACKING_ID ? <GA4 trackingId={GA4_TRACKING_ID} /> : null
}
