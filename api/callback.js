export default async function handler(req, res) {
  const code = req.query.code;
  if (!code) return res.redirect("/");

  const data = new URLSearchParams({
    client_id: process.env.DISCORD_CLIENT_ID,
    client_secret: process.env.DISCORD_CLIENT_SECRET,
    grant_type: "authorization_code",
    code,
    redirect_uri: process.env.DISCORD_REDIRECT_URI,
    scope: "identify"
  });

  const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: data
  });

  const token = await tokenRes.json();

  const userRes = await fetch("https://discord.com/api/users/@me", {
    headers: { Authorization: `Bearer ${token.access_token}` }
  });

  const user = await userRes.json();

  // 👉 ЧІТКИЙ редірект на 2 сторінку
  res.redirect(
    `/pass.html?id=${user.id}&username=${encodeURIComponent(user.username)}&avatar=${user.avatar}`
  );
}
