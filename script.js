// ===== ELEMENTS =====
const btn = document.getElementById("actionBtn");
const username = document.getElementById("username");
const line1 = document.getElementById("line1");
const line2 = document.getElementById("line2");
const rightText = document.getElementById("rightText");
const memberId = document.getElementById("memberId");
const footer = document.getElementById("footer");
const avatar = document.getElementById("avatar");

// ===== FIREFLIES (SAFE) =====
const firefliesContainer = document.querySelector(".fireflies");

if (firefliesContainer) {
  for (let i = 0; i < 60; i++) {
    const f = document.createElement("div");
    f.className = "firefly";
    f.style.left = Math.random() * 100 + "%";
    f.style.top = Math.random() * 100 + "%";
    f.style.animationDuration = 25 + Math.random() * 25 + "s";
    firefliesContainer.appendChild(f);
  }
}

// ===== BUTTON (LOGIN / SHARE) =====
btn.addEventListener("click", async () => {
  const params = new URLSearchParams(window.location.search);

  // 🔹 НЕ ЗАЛОГІНЕНИЙ → DISCORD LOGIN
  if (!params.has("username")) {
    window.location.href = "/api/login";
    return;
  }

  // 🔹 ЗАЛОГІНЕНИЙ → SHARE
  const card = document.querySelector(".card");
  if (!card) {
    alert("ERROR: card not found");
    return;
  }

  if (typeof html2canvas === "undefined") {
    alert("ERROR: html2canvas not loaded");
    return;
  }

  card.classList.add("exporting");

  const canvas = await html2canvas(card, {
    scale: 2,
    backgroundColor: "#050b16",
    useCORS: true,
    allowTaint: true
  });

  card.classList.remove("exporting");

  const image = canvas.toDataURL("image/png");

  // 🔹 AUTO DOWNLOAD
  const link = document.createElement("a");
  link.href = image;
  link.download = "billions-member-pass.png";
  link.click();

  // 🔹 TEXT FOR X
  const text = encodeURIComponent(
    "MEMBER PASS OF @billions_ntwk\n\n" +
    "I am a member of the community . We miss you @jgonzalezferrer\n" +
    "Thank you @VovaVovavolik for such a Card\n\n" +
    "👉 https://billions-member-pass.vercel.app/"
  );

  // ✅ FIX FOR MOBILE (ЄДИНА ЗМІНА)
  setTimeout(() => {
    window.location.href =
      `https://twitter.com/intent/tweet?text=${text}`;
  }, 300);
});

// ===== AFTER LOGIN =====
const params = new URLSearchParams(window.location.search);

if (params.has("username")) {
  const userId = params.get("id");
  const avatarHash = params.get("avatar");

  // ----- MEMBER NUMBER (RANDOM EACH TIME) -----
  const userNumber = Math.floor(Math.random() * 9999) + 1;
  const formatted = String(userNumber).padStart(4, "0");

  // ----- TEXT -----
  username.textContent = params.get("username");
  line1.textContent = `#${formatted}`;
  line2.textContent = "Member since Jan 2026";
  rightText.textContent = "YOU ARE IN THE COMMUNITY";

  // ----- MEMBER ID -----
  const year = new Date().getFullYear();
  memberId.textContent = `BLN-${year}-${formatted}`;

  // ----- AVATAR -----
  avatar.textContent = "";
  avatar.style.backgroundImage =
    `url(https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.png)`;
  avatar.style.backgroundRepeat = "no-repeat";
  avatar.style.backgroundSize = "cover";
  avatar.setAttribute("crossorigin", "anonymous");

  // ----- UI -----
  btn.textContent = "Share on X";
  footer.style.display = "block";
}
