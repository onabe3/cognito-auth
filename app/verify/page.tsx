"use client";

import { useState } from "react"; // 状態管理用のフックをインポート
import { useRouter } from "next/navigation"; // ページ遷移用のルーターをインポート

export default function VerifyPage() {
  // 入力フィールドの状態を管理するためのフック
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter(); // ページ遷移用のインスタンス

  // アカウント確認処理
  async function handleVerify(e: React.FormEvent) {
    e.preventDefault(); // フォーム送信時のデフォルト動作を停止
    const res = await fetch("/api/auth/verify", {
      method: "POST", // POST リクエストで確認処理を呼び出す
      headers: {
        "Content-Type": "application/json", // JSON データを送信するためのヘッダーを設定
      },
      body: JSON.stringify({ email, code }), // メールアドレスと確認コードをリクエストに含める
    });

    const data = await res.json(); // レスポンスデータを JSON として解析

    if (data.error) {
      // エラーがあればメッセージを表示
      setMessage(`Error: ${data.error}`);
    } else {
      // 確認が成功した場合の処理
      setMessage("Verification successful! Redirecting to sign-in...");
      setTimeout(() => {
        router.push("/signin"); // サインインページにリダイレクト
      }, 2000);
    }
  }

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        textAlign: "center",
      }}
    >
      <h1>Verify Account</h1>
      {/* 確認用のフォーム */}
      <form
        onSubmit={handleVerify}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        {/* メールアドレス入力フィールド */}
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
        {/* 確認コード入力フィールド */}
        <input
          type="text"
          placeholder="Verification Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "16px",
          }}
        />
        {/* 確認ボタン */}
        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Verify
        </button>
      </form>
      {/* メッセージを表示 */}
      {message && (
        <p
          style={{
            marginTop: "20px",
            color: message.startsWith("Error") ? "red" : "green",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}
