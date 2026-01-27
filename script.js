// отримуємо елементи з твого HTML
const avatarEl = document.getElementById("avatar");
const usernameEl = document.getElementById("username");
const line1El = document.getElementById("line1");
const line2El = document.getElementById("line2");
const rightTextEl = document.getElementById("rightText");
const memberIdEl = document.getElementById("memberId");
const actionBtn = document.getElementById("actionBtn");

// 1. кнопка логіну
actionBtn.addEventListener("click", () => {
  window.location.href = "/api/login";
});

// 2. перевірка, чи користувач залогінений
fetch("/api/me")
  .then(res => res.json())
  .then(data => {
    if (!data.connected) {
      // NOT CONNECTED — залишаємо дизайн як є
      return;
    }

    const user = data.user;

    // аватар
    avatarEl.style.backgroundImage =
      `url(https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png)`;
    avatarEl.textContent = "";

    // імʼя
    usernameEl.textContent = user.username;

    // тексти
    line1El.textContent = "#0001";
    line2El.textContent = "Member since Jan 2026";

    // правий текст
    rightTextEl.innerHTML = `
      YOU ARE IN<br>
      THE<br>
      COMMUNITY
    `;

    // member id
    memberIdEl.textContent = "BLN-2026-0001";

    // кнопка
    actionBtn.textContent = "Connected";
    actionBtn.disabled = true;
  })
  .catch(err => {
    console.error("ME ERROR:", err);
  });
