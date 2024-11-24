import { useEffect } from 'react'

export function GA4({ trackingId }: { trackingId: string }) {
  useEffect(() => {
    const head = document.querySelector('head')
    if (!head) return

    const baseScript = document.createElement('script')
    baseScript.async = true
    baseScript.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`

    const initScript = document.createElement('script')
    initScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${trackingId}');
    `

    head.appendChild(baseScript)
    head.appendChild(initScript)

    return () => {
      baseScript.remove()
      initScript.remove()
    }
  }, [trackingId])

  return null
}
