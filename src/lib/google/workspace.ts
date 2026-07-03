export interface GoogleWorkspaceConfig {
  clientId?: string;
  clientSecret?: string;
  redirectUri?: string;
  scopes?: string[];
  domain?: string;
}

export function getGoogleWorkspaceConfig(): GoogleWorkspaceConfig {
  return {
    clientId: process.env.GOOGLE_WORKSPACE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_WORKSPACE_CLIENT_SECRET,
    redirectUri: process.env.GOOGLE_WORKSPACE_REDIRECT_URI,
    scopes: (process.env.GOOGLE_WORKSPACE_SCOPES ?? "openid email profile https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/calendar.readonly").split(/\s+/).filter(Boolean),
    domain: process.env.GOOGLE_WORKSPACE_DOMAIN,
  };
}

export function getGoogleWorkspaceAuthUrl(state?: string): string {
  const config = getGoogleWorkspaceConfig();
  const params = new URLSearchParams({
    client_id: config.clientId ?? "",
    redirect_uri: config.redirectUri ?? "",
    response_type: "code",
    access_type: "offline",
    prompt: "consent",
    scope: (config.scopes ?? []).join(" "),
  });

  if (state) params.set("state", state);

  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

export function isGoogleWorkspaceConfigured(): boolean {
  const config = getGoogleWorkspaceConfig();
  return Boolean(config.clientId && config.clientSecret && config.redirectUri);
}
