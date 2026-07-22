// ローディング（踏切）を一定時間で消す
window.addEventListener("load", () => {
    const loading = document.getElementById("loading");
    if (loading) {
        setTimeout(() => {
            loading.style.display = "none";
        }, 1000); // 1秒で消える
    }
});

// ハンバーガーメニュー
const hamburgerBtn = document.getElementById("hamburgerBtn");
const navMenu = document.getElementById("navMenu");
if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener("click", () => {
        const isVisible = navMenu.style.display === "flex";
        navMenu.style.display = isVisible ? "none" : "flex";
    });
}

// 簡易ユーザーDB（localStorage）
function loadDB() {
    return JSON.parse(localStorage.getItem("userDB") || "{}");
}
function saveDB(db) {
    localStorage.setItem("userDB", JSON.stringify(db));
}

// 会員登録
const registerForm = document.getElementById("registerForm");
if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("regName").value;
        const id = document.getElementById("regId").value;
        const pw = document.getElementById("regPw").value;

        const db = loadDB();
        if (db[id]) {
            document.getElementById("registerMsg").textContent =
                "そのユーザーIDは既に使われています。";
            return;
        }

        db[id] = { name, pw };
        saveDB(db);

        document.getElementById("registerMsg").textContent =
            "登録完了しました。ログインページからログインしてください。";
    });
}

// ログイン
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const id = document.getElementById("loginId").value;
        const pw = document.getElementById("loginPw").value;

        const db = loadDB();
        if (db[id] && db[id].pw === pw) {
            localStorage.setItem("loggedInUser", id);
            window.location.href = "members.html";
        } else {
            document.getElementById("loginError").textContent =
                "ログインに失敗しました。IDまたはパスワードが違います。";
        }
    });
}

// 会員ページ保護
if (location.pathname.endsWith("members.html")) {
    const user = localStorage.getItem("loggedInUser");
    if (!user) {
        window.location.href = "login.html";
    }
}

// ログアウト
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("loggedInUser");
        window.location.href = "login.html";
    });
}
