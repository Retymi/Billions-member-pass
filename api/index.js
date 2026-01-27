const express = require("express");
const fs = require("fs");
const path = require("path");

// fetch для Node
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const app = express();

// 🔐 DISCORD DATA (ПІДСТАВ СВОЇ)
const CLIENT_ID = "1463949874553950353";
const CLIENT_SECRET = "IkojOVDAlRTGfoCZfOpoyDmI6M5GsYaj";
const REDIRECT_URI = "http://localhost:3000/callback";

// 📦 DB
const DB_PATH = path.join(__dirname, "db.json");

function readDB() {
  return JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
}

function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

app.use(express.json());
app.use(express.static("public"));

/* ===== DISCORD LOGIN ===== */

app.get("/login", (req, res) => {
  const url =
    "https://discord.com/api/oauth2/authorize" +
    `?client_id=${CLIENT_ID}` +
    "&response_type=code" +
    "&scope=identify" +
    `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;

  res.redirect(url);
});

app.get("/callback", async (req, res) => {
  const code = req.query.code;
  if (!code) return res.redirect("/");

  // 1️⃣ code → token
  const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI
    })
  });

  const tokenData = await tokenRes.json();

  // 2️⃣ token → user
  const userRes = await fetch("https://discord.com/api/users/@me", {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`
    }
  });

  const discordUser = await userRes.json();

  res.redirect(
    `/index.html?username=${discordUser.username}` +
    `&id=${discordUser.id}` +
    `&avatar=${discordUser.avatar}`
  );
});

/* ===== USER API (DB + ORDER) ===== */

app.post("/api/user", (req, res) => {
  const { discord_id, username, avatar } = req.body;
  if (!discord_id) return res.status(400).json({ error: "No discord_id" });

  const db = readDB();

  if (!db.users[discord_id]) {
    db.users[discord_id] = {
      username,
      avatar,
      number: db.counter,
      joined: "2026-01"
    };
    db.counter++;
    writeDB(db);
  }

  res.json(db.users[discord_id]);
});

/* ===== START ===== */

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
