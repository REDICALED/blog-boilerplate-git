"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [message, setMessage] = useState("Loading...");
  const cloudflareId = process.env.NEXT_PUBLIC_R2_URL;
  const imgUrl = `${cloudflareId}/test.jpg`;

  useEffect(() => {
    fetch("/api/test")
      .then(res => res.text())
      .then(text => setMessage(text))
      .catch(err => setMessage("Error: " + err));
  }, []);

  return (
    <div>
      <h1>D1 & R2 Test</h1>
      <p>{message}</p>
      <img src={imgUrl} alt="Test Image" />
    </div>
  );
}
