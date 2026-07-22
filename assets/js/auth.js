// ===============================
// 共通アカウント（初期試作）
// ===============================
const COMMON_ID = "shinonoi";
const COMMON_PW = "1234";

// ===============================
// ローカルDB（localStorage）
// ===============================
function loadDB() {
    return JSON.parse(localStorage.getItem("userDB") || "{}");
}

function saveDB(db) {
    localStorage.setItem("userDB", JSON.stringify(db));
}

// ===============================
// 自動ID生成
// ===============================
function generateID(name) {
    const rand = Math.floor(Math.random() * 9000) + 1000;
    return `${name}_${rand}`;
}

// ===============================
// 新規登録
// ===============================
const registerForm = document.getElementById("registerForm");
if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("newUser").value;
        const pass = document.getElementById("newPass").value;

        const db = loadDB();
        const newId = generateID(name);

        db[newId] = { name, pass };
        saveDB(db);

        document.getElementById("registerMsg").textContent =
            `登録完了！あなたのIDは「${newId}」です。`;

    });
}

// ===============================
// ログイン処理
// ===============================
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const id = document.getElementById("userId").value;
        const pw = document.getElementById("password").value;

        const db = loadDB();

        // 共通アカウント
        if (id === COMMON_ID && pw === COMMON_PW) {
            localStorage.setItem("loggedIn", id);
            window.location.href = "members.html";
            return;
        }

        // 個別アカウント
        if (db[id] && db[id].pass === pw) {
            localStorage.setItem("loggedIn", id);
            window.location.href = "members.html";
            return;
        }

        document.getElementById("errorMsg").textContent =
            "ログインに失敗しました。IDまたはパスワードが違います。";
    });
}

// ===============================
// members.html 保護
// ===============================
if (location.pathname.endsWith("members.html")) {
    const user = localStorage.getItem("loggedIn");
    if (!user) {
        window.location.href = "403.html";
    }
}

// ===============================
// ログアウト
// ===============================
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
    logoutBtn.onclick = () => {
        localStorage.removeItem("loggedIn");
        window.location.href = "login.html";
    };
}
