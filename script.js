// Tentukan password rahasia untuk admin portal (silakan ubah sesuai keinginanmu)
const ADMIN_PASSWORD = "ferwap2026"; 

// Cek apakah admin sudah pernah login sebelumnya di browser ini
window.onload = function() {
    if (sessionStorage.getItem("isLoggedIn") === "true") {
        showDashboard();
    }
};

// Fungsi Proses Login
function handleLogin(event) {
    event.preventDefault();
    const inputPass = document.getElementById('adminPass').value;
    
    if (inputPass === ADMIN_PASSWORD) {
        // Simpan status login ke sesi browser
        sessionStorage.setItem("isLoggedIn", "true");
        showDashboard();
    } else {
        alert('Password salah! Silakan masukkan sandi administrator yang benar.');
        document.getElementById('adminPass').value = '';
    }
}

// Fungsi Menampilkan Dashboard & Menyembunyikan Login
function showDashboard() {
    document.getElementById('loginCard').style.display = 'none';
    document.getElementById('metadataDashboard').style.display = 'block';
}

// Fungsi Logout (Keluar dari Portal)
function handleLogout() {
    sessionStorage.removeItem("isLoggedIn");
    document.getElementById('metadataDashboard').style.display = 'none';
    document.getElementById('loginCard').style.display = 'block';
    document.getElementById('adminPass').value = '';
}
