const params = new URLSearchParams(window.location.search);

const id = params.get("id");
const username = params.get("username");
const avatar = params.get("avatar");

if (id && username) {
  document.getElementById("username").innerText = username;
  document.getElementById("line1").innerText = "#0001";

  const year = new Date().getFullYear();
  document.getElementById("memberId").innerText =
    `BLN-${year}-0001`;

  const avatarEl = document.getElementById("avatar");
  avatarEl.style.backgroundImage =
    `url(https://cdn.discordapp.com/avatars/${id}/${avatar}.png)`;
  avatarEl.style.backgroundSize = "cover";
}
