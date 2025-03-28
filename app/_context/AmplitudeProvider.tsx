"use client";

import { PropsWithChildren, useEffect } from "react";
import * as amplitude from "@amplitude/analytics-browser";

export function AmplitudeProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    // Initialize Amplitude with your API key
    amplitude.init("80a8d1ddc831c33edb06d0b69f136674", {
      // Enable automatic session tracking
      defaultTracking: {
        sessions: true,
        pageViews: true,
        formInteractions: true,
        fileDownloads: true,
      },
    });

    // Log page view on initial load
    amplitude.track("Page View", {
      path: window.location.pathname,
      url: window.location.href,
    });
  }, []);

  return <>{children}</>;
}

export default AmplitudeProvider;
