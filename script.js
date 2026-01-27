fetch("/api/me")
  .then(res => res.json())
  .then(data => {
    if (!data.loggedIn) return;

    const user = data.user;

    const card = document.querySelector(".card");
    card.classList.remove("not-connected");
    card.classList.add("connected");

    // username
    document.querySelector(".status").innerText = user.username;
    document.querySelector(".status-sub").innerHTML =
      `<span class="gold">#0001</span><br>Member since Jan 2026`;

    // avatar (DIV, не IMG)
    const avatarEl = document.getElementById("avatar");
    avatarEl.classList.remove("not-connected");
    avatarEl.innerHTML = "";
    avatarEl.style.backgroundImage =
      `url(https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png)`;

    // show right side
    document.getElementById("right").classList.remove("hidden");

    // member id
    const year = new Date().getFullYear();
    document.getElementById("memberId").innerText =
      `BLN-${year}-0001`;

    // button state
    const loginBtn = document.getElementById("loginBtn");
    loginBtn.innerText = "Connected";
    loginBtn.classList.add("connected");
    loginBtn.disabled = true;
  });
