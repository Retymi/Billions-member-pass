const loginBtn = document.getElementById("loginBtn");

loginBtn.onclick = () => {
  window.location.href = "/api/login";
};

async function loadUser() {
  try {
    const res = await fetch("/api/me");
    if (!res.ok) return;

    const user = await res.json();

    // AVATAR
    const avatar = document.getElementById("avatar");
    avatar.innerHTML = `<img src="${user.avatar}" />`;

    // USERNAME
    document.getElementById("username").innerText = user.username;
    document.getElementById("tagline").innerText = "#0001\nMember since Jan 2026";

    // RIGHT TEXT
    document.getElementById("communityText").innerText =
      "YOU ARE IN\nTHE\nCOMMUNITY";

    // MEMBER ID (поки простий)
    document.getElementById("memberId").innerText = "BLN-2026-0001";

    loginBtn.innerText = "Connected";
    loginBtn.disabled = true;
  } catch (e) {
    console.log("Not logged in");
  }
}

loadUser();
