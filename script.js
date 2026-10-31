// Ganti kata sandi di bawah ini sesuai kata sandi admin yang kamu gunakan
const ADMIN_PASSWORD = "7070Uw#007"; 

// Fungsi untuk menangani Login
function handleLogin(event) {
    event.preventDefault();
    const inputPass = document.getElementById('adminPass').value;

    if (inputPass === ADMIN_PASSWORD) {
        // Simpan status login di sesi browser
        sessionStorage.setItem('ferwap_admin_logged_in', 'true');
        showDashboard();
    } else {
        alert("Password salah! Silakan coba lagi.");
        document.getElementById('adminPass').value = '';
    }
}

// Fungsi untuk menangani Logout
function handleLogout() {
    sessionStorage.removeItem('ferwap_admin_logged_in');
    document.getElementById('loginCard').style.display = 'block';
    document.getElementById('metadataDashboard').style.display = 'none';
    document.getElementById('adminPass').value = '';
}

// Menampilkan Dashboard setelah login
function showDashboard() {
    document.getElementById('loginCard').style.display = 'none';
    document.getElementById('metadataDashboard').style.display = 'block';
}

// Memeriksa status login saat halaman dimuat (Persistence Session)
window.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = sessionStorage.getItem('ferwap_admin_logged_in');
    if (isLoggedIn === 'true') {
        showDashboard();
    }
});
