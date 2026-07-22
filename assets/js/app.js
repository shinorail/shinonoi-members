/* ============================================
   GAS API URL（あなたのURL）
============================================ */
const API_URL =
  "https://script.google.com/macros/s/AKfycbxkHgvz2zM-u-hi41Sq5Y8UnmLKmzEirvipYSHONG1Zno-GSUhDx147VXSQsVMXxuICPg/exec";

/* ============================================
   ページ読み込み時：踏切ローディングをフェードアウト
============================================ */
window.addEventListener("load", () => {
  const loading = document.getElementById("loading");
  if (loading) {
    setTimeout(() => {
      loading.style.opacity = "0";
      setTimeout(() => (loading.style.display = "none"), 600);
    }, 800);
  }
});

/* ============================================
   ハンバーガーメニュー（スマホ対応）
============================================ */
const hamburgerBtn = document.getElementById("hamburgerBtn");
const navMenu = document.getElementById("navMenu");

if (hamburgerBtn) {
  hamburgerBtn.addEventListener("click", () => {
    hamburgerBtn.classList.toggle("open");
    navMenu.style.display =
      navMenu.style.display === "flex" ? "none" : "flex";
  });
}

/* ============================================
   会員登録（register.html）
============================================ */
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("regName").value;
    const userId = document.getElementById("regId").value;
    const password = document.getElementById("regPw").value;

    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // ★必須
      },
      body: JSON.stringify({
        mode: "register",
        name,
        userId,
        password,
      }),
    });

    const json = await res.json();
    const msgBox = document.getElementById("registerMsg");

    msgBox.classList.remove("hidden");

    if (json.success) {
      msgBox.querySelector(".alert-title").textContent = "登録完了";
      msgBox.querySelector(".alert-text").textContent =
        "ログインページからログインしてください。";
    } else {
      msgBox.querySelector(".alert-title").textContent = "登録エラー";
      msgBox.querySelector(".alert-text").textContent =
        "そのユーザーIDは既に使われています。";
    }
  });
}

/* ============================================
   ログイン（login.html）
============================================ */
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const userId = document.getElementById("loginId").value;
    const password = document.getElementById("loginPw").value;

    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // ★必須
      },
      body: JSON.stringify({
        mode: "login",
        userId,
        password,
      }),
    });

    const json = await res.json();
    const errorBox = document.getElementById("loginError");

    if (json.success) {
      localStorage.setItem("loggedInUser", userId);
      localStorage.setItem("userName", json.name);
      window.location.href = "members.html";
    } else {
      errorBox.classList.remove("hidden");
      errorBox.querySelector(".alert-title").textContent =
        "ログインに失敗しました";
      errorBox.querySelector(".alert-text").textContent =
        "IDまたはパスワードが違います。";
    }
  });
}

/* ============================================
   会員ページ保護（members.html）
============================================ */
if (location.pathname.endsWith("members.html")) {
  const user = localStorage.getItem("loggedInUser");

  if (!user) {
    window.location.href = "login.html";
  } else {
    const name = localStorage.getItem("userName");
    document.getElementById("userName").textContent = name;
  }
}

/* ============================================
   ログアウト（members.html）
============================================ */
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("userName");
    window.location.href = "login.html";
  });
}
