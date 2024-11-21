import { NextResponse } from "next/server";
import { userPool } from "@/lib/cognito";
import { CognitoUser } from "amazon-cognito-identity-js";

export async function POST(request: Request) {
  const { username } = await request.json();

  const user = new CognitoUser({
    Username: username,
    Pool: userPool,
  });

  user.signOut();
  return NextResponse.json({ message: "User signed out successfully!" });
}
