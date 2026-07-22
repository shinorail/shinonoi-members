// 共通アカウント（試作）
const COMMON_ID = "shinonoi";
const COMMON_PW = "1234";

// ログイン処理
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const id = document.getElementById("userId").value;
        const pw = document.getElementById("password").value;

        if (id === COMMON_ID && pw === COMMON_PW) {
            // ログイン成功
            localStorage.setItem("loggedIn", "true");
            window.location.href = "members.html";
        } else {
            // ログイン失敗
            document.getElementById("errorMsg").textContent = "ログインに失敗しました。IDまたはパスワードが違います。";
        }
    });
}

// members.html の保護
if (location.pathname.endsWith("members.html")) {
    const loggedIn = localStorage.getItem("loggedIn");
    if (!loggedIn) {
        window.location.href = "login.html";
    }
}

// ログアウト
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
    logoutBtn.onclick = () => {
        localStorage.removeItem("loggedIn");
        window.location.href = "login.html";
    };
}
