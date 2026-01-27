export default function handler(req, res) {
  const clientId = process.env.DISCORD_CLIENT_ID;
  const redirectUri = process.env.DISCORD_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    return res.status(500).send("Missing env variables");
  }

  const discordAuthUrl =
    "https://discord.com/api/oauth2/authorize" +
    `?client_id=${clientId}` +
    "&response_type=code" +
    "&scope=identify" +
    `&redirect_uri=${encodeURIComponent(redirectUri)}`;

  res.redirect(discordAuthUrl);
}
