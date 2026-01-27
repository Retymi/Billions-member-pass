export default function handler(req, res) {
  const cookie = req.headers.cookie;
  if (!cookie) {
    return res.json({ connected: false });
  }

  const match = cookie.match(/user=([^;]+)/);
  if (!match) {
    return res.json({ connected: false });
  }

  const user = JSON.parse(decodeURIComponent(match[1]));
  res.json({ connected: true, user });
}
