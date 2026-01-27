alert("SCRIPT LOADED");

const avatarEl = document.getElementById("avatar");
const usernameEl = document.getElementById("username");
const line1El = document.getElementById("line1");
const line2El = document.getElementById("line2");
const rightTextEl = document.getElementById("rightText");
const memberIdEl = document.getElementById("memberId");
const actionBtn = document.getElementById("actionBtn");

// 1. перевіряємо чи залогінений
fetch("/api/me")
  .then(res => res.json())
  .then(data => {
    if (!data.connected) return;

    const user = data.user;

    // Аватар
    avatarEl.style.backgroundImage = `url(https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png)`;
    avatarEl.textContent = "";

    // Імʼя
    usernameEl.textContent = user.username;

    // Текст
    line1El.textContent = "#0001";
    line2El.textContent = "Member since Jan 2026";

    // Права частина
    rightTextEl.innerHTML = `
      YOU ARE IN<br/>
      THE<br/>
      COMMUNITY
    `;

    // ID
    memberIdEl.textContent = "BLN-2026-0001";

    // Кнопка
    actionBtn.textContent = "Connected";
    actionBtn.disabled = true;
  });

// 2. кнопка логіну
actionBtn.addEventListener("click", () => {
  window.location.href = "/api/login";
});
