import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  if (!code) {
    return NextResponse.json(
      {
        ok: false,
        error: "Le code d’autorisation Google est absent.",
      },
      { status: 400 }
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Callback OAuth Google reçu. À brancher à l’échange de jetons Google.",
    code,
    state,
  });
}
