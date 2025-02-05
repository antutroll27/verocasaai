'use client';
import ReactCookieBot from "react-cookiebot";

const ClientCookieBot = () => {
  const COOKIE_BOT_ID = "1676e844-56d7-414d-83b3-e79ae790129b";
  return <ReactCookieBot domainGroupId={COOKIE_BOT_ID} />;
};

export default ClientCookieBot;