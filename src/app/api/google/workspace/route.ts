import { NextResponse } from "next/server";
import { getGoogleWorkspaceAuthUrl, isGoogleWorkspaceConfigured } from "@/lib/google/workspace";

export async function GET() {
  if (!isGoogleWorkspaceConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        error: "Google Workspace n'est pas encore configuré. Ajoutez GOOGLE_WORKSPACE_CLIENT_ID, GOOGLE_WORKSPACE_CLIENT_SECRET et GOOGLE_WORKSPACE_REDIRECT_URI.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    authUrl: getGoogleWorkspaceAuthUrl(),
  });
}
