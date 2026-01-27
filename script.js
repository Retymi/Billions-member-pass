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

// ===== LOGIN =====
btn.addEventListener("click", async () => {
  const params = new URLSearchParams(window.location.search);

  // 1️⃣ НЕ ЗАЛОГІНЕНИЙ → DISCORD LOGIN
  if (!params.has("username")) {
    window.location.href = "/login";
    return;
  }

// 2 ЗАЛОГІНЕНИЙ -> SHARE
const card = document.querySelector(".card");

/* 🔥 ВКЛЮЧАЄМО EXPORT MODE */
card.classList.add("exporting");

const canvas = await html2canvas(card, {
  scale: 2,
  backgroundColor: "#050b16", // ⬅ стабільний темний фон
  useCORS: true,
  allowTaint: true
});

/* 🔥 ВИМИКАЄМО EXPORT MODE */
card.classList.remove("exporting");

const image = canvas.toDataURL("image/png");


  // auto download
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
const params = new URLSearchParams(window.location.search);

if (params.has("username")) {
  const userId = params.get("id");
  const avatarHash = params.get("avatar");

  // ----- MEMBER ORDER (local) -----
  let counter = localStorage.getItem("billions_counter");
  if (!counter) counter = 0;

  let userNumber = localStorage.getItem(`billions_user_${userId}`);

  if (!userNumber) {
    counter++;
    userNumber = counter;
    localStorage.setItem("billions_counter", counter);
    localStorage.setItem(`billions_user_${userId}`, userNumber);
  }

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



