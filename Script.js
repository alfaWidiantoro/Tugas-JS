let step = 1;
let nama = '';
let jumlahPilihan = 0;
let pilihanArray = [];

// Mencegah input angka di kolom nama secara langsung
document.addEventListener('DOMContentLoaded', function() {
    const namaInput = document.getElementById('nama');
    namaInput.addEventListener('input', function(e) {
        this.value = this.value.replace(/[^A-Za-z\s]/g, '');
    });
});

function resetToStep1() {
    step = 1;
    nama = '';
    jumlahPilihan = 0;
    pilihanArray = [];
    renderStep1();
}

function renderStep1() {
    let container = document.getElementById('container');
    let html = `
        <div class="form-group">
            <label for="nama">Nama :</label>
            <input type="text" id="nama" placeholder="Teks Nama" pattern="[A-Za-z\s]+" title="Hanya huruf dan spasi yang diperbolehkan">
            <div id="namaError" class="error">Nama tidak boleh kosong, maksimal 50 karakter, dan hanya boleh huruf!</div>
        </div>
        <div class="form-group">
            <label for="jumlahPilihan">Jumlah Pilihan :</label>
            <input type="number" id="jumlahPilihan" placeholder="Jml" min="1" max="10">
            <div id="jumlahError" class="error">Jumlah Pilihan harus antara 1 dan 10!</div>
        </div>
        <button onclick="submitStep1()">OK</button>
    `;
    container.innerHTML = html;

    // Re-attach event listener untuk input nama
    const namaInput = document.getElementById('nama');
    namaInput.addEventListener('input', function(e) {
        this.value = this.value.replace(/[^A-Za-z\s]/g, '');
    });
}

function submitStep1() {
    nama = document.getElementById('nama').value.trim();
    jumlahPilihan = parseInt(document.getElementById('jumlahPilihan').value);

    let namaError = document.getElementById('namaError');
    let jumlahError = document.getElementById('jumlahError');
    let isValid = true;

    // Validasi Nama
    const namaRegex = /^[A-Za-z\s]+$/; // Hanya huruf dan spasi
    if (!nama) {
        namaError.textContent = 'Nama tidak boleh kosong!';
        namaError.style.display = 'block';
        isValid = false;
    } else if (nama.length > 50) {
        namaError.textContent = 'Nama maksimal 50 karakter!';
        namaError.style.display = 'block';
        isValid = false;
    } else if (!namaRegex.test(nama)) {
        namaError.textContent = 'Nama hanya boleh berisi huruf dan spasi!';
        namaError.style.display = 'block';
        isValid = false;
    } else {
        namaError.style.display = 'none';
    }

    // Validasi Jumlah Pilihan
    if (isNaN(jumlahPilihan) || jumlahPilihan < 1 || jumlahPilihan > 10) {
        jumlahError.textContent = 'Jumlah Pilihan harus antara 1 dan 10!';
        jumlahError.style.display = 'block';
        isValid = false;
    } else {
        jumlahError.style.display = 'none';
    }

    if (!isValid) return;

    step = 2;
    renderStep2();
}

function renderStep2() {
    let container = document.getElementById('container');
    let html = `
        <div class="form-group">
            <label>Nama :</label>
            <input type="text" value="${nama}" disabled>
        </div>
        <div class="form-group">
            <label>Jumlah Pilihan :</label>
            <input type="number" value="${jumlahPilihan}" disabled>
        </div>
    `;

    for (let i = 1; i <= jumlahPilihan; i++) {
        html += `
            <div class="form-group">
                <label>Pilihan ${i} :</label>
                <input type="text" id="pilihan${i}" placeholder="Teks Pilihan ${i}">
                <div id="pilihan${i}Error" class="error">Pilihan ${i} tidak boleh kosong dan maksimal 50 karakter!</div>
            </div>
        `;
    }

    html += `
        <button onclick="submitStep2()">OK</button>
        <button class="btn-back" onclick="resetToStep1()">Kembali ke Layar Utama</button>
    `;
    container.innerHTML = html;
}

function submitStep2() {
    pilihanArray = [];
    let isValid = true;

    for (let i = 1; i <= jumlahPilihan; i++) {
        let pilihan = document.getElementById(`pilihan${i}`).value.trim();
        let error = document.getElementById(`pilihan${i}Error`);

        if (!pilihan) {
            error.textContent = `Pilihan ${i} tidak boleh kosong!`;
            error.style.display = 'block';
            isValid = false;
        } else if (pilihan.length > 50) {
            error.textContent = `Pilihan ${i} maksimal 50 karakter!`;
            error.style.display = 'block';
            isValid = false;
        } else {
            error.style.display = 'none';
            pilihanArray.push(pilihan);
        }
    }

    if (!isValid) return;

    step = 3;
    renderStep3();
}

function renderStep3() {
    let container = document.getElementById('container');
    let html = `
        <div class="form-group">
            <label>Nama :</label>
            <input type="text" value="${nama}" disabled>
        </div>
        <div class="form-group">
            <label>Jumlah Pilihan :</label>
            <input type="number" value="${jumlahPilihan}" disabled>
        </div>
    `;

    for (let i = 0; i < pilihanArray.length; i++) {
        html += `
            <div class="form-group">
                <label>Pilihan ${i + 1} :</label>
                <input type="text" value="${pilihanArray[i]}" disabled>
            </div>
        `;
    }

    html += `
        <div class="form-group">
            <label>Pilihan :</label>
            <select id="dropdownPilihan">
    `;

    for (let i = 0; i < pilihanArray.length; i++) {
        html += `<option value="${pilihanArray[i]}">${pilihanArray[i]}</option>`;
    }

    html += `
            </select>
        </div>
        <button onclick="submitStep3()">OK</button>
        <button class="btn-back" onclick="resetToStep1()">Kembali ke Layar Utama</button>
    `;
    container.innerHTML = html;
}

function submitStep3() {
    let selectedPilihan = document.getElementById('dropdownPilihan').value;
    step = 4;
    renderStep4(selectedPilihan);
}

function renderStep4(selectedPilihan) {
    let container = document.getElementById('container');
    let pilihanList = pilihanArray.join(', ');
    let result = `
        <div class="result">
            Hallo, nama saya ${nama}, saya mempunyai sejumlah ${jumlahPilihan} pilihan yaitu ${pilihanList}, dan saya memilih ${selectedPilihan}.
        </div>
        <button class="btn-back" onclick="resetToStep1()">Kembali ke Layar Utama</button>
    `;
    container.innerHTML = result;
}