const params = new URLSearchParams(window.location.search);

const id = params.get("id");
const username = params.get("username");
const avatar = params.get("avatar");

const avatarEl = document.getElementById("avatar");
const statusTitle = document.getElementById("statusTitle");
const statusSub = document.getElementById("statusSub");
const right = document.getElementById("right");
const memberId = document.getElementById("memberId");
const loginBtn = document.getElementById("loginBtn");

if (id && username) {
  // CONNECTED STATE

  avatarEl.classList.remove("not-connected");
  avatarEl.style.backgroundImage =
    `url(https://cdn.discordapp.com/avatars/${id}/${avatar}.png)`;
  avatarEl.innerHTML = "";

  statusTitle.innerText = username;
  statusSub.innerHTML = `<span class="gold">#0001</span><br>Member since Jan 2026`;

  right.classList.remove("hidden");

  const year = new Date().getFullYear();
  memberId.innerText = `BLN-${year}-0001`;

  loginBtn.innerText = "Connected";
  loginBtn.classList.add("connected");
  loginBtn.disabled = true;
} else {
  // NOT CONNECTED
  loginBtn.onclick = () => {
    window.location.href = "/api/login";
  };
}
