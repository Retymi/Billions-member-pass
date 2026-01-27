// ===== ELEMENTS =====
const btn = document.getElementById("actionBtn");
const username = document.getElementById("username");
const line1 = document.getElementById("line1");
const line2 = document.getElementById("line2");
const rightText = document.getElementById("rightText");
const memberId = document.getElementById("memberId");
const footer = document.getElementById("footer");
const avatar = document.getElementById("avatar");

// ===== FIREFLIES =====
const firefliesContainer = document.querySelector(".fireflies");
for (let i = 0; i < 60; i++) {
  const f = document.createElement("div");
  f.className = "firefly";
  f.style.left = Math.random() * 100 + "%";
  f.style.top = Math.random() * 100 + "%";
  f.style.animationDuration = 25 + Math.random() * 25 + "s";
  firefliesContainer.appendChild(f);
}

// ===== SERVER API =====
async function fetchUserFromServer(discordUser) {
  const res = await fetch("/api/user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      discord_id: discordUser.id,
      username: discordUser.username,
      avatar: discordUser.avatar
    })
  });
  return await res.json();
}

// ===== BUTTON =====
btn.addEventListener("click", async () => {
  const params = new URLSearchParams(window.location.search);

  if (!params.has("username")) {
    window.location.href = "/api/login";
    return;
  }

  const card = document.querySelector(".card");
  card.classList.add("exporting");

  const canvas = await html2canvas(card, {
    scale: 2,
    backgroundColor: "#050b16",
    useCORS: true
  });

  card.classList.remove("exporting");

  const image = canvas.toDataURL("image/png");

  const link = document.createElement("a");
  link.href = image;
  link.download = "billions-member-pass.png";
  link.click();

  const text = encodeURIComponent(
    "MEMBER PASS OF @billions_ntwk\n\n" +
    "I am a member of the community @jgonzalezferrer\n" +
    "Thank you @VovaVovavolik for such a Card\n\n" +
    "👉 https://YOUR-SITE-LINK"
  );

  window.open(
    `https://twitter.com/intent/tweet?text=${text}`,
    "_blank"
  );
});

// ===== AFTER LOGIN =====
(async () => {
  const params = new URLSearchParams(window.location.search);
  if (!params.has("username")) return;

  const discordUser = {
    id: params.get("id"),
    username: params.get("username"),
    avatar: params.get("avatar")
  };

  const userData = await fetchUserFromServer(discordUser);
  const formatted = String(userData.number).padStart(4, "0");

  username.textContent = userData.username;
  line1.textContent = `#${formatted}`;
  line2.textContent = "Member since Jan 2026";
  rightText.textContent = "YOU ARE IN THE COMMUNITY";

  const year = new Date().getFullYear();
  memberId.textContent = `BLN-${year}-${formatted}`;

  avatar.textContent = "";
  avatar.style.backgroundImage =
    `url(https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png)`;
  avatar.style.backgroundSize = "cover";
  avatar.style.backgroundRepeat = "no-repeat";

  btn.textContent = "Share on X";
  footer.style.display = "block";
})();

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const username = params.get("username");

if (id && username) {
  document.querySelector("#pass").style.display = "block";
  document.querySelector("#user").textContent =
    `Connected as ${username} (ID: ${id})`;
}
