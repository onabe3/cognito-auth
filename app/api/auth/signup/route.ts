import { NextResponse } from "next/server";
import { userPool } from "@/lib/cognito";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";

export async function POST(request: Request) {
  const { password, email } = await request.json();

  return new Promise((resolve) => {
    const attributes = [
      new CognitoUserAttribute({
        Name: "email",
        Value: email,
      }),
    ];

    userPool.signUp(email, password, attributes, [], (err, result) => {
      if (err) {
        resolve(NextResponse.json({ error: err.message }, { status: 400 }));
        return;
      }

      resolve(
        NextResponse.json({
          message: "User signed up successfully!",
          user: result?.user?.getUsername(),
        })
      );
    });
  });
}
