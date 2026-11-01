// Data Metadata Asli (Tersimpan aman, hanya dirender setelah login sukses)
// Kata sandi default untuk membuka: ferwap2026
const RAW_METADATA_STORE = {
    artists: [
        { name: "Abednego Totouw", stage: "3H3D", role: "Singer / Songwriter / Producer", ipi: "01369068221", isni: "0000 0005 3894 9572", isniUrl: "https://isni.org/isni/0000000538949572" },
        { name: "Efer Totouw", stage: "Ferrson", role: "Artist / Vocalist", ipi: "-", isni: "-", isniUrl: "" },
        { name: "Sander Kosuko", stage: "ANDER", role: "Singer / Songwriter", ipi: "-", isni: "-", isniUrl: "" }
    ],
    catalog: [
        { title: "Sogdai Ya", artist: "3H3D, Brecko & ANDER", isrc: "GXFHP2681603", upc: "5064042035692", owner: "Ferwap Music Ent." },
        { title: "Kwiregtori", artist: "3H3D, Ompi, ANDER & Melchior", isrc: "GXFHP2625957", upc: "5064042140358", owner: "Ferwap Music Ent." }
    ]
};

// Fungsi Utama Login
function handleLogin(e) {
    e.preventDefault();
    const pwd = document.getElementById('passwordInput').value;
    const errorMsg = document.getElementById('errorMsg');

    // Pengecekan Kata Sandi (Default: ferwap2026)
    if (pwd === "ferwap2026") {
        sessionStorage.setItem('ferwap_auth_session', 'ACTIVE_SECURE_TOKEN');
        renderDashboard(RAW_METADATA_STORE);
    } else {
        errorMsg.style.display = 'block';
    }
}

// Fungsi Merakit Tabel Dinamis di Browser Setelah Berhasil Masuk
function renderDashboard(data) {
    document.getElementById('loginCard').style.display = 'none';
    document.getElementById('metadataDashboard').style.display = 'block';

    let html = `
        <div class="metadata-section">
            <div class="section-title"><i class="fa-solid fa-users"></i> Artist Identifiers & Global Verification</div>
            <div class="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th>Legal Name</th>
                            <th>Stage</th>
                            <th>Role</th>
                            <th>IPI (BMI Search)</th>
                            <th>ISNI Profile Link</th>
                        </tr>
                    </thead>
                    <tbody>`;
    
    data.artists.forEach(item => {
        let ipiHtml = item.ipi !== "-" ? `<a href="https://repertoire.bmi.com/Search/Search?main_entity=CREATOR&search_type=IPI&search_value=${item.ipi}" target="_blank" class="code-link">${item.ipi}</a>` : "-";
        let isniHtml = item.isniUrl !== "" ? `<a href="${item.isniUrl}" target="_blank" style="color: #60a5fa; text-decoration: underline; font-family: monospace;">${item.isni}</a>` : "-";
        
        html += `
            <tr>
                <td>${item.name}</td>
                <td><strong>${item.stage}</strong></td>
                <td><span class="badge">${item.role}</span></td>
                <td>${ipiHtml}</td>
                <td>${isniHtml}</td>
            </tr>`;
    });

    html += `</tbody></table></div></div>

        <div class="metadata-section">
            <div class="section-title"><i class="fa-solid fa-compact-disc"></i> Release Catalog & Master Rights</div>
            <div class="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th>Track Title</th>
                            <th>Artist</th>
                            <th>ISRC</th>
                            <th>UPC</th>
                            <th>Master Owner</th>
                        </tr>
                    </thead>
                    <tbody>`;

    data.catalog.forEach(item => {
        html += `
            <tr>
                <td><strong>${item.title}</strong></td>
                <td>${item.artist}</td>
                <td><span class="mono">${item.isrc}</span></td>
                <td><span class="mono">${item.upc}</span></td>
                <td>${item.owner}</td>
            </tr>`;
    });

    html += `</tbody></table></div></div>`;

    document.getElementById('decryptedContent').innerHTML = html;
}

// Fungsi Log Out
function handleLogout() {
    sessionStorage.removeItem('ferwap_auth_session');
    location.reload();
}

// Cek Sesi Saat Halaman Dimuat
window.onload = function() {
    if (sessionStorage.getItem('ferwap_auth_session') === 'ACTIVE_SECURE_TOKEN') {
        renderDashboard(RAW_METADATA_STORE);
    }
};

// --- PROTEKSI TAMBAHAN: MENCEGAH KLIK KANAN / INSPECT ELEMENT ---
document.addEventListener('contextmenu', event => event.preventDefault());
document.onkeydown = function (e) {
    if (e.keyCode == 123 || (e.ctrlKey && e.shiftKey && (e.keyCode == 73 || e.keyCode == 74))) {
        return false;
    }
}
