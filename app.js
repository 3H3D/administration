// Kata Sandi Default Portal: ferwap2026
function cekLogin(event) {
    event.preventDefault();
    const inputPass = document.getElementById('passwordInput').value;
    const errorMsg = document.getElementById('errorMsg');

    if (inputPass === "ferwap2026") {
        sessionStorage.setItem('ferwap_login_status', 'aktif');
        tampilkanDashboard();
    } else {
        errorMsg.style.display = 'block';
    }
}

function tampilkanDashboard() {
    document.getElementById('loginCard').style.display = 'none';
    document.getElementById('metadataDashboard').style.display = 'block';
}

function logout() {
    sessionStorage.removeItem('ferwap_login_status');
    location.reload();
}

// Cek otomatis jika sesi sebelumnya sudah aktif
window.onload = function() {
    if (sessionStorage.getItem('ferwap_login_status') === 'aktif') {
        tampilkanDashboard();
    }
};

// Proteksi klik kanan
document.addEventListener('contextmenu', event => event.preventDefault());
