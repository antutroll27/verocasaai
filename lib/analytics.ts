"use client";

import * as amplitude from "@amplitude/analytics-browser";

// Event types for better type safety
export type AmplitudeEvent = 
  | "Page View" 
  | "Button Click"
  | "Form Submit"
  | "Sign Up"
  | "Login"
  | "Subscription Started"
  | "AI Design Generated"
  | "Image Upload"
  | "Search"
  | "Filter Applied"
  | "Feature Used";

// Properties interface for type safety
export interface EventProperties {
  [key: string]: any;
}

/**
 * Track an event in Amplitude
 * @param eventName The name of the event to track
 * @param properties Optional properties to include with the event
 */
export const trackEvent = (eventName: AmplitudeEvent, properties?: EventProperties) => {
  try {
    amplitude.track(eventName, properties);
  } catch (error) {
    console.error("Error tracking event:", error);
  }
};

/**
 * Set user properties in Amplitude
 * @param userId The user's ID
 * @param userProperties Properties to set for the user
 */
export const setUserProperties = (userId: string, userProperties: Record<string, any>) => {
  try {
    amplitude.setUserId(userId);
    const identify = new amplitude.Identify();
    
    // Add each property to the identify object
    Object.entries(userProperties).forEach(([key, value]) => {
      identify.set(key, value);
    });
    
    amplitude.identify(identify);
  } catch (error) {
    console.error("Error setting user properties:", error);
  }
};

/**
 * Track a page view in Amplitude
 * @param path The path of the page
 */
export const trackPageView = (path: string) => {
  trackEvent("Page View", {
    path,
    url: typeof window !== "undefined" ? window.location.href : "",
    referrer: typeof document !== "undefined" ? document.referrer : "",
  });
};
