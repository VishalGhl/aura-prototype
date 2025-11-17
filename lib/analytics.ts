// Simple usage tracking
export function trackEvent(event: string, data?: any) {
  console.log('📊 Analytics:', event, data)
  // In production: Send to analytics service
}

export function trackPageView() {
  trackEvent('page_view', { page: window.location.pathname })
}

export function trackConnection(service: string) {
  trackEvent('service_connected', { service })
}