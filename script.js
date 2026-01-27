const btn = document.getElementById("actionBtn");
const usernameEl = document.getElementById("username");
const line1 = document.getElementById("line1");
const line2 = document.getElementById("line2");
const rightText = document.getElementById("rightText");
const memberId = document.getElementById("memberId");
const footer = document.getElementById("footer");
const avatar = document.getElementById("avatar");

const params = new URLSearchParams(window.location.search);

// ===== BUTTON =====
btn.addEventListener("click", () => {
  if (!params.has("username")) {
    window.location.href = "/api/login";
  }
});

// ===== AFTER LOGIN =====
if (params.has("username")) {
  const userId = params.get("id");
  const avatarHash = params.get("avatar");
  const username = params.get("username");

  // порядковий номер (локально)
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

  // TEXT
  usernameEl.textContent = username;
  line1.textContent = `#${formatted}`;
  line2.textContent = "Member since Jan 2026";
  rightText.textContent = "YOU ARE IN THE COMMUNITY";

  memberId.textContent = `BLN-2026-${formatted}`;

// ===== MEMBER NUMBER (RANDOM) =====
const randomNumber = Math.floor(Math.random() * 9999) + 1;

// #0001 формат
const memberTag = `#${String(randomNumber).padStart(4, "0")}`;

// BLN-2026-0001 формат
const memberId = `BLN-2026-${String(randomNumber).padStart(4, "0")}`;

document.getElementById("memberTag").textContent = memberTag;
document.getElementById("memberId").textContent = memberId;

  // AVATAR
  avatar.textContent = "";
  avatar.style.backgroundImage =
    `url(https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.png)`;
  avatar.style.backgroundSize = "cover";
  avatar.style.backgroundPosition = "center";

  // UI
  btn.textContent = "Connected";
  btn.disabled = true;
  footer.style.display = "block";
}
