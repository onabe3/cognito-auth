"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter(); // ルーターを取得

  async function handleSignin(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (data.error) {
      setMessage(`Error: ${data.error}`);
    } else {
      // トークンとユーザー情報を保存
      localStorage.setItem("token", data.token); // JWTトークンを保存
      localStorage.setItem("email", email); // emailを保存
      // サインアウトページに遷移
      router.push("/signout");
    }
  }

  return (
    <div
      style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}
    >
      <h1>Sign In</h1>
      <form
        onSubmit={handleSignin}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "16px",
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "16px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#28A745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Sign In
        </button>
      </form>
      {message && <p style={{ marginTop: "20px", color: "red" }}>{message}</p>}
      <p style={{ marginTop: "10px" }}>
        Don&apos;t have an account?
        <a href="/signup" style={{ color: "#007BFF" }}>
          Sign Up
        </a>
      </p>
    </div>
  );
}
