"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackEvent, trackPageView, AmplitudeEvent, EventProperties } from "@/lib/analytics";

/**
 * Hook for tracking analytics events
 * @returns Object with track function for tracking events
 */
export const useAnalytics = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track page views automatically
  useEffect(() => {
    // Track page view when pathname changes
    if (pathname) {
      trackPageView(pathname);
    }
  }, [pathname, searchParams]);

  /**
   * Track an event in Amplitude
   * @param eventName The name of the event to track
   * @param properties Optional properties to include with the event
   */
  const track = (eventName: AmplitudeEvent, properties?: EventProperties) => {
    trackEvent(eventName, properties);
  };

  return { track };
};

export default useAnalytics;
