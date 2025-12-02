"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [message, setMessage] = useState("Loading...");

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
    </div>
  );
}
