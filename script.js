async function init() {
  const btn = document.getElementById("actionBtn");

  try {
    const res = await fetch("/api/me");
    if (!res.ok) throw new Error("Not logged");

    const user = await res.json();

    // --- UI ---
    document.getElementById("avatar").src =
      `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;
    document.getElementById("avatar").style.display = "block";
    document.getElementById("avatarPlaceholder").style.display = "none";

    document.getElementById("username").innerText = user.username;
    document.getElementById("line1").innerText = "#0001";
    document.getElementById("line2").innerText = "Member since Jan 2026";
    document.getElementById("rightText").innerText =
      "YOU ARE IN THE\nCOMMUNITY";

    // --- MEMBER ID (AUTO INCREMENT) ---
    let counter = localStorage.getItem("bln_counter");
    if (!counter) counter = 1;
    else counter = parseInt(counter) + 1;

    localStorage.setItem("bln_counter", counter);

    const formatted = String(counter).padStart(4, "0");
    document.getElementById("memberId").innerText =
      `BLN-2026-${formatted}`;

    btn.innerText = "Connected";
    btn.disabled = true;

  } catch {
    btn.onclick = () => {
      window.location.href = "/api/login";
    };
  }
}

init();
