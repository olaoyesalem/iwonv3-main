"use client";
import { useRef } from "react";
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";

export default function TawkChat() {
  const tawkMessengerRef = useRef<any>();

  return (
    <>
      <TawkMessengerReact
        propertyId="6747a7792480f5b4f5a4dfac"
        widgetId="1idnuccs3"
        useRef={tawkMessengerRef}
      />
    </>
  );
}

// https://tawk.to/chat/6747a7792480f5b4f5a4dfac/1idnuccs3
