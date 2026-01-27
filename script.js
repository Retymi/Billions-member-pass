const btn = document.getElementById("actionBtn");

async function showConnected() {
  const res = await fetch("/api/me");
  if (!res.ok) return;

  const user = await res.json();

  document.getElementById("avatar").src =
    `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;
  document.getElementById("avatar").style.display = "block";
  document.getElementById("avatarPlaceholder").style.display = "none";

  document.getElementById("username").innerText = user.username;
  document.getElementById("line1").innerText = "#0001";
  document.getElementById("line2").innerText = "Member since Jan 2026";
  document.getElementById("rightText").innerText =
    "YOU ARE IN THE\nCOMMUNITY";

  let counter = localStorage.getItem("bln_counter") || 1;
  counter = parseInt(counter);
  localStorage.setItem("bln_counter", counter + 1);

  document.getElementById("memberId").innerText =
    `BLN-2026-${String(counter).padStart(4, "0")}`;

  btn.innerText = "Connected";
  btn.disabled = true;
}

async function init() {
  const isLogged = localStorage.getItem("bln_logged");

  if (isLogged === "true") {
    await showConnected();
    return;
  }

  // NOT CONNECTED STATE
  btn.innerText = "Login with Discord";
  btn.onclick = () => {
    localStorage.setItem("bln_logged", "true");
    window.location.href = "/api/login";
  };
}

init();
