document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('formTambahProduk');
    const namaProduk = document.getElementById('fnama');
    const deskripsi = document.getElementById('fdeskripsi');
    const kategori = document.getElementById('fkategori');
    const subKategori = document.getElementById('fsubkategori');
    const hargaSatuan = document.getElementById('fhargas');
    const grosirYa = document.getElementById('grosir-ya');
    const grosirTidak = document.getElementById('grosir-tidak');
    const hargaGrosir = document.getElementById('fhargag');
    const jasaKirim = document.querySelectorAll('input[name="jasa-kirim"]');
    const captcha = document.getElementById('captcha');

    const subKategoriOptions = {
        Baju: ['Baju Pria', 'Baju Wanita', 'Baju Anak'],
        Elektronik: ['Mesin Cuci', 'Kulkas', 'AC'],
        'Alat Tulis': ['Kertas', 'Map', 'Pulpen']
    };

    function generateCaptcha() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let result = '';
        for (let i = 0; i < 5; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        captcha.value = result;
    }
    generateCaptcha();

    grosirYa.addEventListener('change', function() {
        hargaGrosir.disabled = false;
        hargaGrosir.required = true;
    });

    grosirTidak.addEventListener('change', function() {
        hargaGrosir.disabled = true;
        hargaGrosir.required = false;
        hargaGrosir.value = '';
    });

    kategori.addEventListener('change', function() {
        const selectedKategori = kategori.value;
        const options = subKategoriOptions[selectedKategori] || [];

        subKategori.innerHTML = '<option value="">--Pilih Sub Kategori--</option>';

        options.forEach(function(option) {
            const opt = document.createElement('option');
            opt.value = option.toLowerCase().replace(/ /g, '-');
            opt.textContent = option;
            subKategori.appendChild(opt);
        });
    });

    form.addEventListener('submit', function(event) {
        let isValid = true;

        if (namaProduk.value.length < 5 || namaProduk.value.length > 30) {
            alert('Nama Produk harus diisi dan terdiri dari 5-30 karakter.');
            isValid = false;
        }

        if (deskripsi.value.length < 5 || deskripsi.value.length > 100) {
            alert('Deskripsi harus diisi dan terdiri dari 5-100 karakter.');
            isValid = false;
        }

        if (!kategori.value) {
            alert('Kategori harus dipilih.');
            isValid = false;
        }

        if (!subKategori.value) {
            alert('Sub Kategori harus dipilih sesuai dengan kategori.');
            isValid = false;
        }

        if (!hargaSatuan.value || isNaN(hargaSatuan.value)) {
            alert('Harga Satuan harus diisi dengan nilai numerik.');
            isValid = false;
        }

        if (grosirYa.checked && (!hargaGrosir.value || isNaN(hargaGrosir.value))) {
            alert('Harga Grosir harus diisi dengan nilai numerik jika Grosir dipilih.');
            isValid = false;
        }

        const selectedJasaKirim = Array.from(jasaKirim).filter(checkbox => checkbox.checked);
        if (selectedJasaKirim.length < 3) {
            alert('Minimal 3 Jasa Kirim harus dipilih.');
            isValid = false;
        }


        if (!/^[A-Za-z]{5}$/.test(captcha.value)) {
            alert('Captcha harus terdiri dari 5 huruf A-Z atau a-z.');
            isValid = false;
        }

        if (!isValid) {
            event.preventDefault(); 
        }
    });
});
