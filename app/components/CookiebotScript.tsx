'use client';

import Script from 'next/script';

export default function CookiebotScript() {
  return (
    <Script
      id="cookiebot"
      src="https://consent.cookiebot.com/uc.js"
      data-cbid="ddc2c77e-ef0f-4e9c-ba2b-66cf1aa817ce"
      data-blockingmode="auto"
      strategy="lazyOnload"
      onLoad={() => {
        // Ensure Swiper is loaded before Cookiebot tries to access it
        if (typeof window !== 'undefined' && window.Swiper) {
          window.CookieControl?.init();
        }
      }}
    />
  );
}
