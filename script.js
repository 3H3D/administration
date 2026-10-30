// KATA SANDI PORTAL ADMIN FERWAP MUSIC
const ADMIN_PASSWORD = "7070Uw#007";

document.addEventListener("DOMContentLoaded", function () {
    const loginSection = document.getElementById("login-section");
    const dashboardSection = document.getElementById("dashboard-section");
    const loginForm = document.getElementById("login-form");
    const passwordInput = document.getElementById("password-input");
    const errorMsg = document.getElementById("error-msg");
    const logoutBtn = document.getElementById("logout-btn");

    // 1. Cek Sesi Login yang Tersimpan
    if (sessionStorage.getItem("ferwap_admin_logged_in") === "true") {
        showDashboard();
    }

    // 2. Event Listener Form Login
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault(); // Mencegah reload halaman

            // Ambil input dan hapus spasi tak sengaja di awal/akhir
            const inputPass = passwordInput.value.trim();

            if (inputPass === ADMIN_PASSWORD) {
                sessionStorage.setItem("ferwap_admin_logged_in", "true");
                if (errorMsg) errorMsg.style.display = "none";
                passwordInput.value = "";
                showDashboard();
            } else {
                if (errorMsg) errorMsg.style.display = "block";
            }
        });
    }

    // 3. Event Listener Tombol Logout
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            sessionStorage.removeItem("ferwap_admin_logged_in");
            showLogin();
        });
    }

    // Fungsi Menampilkan Dashboard Admin
    function showDashboard() {
        if (loginSection) loginSection.classList.add("hidden");
        if (dashboardSection) dashboardSection.classList.remove("hidden");
    }

    // Fungsi Menampilkan Form Login
    function showLogin() {
        if (dashboardSection) dashboardSection.classList.add("hidden");
        if (loginSection) loginSection.classList.remove("hidden");
    }
});
