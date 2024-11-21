import { NextResponse } from "next/server";
import { CognitoUser } from "amazon-cognito-identity-js"; // CognitoUser クラスをインポート
import { userPool } from "@/lib/cognito"; // ユーザープールの設定をインポート

export async function POST(request: Request) {
  // リクエストから JSON を解析してメールアドレスとコードを取得
  const { email, code } = await request.json();

  return new Promise((resolve) => {
    // 指定したメールアドレスで CognitoUser インスタンスを作成
    const user = new CognitoUser({ Username: email, Pool: userPool });

    // アカウント確認処理を実行
    user.confirmRegistration(code, true, (err, result) => {
      if (err) {
        // エラーがあればエラーメッセージを返す
        resolve(NextResponse.json({ error: err.message }, { status: 400 }));
      } else {
        // 確認が成功した場合は成功メッセージを返す
        resolve(
          NextResponse.json({
            message: "Verification successful!",
            result, // 結果をレスポンスに含める
          })
        );
      }
    });
  });
}
