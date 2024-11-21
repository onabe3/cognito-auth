import { NextResponse } from "next/server"; // Next.jsのレスポンスヘルパーをインポート
import { userPool } from "@/lib/cognito"; // Cognitoの設定をインポート
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js"; // Cognito関連のクラスをインポート

export async function POST(request: Request) {
  // POSTリクエスト用のハンドラー
  const { email, password } = await request.json(); // リクエストボディからemailとpasswordを取得

  // Cognitoユーザーオブジェクトを作成
  const user = new CognitoUser({
    Username: email, // ユーザー名（ここではemailを使用）
    Pool: userPool, // Cognitoのユーザープール情報
  });

  // 認証詳細オブジェクトを作成
  const authDetails = new AuthenticationDetails({
    Username: email, // 認証に使用するユーザー名
    Password: password, // 認証に使用するパスワード
  });

  // Promiseを利用して非同期処理をラップ
  return new Promise((resolve) => {
    // authenticateUserでユーザーを認証
    user.authenticateUser(authDetails, {
      // 認証成功時のコールバック
      onSuccess: (result) => {
        resolve(
          NextResponse.json({
            message: "Sign-in successful!", // 成功メッセージ
            token: result.getIdToken().getJwtToken(), // JWTトークンを返す（IDトークンを取得）
          })
        );
      },
      // 認証失敗時のコールバック
      onFailure: (err) => {
        resolve(
          NextResponse.json({ error: err.message }, { status: 401 }) // エラーメッセージと401ステータスを返す
        );
      },
    });
  });
}
