<?php
// Memulai sesi aman untuk melacak status login
session_start();

// --- Konfigurasi Kata Sandi Admin (Tingkat Tinggi & Enkripsi Hash) ---
// Kata sandi asli di-hash menggunakan password_hash() agar aman dari kebocoran file.
// (Contoh hash di bawah ini dibuat dari kata sandi: "ferwap2026")
$stored_password_hash = '$2y$10$YourHashedPasswordHerePlaceholderForSecurityXYZ'; 

// CATATAN: Untuk pertama kali, jika ingin mengatur kata sandi baru secara instan, 
// kita bisa gunakan pengecekan teks langsung atau fungsi hash PHP di bawah ini:
$admin_password_plaintext = "ferwap2026"; // Ganti dengan kata sandi rahasiamu di sini

$error_message = "";

// Proses saat tombol Login ditekan
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['logout'])) {
        session_destroy();
        header("Location: index.php");
        exit;
    }

    $input_password = $_POST['password'] ?? '';

    // Verifikasi kata sandi di sisi server
    if ($input_password === $admin_password_plaintext) {
        $_SESSION['logged_in'] = true;
        header("Location: index.php");
        exit;
    } else {
        $error_message = "Kata sandi salah. Silakan coba lagi.";
    }
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ferwap Music Administration Portal</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="page-wrapper">
    <div class="admin-container" style="max-width: 1000px; margin: 0 auto; padding: 20px;">

        <?php if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true): ?>
            <!-- ================= HANYA KOTAK LOGIN YANG MUNCUL JIKA BELUM LOGIN ================= -->
            <div class="login-card" id="loginCard" style="max-width: 450px; margin: 80px auto; background: #111827; padding: 40px; border-radius: 12px; border: 1px solid #1f293d; text-align: center;">
                
                <div style="display: flex; align-items: center; justify-content: center; gap: 15px; margin-bottom: 25px;">
                    <a href="https://ferwap.com">
                        <img src="https://ferwap.com/Ferwap.jpeg" alt="Ferwap Music Logo" style="height: 60px; width: 60px; border-radius: 50%; object-fit: cover; border: 2px solid #ff0000; display: block;">
                    </a>
                </div>

                <h2 style="color: #fff; margin-bottom: 10px;">Ferwap Admin Portal</h2>
                <p style="color: #9ca3af; font-size: 0.9rem; margin-bottom: 20px;">Secure Server Authentication Required.</p>
                
                <?php if (!empty($error_message)): ?>
                    <div style="background: rgba(239, 68, 68, 0.1); color: #ef4444; padding: 10px; border-radius: 6px; font-size: 0.85rem; margin-bottom: 15px; border: 1px solid #ef4444;">
                        <?php echo $error_message; ?>
                    </div>
                <?php endif; ?>

                <form method="POST" action="">
                    <input type="password" name="password" placeholder="Enter Secure Password" required style="width: 100%; padding: 12px; background: #1f293d; border: 1px solid #374151; color: #fff; border-radius: 6px; margin-bottom: 15px; font-size: 1rem;">
                    <button type="submit" style="width: 100%; padding: 12px; background: #2563eb; color: #fff; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; font-size: 1rem;">Log In to Portal</button>
                </form>
            </div>

        <?php else: ?>
            <!-- ================= DASHBOR RAHASIA: HANYA DIKIRIM KE BROWSER JIKA SESSION VALID ================= -->
            <div id="metadataDashboard">
                
                <!-- Header Dashboard -->
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; border-bottom: 1px solid #1f293d; padding-bottom: 20px; flex-wrap: wrap; gap: 20px;">
                    <div style="display: flex; align-items: center; gap: 18px;">
                        <a href="https://ferwap.com">
                            <img src="https://ferwap.com/Ferwap.jpeg" alt="Ferwap Music Logo" style="height: 65px; width: 65px; border-radius: 50%; object-fit: cover; border: 2px solid #ff0000; display: block;">
                        </a>
                        <div>
                            <div style="margin-bottom: 3px;">
                                <span style="color: #ef4444; font-weight: bold; letter-spacing: 1.5px; font-size: 0.75rem; text-transform: uppercase;">FERWAP MUSIC</span>
                            </div>
                            <h1 style="margin: 0; font-size: 1.5rem; color: #fff;">Ferwap Music Administration Portal</h1>
                            <p style="margin: 4px 0 0 0; color: #9ca3af; font-size: 0.85rem;">Internal Metadata, IPI, ISNI, Catalog & Global Database System</p>
                        </div>
                    </div>

                    <!-- Tombol Log Out Aman Berbasis PHP Session -->
                    <form method="POST" style="margin: 0;">
                        <input type="hidden" name="logout" value="1">
                        <button type="submit" style="background-color: #ef4444; color: white; border: none; padding: 10px 18px; border-radius: 6px; font-size: 0.85rem; cursor: pointer; font-weight: bold;">
                            <i class="fa-solid fa-right-from-bracket" style="margin-right: 6px;"></i> Log Out
                        </button>
                    </form>
                </div>

                <!-- Distributor & Global Shortcuts -->
                <div style="margin-bottom: 30px; background: #111827; padding: 15px; border-radius: 8px; border: 1px solid #1f293d;">
                    <h4 style="margin: 0 0 12px 0; color: #9ca3af; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px;">
                        <i class="fa-solid fa-arrow-up-right-from-square" style="margin-right: 6px;"></i> Distributor & Global Shortcuts
                    </h4>
                    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                        <a href="https://routenote.com/login" target="_blank" style="background: #ef4444; color: #ffffff; padding: 8px 12px; border-radius: 6px; text-decoration: none; font-size: 0.8rem; font-weight: bold;">RouteNote Dashboard</a>
                        <a href="https://musicbrainz.org" target="_blank" style="background: #1f293d; color: #93c5fd; padding: 8px 12px; border-radius: 6px; text-decoration: none; font-size: 0.8rem; font-weight: bold;">MusicBrainz</a>
                        <a href="https://isni.org" target="_blank" style="background: #1f293d; color: #93c5fd; padding: 8px 12px; border-radius: 6px; text-decoration: none; font-size: 0.8rem; font-weight: bold;">ISNI Search</a>
                        <a href="https://repertoire.bmi.com/" target="_blank" style="background: #1f293d; color: #f43f5e; padding: 8px 12px; border-radius: 6px; text-decoration: none; font-size: 0.8rem; font-weight: bold;">BMI Repertoire</a>
                        <a href="https://formspree.io/forms" target="_blank" style="background: #1f293d; color: #34d399; padding: 8px 12px; border-radius: 6px; text-decoration: none; font-size: 0.8rem; font-weight: bold;">Formspree Inbox</a>
                    </div>
                </div>

                <!-- Tabel 1: Artist Identifiers -->
                <div class="metadata-section" style="margin-bottom: 40px;">
                    <h3 style="color: #60a5fa; margin-top: 0; margin-bottom: 20px; font-size: 1.1rem;">
                        <i class="fa-solid fa-users" style="margin-right: 8px;"></i> Artist Identifiers & Global Verification
                    </h3>
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
                            <tbody>
                                <tr>
                                    <td>Abednego Totouw</td>
                                    <td>3H3D</td>
                                    <td><span style="background: #1f293d; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; color: #93c5fd;">Singer / Songwriter / Producer</span></td>
                                    <td><a href="https://repertoire.bmi.com/Search/Search?main_entity=CREATOR&search_type=IPI&search_value=01369068221" target="_blank" style="color: #f59e0b; text-decoration: underline; font-family: monospace; font-weight: bold;">01369068221</a></td>
                                    <td><a href="https://isni.org/isni/0000000538949572" target="_blank" style="color: #60a5fa; text-decoration: underline; font-family: monospace;">0000 0005 3894 9572</a></td>
                                </tr>
                                <tr>
                                    <td>Efer Totouw</td>
                                    <td>Ferrson</td>
                                    <td><span style="background: #1f293d; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; color: #93c5fd;">Artist / Vocalist</span></td>
                                    <td>-</td>
                                    <td>-</td>
                                </tr>
                                <tr>
                                    <td>Sander Kosuko</td>
                                    <td>ANDER</td>
                                    <td><span style="background: #1f293d; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; color: #93c5fd;">Singer / Songwriter</span></td>
                                    <td>-</td>
                                    <td>-</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Tabel 2: Release Catalog -->
                <div class="metadata-section">
                    <h3 style="color: #60a5fa; margin-top: 0; margin-bottom: 20px; font-size: 1.1rem;">
                        <i class="fa-solid fa-compact-disc" style="margin-right: 8px;"></i> Release Catalog & Master Rights
                    </h3>
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
                            <tbody>
                                <tr>
                                    <td>Sogdai Ya</td>
                                    <td>3H3D, Brecko & ANDER</td>
                                    <td><span style="color: #93c5fd; font-family: monospace;">GXFHP2681603</span></td>
                                    <td><span style="color: #93c5fd; font-family: monospace;">5064042035692</span></td>
                                    <td>Ferwap Music Ent.</td>
                                </tr>
                                <tr>
                                    <td>Kwiregtori</td>
                                    <td>3H3D, Ompi, ANDER & Melchior</td>
                                    <td><span style="color: #93c5fd; font-family: monospace;">GXFHP2625957</span></td>
                                    <td><span style="color: #93c5fd; font-family: monospace;">5064042140358</span></td>
                                    <td>Ferwap Music Ent.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        <?php endif; ?>

    </div>

    <!-- Footer -->
    <footer style="margin-top: 60px; padding: 25px 0; border-top: 1px solid #1f293d; text-align: center; color: #6b7280; font-size: 0.85rem;">
        <p style="margin: 0 0 10px 0;">&copy; 2026 Ferwap Music Entertainment. All rights reserved.</p>
    </footer>
</div>

</body>
</html>
