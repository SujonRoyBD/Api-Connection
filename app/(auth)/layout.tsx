"use client";

import React, { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <html lang="en">
      <body>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f0f4f8",
            padding: "2rem",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "400px",
              backgroundColor: "#fff",
              padding: "2rem",
              borderRadius: "8px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            {/* তুমি চাইলে এখানে লোগো বা টাইটেল দিতে পারো */}
            <h1 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              Welcome to Auth
            </h1>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
