"use client";
import React, { useContext } from "react";
import Listing from "./_components/Listing";
import { useSearchParams } from "next/navigation";
import { UserDataContext } from "@/app/_context/UserDataContext";

interface PageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

function Dashboard() {
  // Use non-null assertion or provide a fallback empty object
  const searchParams = useSearchParams()!;
  const sessionId = searchParams.get("session_id");
  const { userDetail } = useContext(UserDataContext);

  // If you want to show a quick success message:
  if (sessionId) {
    // e.g. show "Thank you for your purchase" or similar
    console.log("Stripe session ID:", sessionId);
  }

  return (
    <div>
      <Listing />
    </div>
  );
}

export default Dashboard;