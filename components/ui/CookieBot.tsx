'use client';
import ReactCookieBot from "react-cookiebot";
import { useEffect } from 'react';

const ClientCookieBot = () => {
  const COOKIE_BOT_ID = "1676e844-56d7-414d-83b3-e79ae790129b";
  
  useEffect(() => {
    console.log('CookieBot mounting with ID:', COOKIE_BOT_ID);
    // Log if CookieBot script is loaded
    const cookiebotScript = document.querySelector('script[src*="cookiebot.com"]');
    console.log('CookieBot script found:', !!cookiebotScript);
  }, []);

  return (
    <ReactCookieBot 
      domainGroupId={COOKIE_BOT_ID}
      language="en"
      culture="en"
      debug={true}
    />
  );
};

export default ClientCookieBot;