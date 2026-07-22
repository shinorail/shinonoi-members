// ===============================
// Firebase 初期化（自分の値を入れる）
// ===============================
const firebaseConfig = {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "YOUR_FIREBASE_AUTH_DOMAIN",
    projectId: "YOUR_FIREBASE_PROJECT_ID",
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();

// ===============================
// Xログイン（OAuth）
// ===============================
async function loginWithTwitter() {
    const provider = new firebase.auth.TwitterAuthProvider();

    try {
        const result = await auth.signInWithPopup(provider);

        // Xユーザーの数値ID
        const twitterId = result.additionalUserInfo.profile.id_str;
        const screenName = result.additionalUserInfo.profile.screen_name;

        // 自動で「ID」的なものを作るイメージ（試作）
        const localUserId = `tw_${twitterId}`;

        // ローカル保存（試作用）
        localStorage.setItem("twitter_user_id", twitterId);
        localStorage.setItem("twitter_screen_name", screenName);
        localStorage.setItem("local_user_id", localUserId);

        // 会員ページへ
        window.location.href = "members.html";

    } catch (error) {
        console.error(error);
        alert("ログインに失敗しました");
    }
}

// login.html のボタンに紐付け
const loginBtn = document.getElementById("loginBtn");
if (loginBtn) {
    loginBtn.onclick = loginWithTwitter;
}

// ===============================
// ログアウト
// ===============================
async function logout() {
    await auth.signOut();
    localStorage.clear();
    window.location.href = "index.html";
}

const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
    logoutBtn.onclick = logout;
}

// ===============================
// X API フォロワー判定（試作版）
// ===============================
async function checkFollower(userId) {
    const ownerId = "YOUR_X_NUMERIC_ID";      // あなたのX数値ID
    const bearerToken = "YOUR_BEARER_TOKEN";  // 試作用。後で安全化必須

    const url = `https://api.twitter.com/2/users/${userId}/following`;

    try {
        const response = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${bearerToken}`
            }
        });

        if (!response.ok) {
            // APIエラー → 500ページへ
            window.location.href = "500.html";
            return false;
        }

        const data = await response.json();

        if (!data.data) {
            return false;
        }

        // ownerId がフォロー一覧に含まれているか
        const isFollower = data.data.some(user => user.id === ownerId);
        return isFollower;

    } catch (e) {
        console.error(e);
        window.location.href = "500.html";
        return false;
    }
}

// ===============================
// members.html の保護処理
// ===============================
async function protectMembersPage() {
    const userId = localStorage.getItem("twitter_user_id");

    if (!userId) {
        // 未ログイン → loginへ
        window.location.href = "login.html";
        return;
    }

    const ok = await checkFollower(userId);

    if (!ok) {
        // フォロワーじゃない → 403へ
        window.location.href = "403.html";
        return;
    }

    // ここまで来たらフォロワーOK
    console.log("フォロワー判定OK");
}

// members.html のときだけ実行
if (location.pathname.endsWith("members.html")) {
    protectMembersPage();
}
