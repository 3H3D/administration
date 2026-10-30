// ATUR PASSWORD ADMIN KAMU DI SINI
const ADMIN_PASSWORD = "7070Uw#007"; 

document.addEventListener("DOMContentLoaded", () => {
    const loginSection = document.getElementById("login-section");
    const dashboardSection = document.getElementById("dashboard-section");
    const loginForm = document.getElementById("login-form");
    const passwordInput = document.getElementById("password-input");
    const errorMsg = document.getElementById("error-msg");
    const logoutBtn = document.getElementById("logout-btn");

    // Cek apakah user sudah login sebelumnya
    if (sessionStorage.getItem("ferwap_admin_logged_in") === "true") {
        showDashboard();
    }

    // Process Login
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const inputPass = passwordInput.value;

        if (inputPass === ADMIN_PASSWORD) {
            sessionStorage.setItem("ferwap_admin_logged_in", "true");
            errorMsg.style.display = "none";
            passwordInput.value = "";
            showDashboard();
        } else {
            errorMsg.style.display = "block";
        }
    });

    // Process Logout
    logoutBtn.addEventListener("click", () => {
        sessionStorage.removeItem("ferwap_admin_logged_in");
        showLogin();
    });

    function showDashboard() {
        loginSection.classList.add("hidden");
        dashboardSection.classList.remove("hidden");
    }

    function showLogin() {
        dashboardSection.classList.add("hidden");
        loginSection.classList.remove("hidden");
    }
});
