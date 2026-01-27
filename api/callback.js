export default async function handler(req, res) {
  const code = req.query.code;
  if (!code) return res.redirect("/");

  const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.DISCORD_CLIENT_ID,
      client_secret: process.env.DISCORD_CLIENT_SECRET,
      grant_type: "authorization_code",
      code,
      redirect_uri: process.env.DISCORD_REDIRECT_URI
    })
  });

  const token = await tokenRes.json();

  if (!token.access_token) {
    return res.status(500).send("No access token from Discord");
  }

  const userRes = await fetch("https://discord.com/api/users/@me", {
    headers: {
      Authorization: `Bearer ${token.access_token}`
    }
  });

  const user = await userRes.json();

  res.redirect(
    `/index.html?username=${user.username}&id=${user.id}&avatar=${user.avatar}`
  );
}
