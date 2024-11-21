"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignoutPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    // ローカルストレージからemailを取得
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail); // emailを表示するためにセット
    }
  }, []);

  function handleSignout() {
    // サインアウト時の処理
    localStorage.removeItem("token"); // トークンを削除
    localStorage.removeItem("email"); // emailを削除
    router.push("/signin"); // サインイン画面へ遷移
  }

  return (
    <div>
      <header>
        <div style={{ position: "absolute", top: 10, right: 10 }}>
          {/* emailを右上に表示 */}
          <span>Signed in as: {email}</span>
        </div>
      </header>
      <main>
        <button onClick={handleSignout}>Sign Out</button>
      </main>
    </div>
  );
}
