// =========================================================
// 1. HELPER ALERT & CONFIRMATION DIALOG GAYA IOS
// =========================================================
const sAlert = (msg, icon = 'success') => {
    Swal.fire({
        title: msg,
        icon: icon,
        showConfirmButton: false,
        timer: 1500,
        customClass: { popup: 'ios-swal-popup', title: 'ios-swal-title' }
    });
};

const sConfirm = (title, text, confirmText = 'Lanjutkan', isDanger = false) => {
    return Swal.fire({
        title: title,
        text: text,
        icon: isDanger ? 'warning' : 'question',
        showCancelButton: true,
        confirmButtonText: confirmText,
        cancelButtonText: 'Batal',
        reverseButtons: true,
        customClass: {
            popup: 'ios-swal-popup',
            title: 'ios-swal-title',
            htmlContainer: 'ios-swal-html',
            confirmButton: isDanger ? 'btn-ios-danger' : 'ios-swal-confirm',
            cancelButton: 'ios-swal-cancel'
        }
    });
};

const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num || 0);
};

// =========================================================
// 2. MASTER DATA INITIAL STATE
// =========================================================
let masterComponents = [
    { id: 1, cat: 'ALL', name: 'ENGINE SYSTEM', subs: ['Turbocharger', 'Fuel Injector', 'Water Pump', 'Radiator'] },
    { id: 2, cat: 'ALL', name: 'HYDRAULIC SYSTEM', subs: ['Main Hydraulic Pump', 'Control Valve', 'Boom Cylinder', 'Arm Cylinder'] },
    { id: 3, cat: 'ALL', name: 'TRANSMISSION & DRIVETRAIN', subs: ['Torque Converter', 'Transmission Gearbox', 'Final Drive'] },
    { id: 4, cat: 'A2B', name: 'UNDERCARRIAGE', subs: ['Track Link Assy', 'Track Roller', 'Sprocket', 'Front Idler'] },
    { id: 5, cat: 'DT', name: 'VESSEL & DUMP HYDRAULIC', subs: ['Dump Hoist Cylinder', 'Tipping Valve', 'Vessel Frame'] },
    { id: 6, cat: 'ALL', name: 'Preventif maintenance', subs: ['Periodik Service', 'PS 100', 'PS 250', 'PS 500', 'PS 1000', 'PS 2000'] }
];

let appData = {
    users: [
        { id: 1, name: 'Super Administrator', username: 'admin', pass: 'admin123', role: 'Super Admin', access: ['create', 'edit', 'delete'] },
        { id: 2, name: 'Budi Maintenance', username: 'budi', pass: 'budi123', role: 'Supervisor', access: ['create', 'edit'] }
    ],
    units: [
        { code: 'BSS-135', cat: 'DT', merk: 'HINO', type: 'FM 280 JD TI' },
        { code: 'BSS-141', cat: 'DT', merk: 'HINO', type: 'FM 280 JD TI' },
        { code: 'EX-200', cat: 'A2B', merk: 'Komatsu', type: 'PC200-8' },
        { code: 'DZ-03', cat: 'A2B', merk: 'Komatsu', type: 'Dozer D85SS' }
    ],
    manpower: [
        { name: 'Budi Santoso', jabatan: 'Mekanik', spec: 'Engine Master' },
        { name: 'Andi Pratama', jabatan: 'Helper', spec: 'General Maintenance' }
    ],
    inventory: [
        { item_id: 'BAS00418', item: 'Oil Filter Engine', part_no: 'J8613000', merk: 'Komatsu', satuan: 'Pcs', stock: 10, harga: 1121300, kategori: 'Part Service', photo_url: '' },
        { item_id: 'BAS03909', item: 'Ring Solar 12', part_no: 'RS-12P', merk: 'General', satuan: 'Pcs', stock: 25, harga: 15000, kategori: 'Part Service', photo_url: '' },
        { item_id: 'BAS01102', item: 'Gasket Head', part_no: 'GK-9921', merk: 'Hino', satuan: 'Pcs', stock: 4, harga: 450000, kategori: 'Sparepart', photo_url: '' }
    ],
    service_parts_master: [
        { id: 1, unit_model: 'PC200-8', service_type: 'PS 250', item_id: 'BAS00418', qty: 1 },
        { id: 2, unit_model: 'FM 280 JD TI', service_type: 'PS 250', item_id: 'BAS00418', qty: 1 }
    ],
    service_schedules: [
        { id: 1, unit_code: 'EX-200', cat: 'A2B', service_type: 'PS 250', last_hm: 4000, current_hm: 4230, next_hm: 4250, date: '2026-09-20' },
        { id: 2, unit_code: 'BSS-135', cat: 'DT', service_type: 'PS 250', last_hm: 5600, current_hm: 5855, next_hm: 5850, date: '2026-09-17' }
    ],
    work_orders: [
        { no_wo: 'WO-20260918-0001', unit: 'BSS-135', cat: 'DT', date: '2026-09-18', job_site: 'PIT STERFU', shift: '1', jenis_bd: 'Schedule', component: 'ENGINE SYSTEM', sub_component: 'Water Pump', problem: 'KURANG GREASSE', downtime: '2026-09-18T08:25', uptime: '', istirahat: 0, total_jam: 0.33, hm: 5846.3, status_case: 'OPEN', photo_url: '' }
    ],
    material_requests: [
        { id_mr: 'MR-20260920-001', no_wo: 'WO-20260918-0001', unit: 'BSS-135', date: '2026-09-20', req_by: 'Mekanik Plant', items: [{ item_id: 'BAS00418', name: 'Oil Filter Engine', qty: 1 }] }
    ],
    barang_masuk: [
        { id_trans: 'BM-20260920-01', no_wo: 'WO-20260918-0001', date: '2026-09-20', item_id: 'BAS00418', item_name: 'Oil Filter Engine', part_no: 'J8613000', vendor: 'Mitra Utama Diesel', warehouse: 'Gudang Utama', qty: 5, price: 1121300, total_price: 5606500 }
    ],
    part_instal: [
        { id: 1, no_wo: 'WO-20260918-0001', unit: 'BSS-135', item_id: 'BAS00418', item_name: 'Oil Filter Engine', qty: 1, unit_price: 1121300, total_cost: 1121300, date: '2026-09-20', mechanics: ['Budi Santoso'] }
    ]
};

let selectedInvIndex = -1;
let selectedUnitCode = '';
let selectedMPName = '';
let currentLogFilter = 'ALL';

// =========================================================
// 3. AUTHENTICATION & INITIALIZATION
// =========================================================
function checkAuth() {
    const loggedInUser = sessionStorage.getItem('plant_sys_logged_user');
    if (loggedInUser) {
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('app-screen').classList.remove('hidden');
        document.getElementById('user-display-badge').innerText = loggedInUser.toUpperCase();
        
        setupFileInputBase64('wo_photo_file', 'wo_photo_base64');
        setupFileInputBase64('mi_photo_file', 'mi_photo_base64');
        initCharts(); 
        populateSelects(); 
        resetMRForm();
        resetBMForm();
        resetPIForm();
        resetUserForm();
        resetInvForm();
        renderUI();
    } else {
        document.getElementById('login-screen').classList.remove('hidden', 'opacity-0');
        document.getElementById('app-screen').classList.add('hidden');
    }
}

function handleLogin() {
    const u = document.getElementById('login_user').value.trim();
    const p = document.getElementById('login_pass').value.trim();

    const userFound = appData.users.find(x => x.username === u && x.pass === p);
    if (userFound || (u === 'admin' && p === 'admin123')) {
        sessionStorage.setItem('plant_sys_logged_user', u);
        document.getElementById('login-screen').classList.add('opacity-0');
        setTimeout(() => { checkAuth(); sAlert(`Selamat Datang, ${u}!`); }, 400);
    } else {
        sAlert('Username atau Password Salah!', 'error');
    }
}

async function handleLogout() {
    const res = await sConfirm('Keluar Akun?', 'Apakah Anda yakin ingin logout?', 'Ya, Logout', true);
    if (res.isConfirmed) {
        sessionStorage.removeItem('plant_sys_logged_user');
        sAlert('Logout Berhasil!');
        setTimeout(() => { checkAuth(); }, 400);
    }
}

function switchView(v) {
    ['dashboard','service','kanban','mr','purchasing','partinstal','inventory','master','history','users'].forEach(id => {
        const el = document.getElementById(`view-${id}`);
        if(el) el.classList.add('hidden');
    });
    const targetView = document.getElementById(`view-${v}`);
    if(targetView) targetView.classList.remove('hidden');
    document.getElementById('topbar-title').innerText = v.toUpperCase() + (v==='kanban'?' FLOW':'');

    document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-btn-mobile').forEach(el => el.classList.remove('active'));

    const activeNav = document.getElementById(`nav-${v}`);
    if(activeNav) activeNav.classList.add('active');
    const activeMNav = document.getElementById(`mnav-${v}`);
    if(activeMNav) activeMNav.classList.add('active');

    renderUI();
}

function initSelect2Dropdowns() {
    $('#wo_unit, #srv_unit, #bm_itemid, #msp_itemid, #msp_model, #bm_nowo, #pi_nowo, #mr_nowo').select2({ width: '100%' });
}

// =========================================================
// 4. DYNAMIC ROW ADDERS & MODAL CONTROL
// =========================================================
function addInstalPartRow(selectedItemId = '', selectedQty = 1) {
    const container = document.getElementById('pi-parts-container');
    if(!container) return;
    const div = document.createElement('div'); div.className = 'dynamic-row';
    let options = appData.inventory.map(i => `<option value="${i.item_id}" ${i.item_id===selectedItemId?'selected':''}>[${i.item_id}] ${i.item} (Stok:${i.stock})</option>`).join('');
    div.innerHTML = `<select class="input-ios flex-1 pi-item-select">${options}</select><input type="number" class="input-ios !w-20 pi-qty-input" value="${selectedQty}" min="1"><button type="button" onclick="this.parentElement.remove()" class="text-rose-500 font-bold px-2">&times;</button>`;
    container.appendChild(div);
    $(div).find('.pi-item-select').select2({ width: '100%' });
}

function addInstalMpRow(selectedName = '') {
    const container = document.getElementById('pi-mp-container');
    if(!container) return;
    const div = document.createElement('div'); div.className = 'dynamic-row';
    let options = appData.manpower.map(m => `<option value="${m.name}" ${m.name===selectedName?'selected':''}>${m.name} (${m.jabatan})</option>`).join('');
    div.innerHTML = `<select class="input-ios flex-1 pi-mp-name">${options}</select><button type="button" onclick="this.parentElement.remove()" class="text-rose-500 font-bold px-2">&times;</button>`;
    container.appendChild(div);
    $(div).find('.pi-mp-name').select2({ width: '100%' });
}

function addMRItemRow(selectedItemId = '', selectedQty = 1) {
    const container = document.getElementById('mr-items-container');
    if(!container) return;
    const div = document.createElement('div'); div.className = 'dynamic-row';
    let options = appData.inventory.map(i => `<option value="${i.item_id}" ${i.item_id===selectedItemId?'selected':''}>[${i.item_id}] ${i.item}</option>`).join('');
    div.innerHTML = `<select class="input-ios flex-1 mr-item-select">${options}</select><input type="number" class="input-ios !w-20 mr-qty-input" value="${selectedQty}" min="1"><button type="button" onclick="this.parentElement.remove()" class="text-rose-500 font-bold px-2">&times;</button>`;
    container.appendChild(div);
    $(div).find('.mr-item-select').select2({ width: '100%' });
}

function addCWOPartRow(selectedItemId = '', selectedQty = 1) {
    const container = document.getElementById('cwo-parts-container');
    if(!container) return;
    const div = document.createElement('div'); div.className = 'dynamic-row';
    let options = appData.inventory.map(i => `<option value="${i.item_id}" ${i.item_id===selectedItemId?'selected':''}>[${i.item_id}] ${i.item} (Stok:${i.stock})</option>`).join('');
    div.innerHTML = `<select class="input-ios flex-1 cwo-part-sel">${options}</select><input type="number" class="input-ios !w-20 cwo-part-qty" value="${selectedQty}" min="1"><button type="button" onclick="this.parentElement.remove()" class="text-rose-500 font-bold px-2">&times;</button>`;
    container.appendChild(div);
    $(div).find('.cwo-part-sel').select2({ width: '100%' });
}

function addCWOMpRow(selectedName = '') {
    const container = document.getElementById('cwo-mp-container');
    if(!container) return;
    const div = document.createElement('div'); div.className = 'dynamic-row';
    let options = appData.manpower.map(m => `<option value="${m.name}" ${m.name===selectedName?'selected':''}>${m.name} (${m.jabatan})</option>`).join('');
    div.innerHTML = `<select class="input-ios flex-1 cwo-mp-sel">${options}</select><button type="button" onclick="this.parentElement.remove()" class="text-rose-500 font-bold px-2">&times;</button>`;
    container.appendChild(div);
    $(div).find('.cwo-mp-sel').select2({ width: '100%' });
}

// =========================================================
// 5. CRUD ACTIONS WITH IOS CONFIRMATIONS
// =========================================================
async function logicSaveWO() {
    const editId = document.getElementById('wo_edit_id').value;
    const actionName = editId ? 'memperbarui' : 'menyimpan';

    const res = await sConfirm(`Konfirmasi ${actionName}`, `Apakah Anda yakin ingin ${actionName} Work Order ini?`);
    if (!res.isConfirmed) return;

    const photoVal = document.getElementById('wo_photo_base64').value;
    const woData = {
        no_wo: document.getElementById('wo_no').value,
        unit: document.getElementById('wo_unit').value,
        cat: document.getElementById('wo_cat').value,
        date: document.getElementById('wo_downtime').value.slice(0, 10),
        job_site: document.getElementById('wo_jobsite').value,
        shift: document.getElementById('wo_shift').value,
        jenis_bd: document.getElementById('wo_jenisbd').value,
        component: document.getElementById('wo_comp').value,
        sub_component: document.getElementById('wo_subcomp').value,
        problem: document.getElementById('wo_problem').value,
        downtime: document.getElementById('wo_downtime').value,
        uptime: document.getElementById('wo_uptime').value,
        istirahat: parseFloat(document.getElementById('wo_istirahat').value) || 0,
        total_jam: 1,
        hm: parseFloat(document.getElementById('wo_hm').value),
        status_case: document.getElementById('wo_statuscase').value,
        photo_url: photoVal
    };

    if (editId) {
        const idx = appData.work_orders.findIndex(w => w.no_wo === editId);
        if (idx !== -1) appData.work_orders[idx] = woData;
    } else {
        appData.work_orders.unshift(woData);
    }

    closeModalWO();
    sAlert('Work Order Disimpan!');
    renderUI();
}

async function deleteWO(noWO) {
    const res = await sConfirm('Hapus Work Order?', `Data WO ${noWO} akan dihapus secara permanen.`, 'Hapus WO', true);
    if (res.isConfirmed) {
        appData.work_orders = appData.work_orders.filter(w => w.no_wo !== noWO);
        sAlert('Work Order Dihapus!');
        renderUI();
    }
}

async function logicExecCloseWO() {
    const noWO = document.getElementById('cwo_no').value;
    const res = await sConfirm('Tutup Work Order?', `WO ${noWO} akan diset CLOSE dan stok sparepart terkait otomatis dipotong.`, 'Tutup WO', false);
    if (!res.isConfirmed) return;

    let wo = appData.work_orders.find(w => w.no_wo === noWO);
    if (!wo) return;

    wo.status_case = 'CLOSE';
    wo.downtime = document.getElementById('cwo_downtime').value;
    wo.uptime = document.getElementById('cwo_uptime').value;
    wo.istirahat = parseFloat(document.getElementById('cwo_istirahat').value) || 0;
    wo.action_summary = document.getElementById('cwo_action').value;

    const mpSels = document.querySelectorAll('.cwo-mp-sel');
    const mechanics = [];
    mpSels.forEach(mSel => { if (mSel.value) mechanics.push(mSel.value); });

    const partSels = document.querySelectorAll('.cwo-part-sel');
    const partQtys = document.querySelectorAll('.cwo-part-qty');
    const currentDate = new Date().toISOString().slice(0, 10);

    partSels.forEach((sel, idx) => {
        const itemId = sel.value;
        const qty = parseInt(partQtys[idx].value) || 1;
        let inv = appData.inventory.find(i => i.item_id === itemId);
        if (inv) {
            inv.stock = Math.max(0, inv.stock - qty);
            appData.part_instal.unshift({
                id: Date.now() + idx,
                no_wo: noWO,
                unit: wo.unit,
                item_id: itemId,
                item_name: inv.item,
                qty: qty,
                unit_price: inv.harga,
                total_cost: qty * inv.harga,
                date: currentDate,
                mechanics: mechanics
            });
        }
    });

    closeModalCloseWO();
    sAlert(`WO ${noWO} Closed!`);
    renderUI();
}

async function logicSaveInvForm() {
    const idx = parseInt(document.getElementById('inv_edit_index').value);
    const actionName = idx >= 0 ? 'memperbarui' : 'menyimpan';
    
    const res = await sConfirm(`Konfirmasi Item`, `Apakah Anda yakin ingin ${actionName} Master Item ini?`);
    if(!res.isConfirmed) return;

    const itemObj = {
        item_id: document.getElementById('mi_id').value,
        item: document.getElementById('mi_name').value,
        part_no: document.getElementById('mi_partno').value,
        merk: document.getElementById('mi_merk').value,
        satuan: document.getElementById('mi_satuan').value,
        stock: parseInt(document.getElementById('mi_stock').value)||0,
        harga: parseFloat(document.getElementById('mi_harga').value)||0,
        kategori: document.getElementById('mi_kategori').value,
        photo_url: document.getElementById('mi_photo_base64').value
    };

    if(idx >= 0) appData.inventory[idx] = itemObj;
    else appData.inventory.push(itemObj);

    resetInvForm();
    populateSelects();
    renderUI();
    sAlert('Master Item Tersimpan!');
}

async function logicDeleteInvForm() {
    const idx = parseInt(document.getElementById('inv_edit_index').value);
    if (idx >= 0) {
        const item = appData.inventory[idx];
        const res = await sConfirm('Hapus Master Item?', `Item ${item.item} (${item.item_id}) akan dihapus.`, 'Hapus Item', true);
        if (res.isConfirmed) {
            appData.inventory.splice(idx, 1);
            sAlert('Master Item Dihapus!');
            resetInvForm();
            populateSelects();
            renderUI();
        }
    }
}

async function logicSaveMR() {
    const idx = parseInt(document.getElementById('mr_edit_index').value);
    const res = await sConfirm('Simpan Material Request?', 'Material Request ini akan didaftarkan ke sistem.');
    if (!res.isConfirmed) return;

    const items = [];
    document.querySelectorAll('#mr-items-container .dynamic-row').forEach(row => {
        const itemId = row.querySelector('.mr-item-select').value;
        const qty = parseInt(row.querySelector('.mr-qty-input').value) || 1;
        const inv = appData.inventory.find(i => i.item_id === itemId);
        items.push({ item_id: itemId, name: inv ? inv.item : itemId, qty: qty });
    });

    const mrObj = {
        id_mr: document.getElementById('mr_id').value,
        no_wo: document.getElementById('mr_nowo').value,
        unit: document.getElementById('mr_unit').value,
        date: document.getElementById('mr_date').value,
        req_by: document.getElementById('mr_reqby').value,
        items: items
    };

    if (idx >= 0) appData.material_requests[idx] = mrObj;
    else appData.material_requests.unshift(mrObj);

    resetMRForm();
    renderUI();
    sAlert('Material Request Disimpan!');
}

async function logicDeleteMR() {
    const idx = parseInt(document.getElementById('mr_edit_index').value);
    if (idx >= 0) {
        const res = await sConfirm('Hapus Material Request?', 'Data MR ini akan dihapus permanen.', 'Hapus MR', true);
        if (res.isConfirmed) {
            appData.material_requests.splice(idx, 1);
            sAlert('MR Dihapus!');
            resetMRForm();
            renderUI();
        }
    }
}

async function logicSaveBM() {
    const res = await sConfirm('Simpan Barang Masuk?', 'Stok dan harga terkini barang di Database akan di-update.');
    if (!res.isConfirmed) return;

    const idx = parseInt(document.getElementById('bm_edit_index').value);
    const itemId = document.getElementById('bm_itemid').value;
    const qty = parseInt(document.getElementById('bm_qty').value);
    const price = parseFloat(document.getElementById('bm_price').value);
    
    let itemObj = appData.inventory.find(i => i.item_id === itemId);
    if(itemObj) {
        if(idx < 0) itemObj.stock += qty;
        itemObj.harga = price;
    }

    const bmObj = {
        id_trans: document.getElementById('bm_idtrans').value,
        no_wo: document.getElementById('bm_nowo').value,
        date: document.getElementById('bm_date').value,
        item_id: itemId,
        item_name: itemObj ? itemObj.item : '',
        part_no: document.getElementById('bm_partno').value,
        vendor: document.getElementById('bm_vendor').value,
        warehouse: document.getElementById('bm_warehouse').value,
        qty: qty,
        price: price,
        total_price: qty * price
    };

    if (idx >= 0) appData.barang_masuk[idx] = bmObj;
    else appData.barang_masuk.unshift(bmObj);

    resetBMForm();
    renderUI();
    sAlert('Barang Masuk Disimpan!');
}

async function logicDeleteBM() {
    const idx = parseInt(document.getElementById('bm_edit_index').value);
    if (idx >= 0) {
        const res = await sConfirm('Hapus Transaksi BM?', 'Data pembelian barang masuk akan dihapus.', 'Hapus Transaksi', true);
        if (res.isConfirmed) {
            appData.barang_masuk.splice(idx, 1);
            sAlert('Barang Masuk Dihapus!');
            resetBMForm();
            renderUI();
        }
    }
}

async function logicSaveInstal() {
    const res = await sConfirm('Simpan Instalasi Part?', 'WO terkait akan diset CLOSE dan stok barang akan terpotong.');
    if (!res.isConfirmed) return;

    const idx = parseInt(document.getElementById('pi_edit_index').value);
    const noWO = document.getElementById('pi_nowo').value;
    let wo = appData.work_orders.find(w => w.no_wo === noWO);
    if(wo) wo.status_case = 'CLOSE';

    const mpSels = document.querySelectorAll('.pi-mp-name');
    const mechanics = [];
    mpSels.forEach(mSel => { if(mSel.value) mechanics.push(mSel.value); });

    const itemSelects = document.querySelectorAll('.pi-item-select');
    const qtyInputs = document.querySelectorAll('.pi-qty-input');
    
    itemSelects.forEach((sel, selIdx) => {
        const itemId = sel.value;
        const installedQty = parseInt(qtyInputs[selIdx].value);
        let inv = appData.inventory.find(i => i.item_id === itemId);
        if(inv) {
            inv.stock = Math.max(0, inv.stock - installedQty);
            const piObj = {
                id: Date.now(),
                no_wo: noWO,
                unit: document.getElementById('pi_unit').value,
                item_id: itemId,
                item_name: inv.item,
                qty: installedQty,
                unit_price: inv.harga,
                total_cost: installedQty * inv.harga,
                date: document.getElementById('pi_date').value,
                mechanics: mechanics
            };
            if (idx >= 0 && selIdx === 0) appData.part_instal[idx] = piObj;
            else appData.part_instal.unshift(piObj);
        }
    });

    resetPIForm();
    renderUI();
    sAlert('Instalasi Part Disimpan!');
}

async function logicDeletePI() {
    const idx = parseInt(document.getElementById('pi_edit_index').value);
    if (idx >= 0) {
        const res = await sConfirm('Hapus Instalasi Part?', 'Data part terpasang akan dihapus.', 'Hapus Data', true);
        if (res.isConfirmed) {
            appData.part_instal.splice(idx, 1);
            sAlert('Part Instalasi Dihapus!');
            resetPIForm();
            renderUI();
        }
    }
}

// =========================================================
// 6. FORM POPULATION & RESET HELPERS
// =========================================================
function populateSelects() {
    filterUnitsByCategory('wo_cat', 'wo_unit');
    filterUnitsByCategory('srv_cat', 'srv_unit');
    ['bm_nowo', 'pi_nowo', 'mr_nowo'].forEach(id => {
        const el = document.getElementById(id);
        if(el) {
            el.innerHTML = '<option value="">-- Tanpa Ref WO --</option>';
            appData.work_orders.forEach(w => el.innerHTML += `<option value="${w.no_wo}">${w.no_wo} - ${w.unit}</option>`);
        }
    });
    const bmItem = document.getElementById('bm_itemid');
    if(bmItem) {
        bmItem.innerHTML = '';
        appData.inventory.forEach(i => bmItem.innerHTML += `<option value="${i.item_id}">[${i.item_id}] ${i.item}</option>`);
    }
    const mspItem = document.getElementById('msp_itemid');
    if(mspItem) {
        mspItem.innerHTML = '';
        appData.inventory.forEach(i => mspItem.innerHTML += `<option value="${i.item_id}">[${i.item_id}] ${i.item}</option>`);
    }
    const mspModel = document.getElementById('msp_model');
    if(mspModel) {
        mspModel.innerHTML = '';
        const models = [...new Set(appData.units.map(u => u.type))];
        models.forEach(m => mspModel.innerHTML += `<option value="${m}">${m}</option>`);
    }
    initSelect2Dropdowns();
}

function filterUnitsByCategory(catSelectId, unitSelectId) {
    const cat = document.getElementById(catSelectId).value;
    const uSel = document.getElementById(unitSelectId);
    if(!uSel) return;
    uSel.innerHTML = '';
    const filtered = appData.units.filter(u => u.cat === cat);
    filtered.forEach(u => uSel.innerHTML += `<option value="${u.code}">${u.code} (${u.merk} ${u.type})</option>`);
    if(filtered.length > 0 && catSelectId==='wo_cat') autoFillUnitInfo(filtered[0].code);
    $(uSel).trigger('change');
}

function filterComponents() {
    const cat = document.getElementById('wo_cat').value;
    const compSel = document.getElementById('wo_comp'); if(!compSel) return; compSel.innerHTML = '';
    masterComponents.filter(c => c.cat === 'ALL' || c.cat === cat).forEach(c => compSel.innerHTML += `<option value="${c.name}">${c.name}</option>`);
    filterSubComponents();
}

function filterSubComponents() {
    const compName = document.getElementById('wo_comp').value;
    const subSel = document.getElementById('wo_subcomp'); if(!subSel) return; subSel.innerHTML = '';
    const comp = masterComponents.find(c => c.name === compName);
    if(comp) comp.subs.forEach(s => subSel.innerHTML += `<option value="${s}">${s}</option>`);
}

function autoFillUnitInfo(code) {
    const u = appData.units.find(x => x.code === code);
    if(u) { document.getElementById('wo_merk').value = u.merk; document.getElementById('wo_type').value = u.type; }
}

function autoFillItemInfoBM(id) {
    const i = appData.inventory.find(x => x.item_id === id);
    if(i) { document.getElementById('bm_partno').value = i.part_no; document.getElementById('bm_merk').value = i.merk; document.getElementById('bm_satuan').value = i.satuan; document.getElementById('bm_price').value = i.harga; }
}

function autoFillWOInfoPI(no_wo) {
    const w = appData.work_orders.find(x => x.no_wo === no_wo);
    if(w) document.getElementById('pi_unit').value = w.unit;
}

function openModalWO() { resetWOForm(); document.getElementById('modalWO').classList.remove('hidden'); document.getElementById('modalWO').classList.add('flex'); populateSelects(); filterComponents(); }
function closeModalWO() { document.getElementById('modalWO').classList.add('hidden'); document.getElementById('modalWO').classList.remove('flex'); }
function closeModalCloseWO() { document.getElementById('modalCloseWO').classList.add('hidden'); document.getElementById('modalCloseWO').classList.remove('flex'); }
function openModalServiceSchedule() { document.getElementById('modalServiceSchedule').classList.remove('hidden'); document.getElementById('modalServiceSchedule').classList.add('flex'); populateSelects(); calcServiceHMAndDate(); }
function closeModalServiceSchedule() { document.getElementById('modalServiceSchedule').classList.add('hidden'); document.getElementById('modalServiceSchedule').classList.remove('flex'); }

function resetWOForm() {
    document.getElementById('wo_edit_id').value = "";
    document.getElementById('wo_modal_title').innerText = "Form Input Work Order Baru";
    document.getElementById('wo_no').value = `WO-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${Math.floor(Math.random()*900+100)}`;
    document.getElementById('wo_problem').value = "";
    document.getElementById('wo_photo_base64').value = "";
    document.getElementById('wo_photo_file').value = "";
}

function editWO(noWO) {
    const w = appData.work_orders.find(item => item.no_wo === noWO);
    if (!w) return;
    document.getElementById('wo_edit_id').value = w.no_wo;
    document.getElementById('wo_modal_title').innerText = `Edit Work Order (${w.no_wo})`;
    document.getElementById('wo_no').value = w.no_wo;
    document.getElementById('wo_cat').value = w.cat;
    filterUnitsByCategory('wo_cat', 'wo_unit');
    $('#wo_unit').val(w.unit).trigger('change');
    document.getElementById('wo_jobsite').value = w.job_site || 'PIT STERFU';
    document.getElementById('wo_shift').value = w.shift || '1';
    document.getElementById('wo_jenisbd').value = w.jenis_bd || 'Unschedule';
    filterComponents();
    document.getElementById('wo_comp').value = w.component;
    filterSubComponents();
    document.getElementById('wo_subcomp').value = w.sub_component;
    document.getElementById('wo_problem').value = w.problem;
    document.getElementById('wo_downtime').value = w.downtime;
    document.getElementById('wo_uptime').value = w.uptime || "";
    document.getElementById('wo_istirahat').value = w.istirahat || 0;
    document.getElementById('wo_hm').value = w.hm;
    document.getElementById('wo_statuscase').value = w.status_case;
    document.getElementById('wo_photo_base64').value = w.photo_url || "";

    document.getElementById('modalWO').classList.remove('hidden');
    document.getElementById('modalWO').classList.add('flex');
}

function updateWOStatus(noWO, newStatus) {
    if(newStatus === 'CLOSE') {
        openModalCloseWO(noWO);
    } else {
        const w = appData.work_orders.find(item => item.no_wo === noWO);
        if(w) {
            w.status_case = newStatus;
            sAlert(`Status WO Update: ${newStatus}`);
            renderUI();
        }
    }
}

function resetInvForm() {
    selectedInvIndex = -1;
    document.getElementById('inv_edit_index').value = "-1";
    document.getElementById('inv-form-title').innerText = "Form Master Item Barang";
    document.getElementById('mi_id').value = generateNextItemId();
    document.getElementById('mi_name').value = "";
    document.getElementById('mi_partno').value = "";
    document.getElementById('mi_merk').value = "";
    document.getElementById('mi_satuan').value = "Pcs";
    document.getElementById('mi_stock').value = 0;
    document.getElementById('mi_harga').value = "";
    document.getElementById('mi_kategori').value = "Part Service";
    document.getElementById('mi_photo_base64').value = "";
    document.getElementById('btn-delete-inv').classList.add('hidden');
    document.getElementById('inv-log-itemid-title').innerText = "[-]";
    document.getElementById('inv-item-log-container').innerHTML = '<p class="text-zinc-500 italic text-[10px]">Klik salah satu barang di tabel untuk melihat riwayat transaksi keluar/masuk dan request MR.</p>';
}

function loadInvToForm(index) {
    selectedInvIndex = index;
    const i = appData.inventory[index];
    if (!i) return;

    document.getElementById('inv_edit_index').value = index;
    document.getElementById('inv-form-title').innerText = `Edit Item (${i.item_id})`;
    document.getElementById('mi_id').value = i.item_id;
    document.getElementById('mi_name').value = i.item;
    document.getElementById('mi_partno').value = i.part_no;
    document.getElementById('mi_merk').value = i.merk;
    document.getElementById('mi_satuan').value = i.satuan;
    document.getElementById('mi_stock').value = i.stock;
    document.getElementById('mi_harga').value = i.harga;
    document.getElementById('mi_kategori').value = i.kategori || "Part Service";
    document.getElementById('mi_photo_base64').value = i.photo_url || "";
    document.getElementById('btn-delete-inv').classList.remove('hidden');

    renderInvItemLog(i.item_id);
    renderUI();
}

function resetMRForm() {
    document.getElementById('mr_edit_index').value = "-1";
    document.getElementById('mr-form-title').innerText = "Form Material Request";
    document.getElementById('mr_id').value = `MR-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${Math.floor(Math.random()*900+100)}`;
    document.getElementById('mr_unit').value = "";
    document.getElementById('mr_reqby').value = "Mekanik Plant";
    document.getElementById('mr-items-container').innerHTML = "";
    document.getElementById('btn-delete-mr').classList.add('hidden');
    addMRItemRow();
}

function loadMRToForm(index) {
    const m = appData.material_requests[index];
    if (!m) return;
    document.getElementById('mr_edit_index').value = index;
    document.getElementById('mr-form-title').innerText = `Edit MR (${m.id_mr})`;
    document.getElementById('mr_id').value = m.id_mr;
    document.getElementById('mr_date').value = m.date;
    $('#mr_nowo').val(m.no_wo).trigger('change');
    document.getElementById('mr_unit').value = m.unit;
    document.getElementById('mr_reqby').value = m.req_by;
    document.getElementById('btn-delete-mr').classList.remove('hidden');

    const container = document.getElementById('mr-items-container');
    container.innerHTML = "";
    if (m.items && m.items.length > 0) m.items.forEach(it => addMRItemRow(it.item_id, it.qty));
    else addMRItemRow();
}

function resetBMForm() {
    document.getElementById('bm_edit_index').value = "-1";
    document.getElementById('bm-form-title').innerText = "Form Input Barang Masuk";
    document.getElementById('bm_idtrans').value = `BM-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${Math.floor(Math.random()*900+100)}`;
    document.getElementById('bm_vendor').value = "";
    document.getElementById('bm_warehouse').value = "Gudang Utama";
    document.getElementById('bm_qty').value = 1;
    document.getElementById('btn-delete-bm').classList.add('hidden');
}

function loadBMToForm(index) {
    const b = appData.barang_masuk[index];
    if (!b) return;
    document.getElementById('bm_edit_index').value = index;
    document.getElementById('bm-form-title').innerText = `Edit Barang Masuk (${b.id_trans})`;
    document.getElementById('bm_idtrans').value = b.id_trans;
    document.getElementById('bm_date').value = b.date;
    $('#bm_nowo').val(b.no_wo).trigger('change');
    $('#bm_itemid').val(b.item_id).trigger('change');
    autoFillItemInfoBM(b.item_id);
    document.getElementById('bm_qty').value = b.qty;
    document.getElementById('bm_price').value = b.price;
    document.getElementById('bm_vendor').value = b.vendor;
    document.getElementById('bm_warehouse').value = b.warehouse || 'Gudang Utama';
    document.getElementById('btn-delete-bm').classList.remove('hidden');
}

function resetPIForm() {
    document.getElementById('pi_edit_index').value = "-1";
    document.getElementById('pi-form-title').innerText = "Form Instalasi Part & Close WO";
    document.getElementById('pi_unit').value = "";
    document.getElementById('pi-parts-container').innerHTML = "";
    document.getElementById('pi-mp-container').innerHTML = "";
    document.getElementById('btn-delete-pi').classList.add('hidden');
    addInstalPartRow();
    addInstalMpRow();
}

function loadPIToForm(index) {
    const p = appData.part_instal[index];
    if (!p) return;
    document.getElementById('pi_edit_index').value = index;
    document.getElementById('pi-form-title').innerText = `Edit Part Instal (${p.no_wo})`;
    $('#pi_nowo').val(p.no_wo).trigger('change');
    document.getElementById('pi_unit').value = p.unit;
    document.getElementById('pi_date').value = p.date;
    document.getElementById('btn-delete-pi').classList.remove('hidden');

    const partsContainer = document.getElementById('pi-parts-container');
    partsContainer.innerHTML = "";
    addInstalPartRow(p.item_id, p.qty);

    const mpContainer = document.getElementById('pi-mp-container');
    mpContainer.innerHTML = "";
    if(p.mechanics && p.mechanics.length > 0) p.mechanics.forEach(m => addInstalMpRow(m));
    else addInstalMpRow();
}

function resetUserForm() {
    document.getElementById('user_edit_index').value = "-1";
    document.getElementById('user-form-title').innerText = "Form Management User";
    document.getElementById('user_fullname').value = "";
    document.getElementById('user_name').value = "";
    document.getElementById('user_pass').value = "";
    document.getElementById('user_role').value = "Super Admin";
    document.getElementById('btn-delete-user').classList.add('hidden');
}

function loadUserToForm(index) {
    const u = appData.users[index];
    if(!u) return;
    document.getElementById('user_edit_index').value = index;
    document.getElementById('user-form-title').innerText = `Edit User (${u.username})`;
    document.getElementById('user_fullname').value = u.name;
    document.getElementById('user_name').value = u.username;
    document.getElementById('user_pass').value = u.pass;
    document.getElementById('user_role').value = u.role;
    document.getElementById('btn-delete-user').classList.remove('hidden');
}

function calcServiceHMAndDate() {
    const curHM = parseFloat(document.getElementById('srv_cur_hm').value) || 0;
    const lastHM = parseFloat(document.getElementById('srv_last_hm').value) || 0;
    const srvType = document.getElementById('srv_type').value;

    let interval = 250;
    if(srvType === 'PS 100') interval = 100;
    if(srvType === 'PS 500') interval = 500;
    if(srvType === 'PS 1000') interval = 1000;
    if(srvType === 'PS 2000') interval = 2000;

    let nextHM = lastHM > 0 ? (lastHM + interval) : (Math.ceil((curHM + 1) / interval) * interval);
    document.getElementById('srv_next_hm').value = nextHM;

    let diff = nextHM - curHM;
    let daysRemaining = Math.round(diff / 12);

    let targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + daysRemaining);
    document.getElementById('srv_date').value = targetDate.toISOString().slice(0,10);

    const statusEl = document.getElementById('srv_preview_status');
    if(diff < 0) {
        statusEl.className = "p-2.5 bg-rose-950/80 border border-rose-800 rounded-xl text-center font-bold text-rose-300 text-xs";
        statusEl.innerText = `🚨 OVERDUE! Service Sudah Lewat ${Math.abs(diff)} HM (${Math.abs(daysRemaining)} Hari Lalu)`;
    } else if(diff <= 50) {
        statusEl.className = "p-2.5 bg-amber-950/80 border border-amber-800 rounded-xl text-center font-bold text-amber-300 text-xs";
        statusEl.innerText = `⚠️ DUE SOON! Service Tinggal ${diff} HM Lagi (Sekitar ${daysRemaining} Hari)`;
    } else {
        statusEl.className = "p-2.5 bg-emerald-950/80 border border-emerald-800 rounded-xl text-center font-bold text-emerald-300 text-xs";
        statusEl.innerText = `✅ NORMAL: Service Sisa ${diff} HM Lagi (Sekitar ${daysRemaining} Hari)`;
    }
}

// =========================================================
// 7. MAIN RENDER UI
// =========================================================
function renderUI() {
    let bdCount = 0, closedCount = 0, serviceDueCount = 0;
    let cntOpen = 0, cntProg = 0, cntWait = 0, cntClose = 0;
    let stockVal = appData.inventory.reduce((acc, curr) => acc + (curr.stock * curr.harga), 0);

    const listBD = document.getElementById('dash-list-bd'); if(listBD) listBD.innerHTML = '';
    const listRFU = document.getElementById('dash-list-rfu'); if(listRFU) listRFU.innerHTML = '';

    ['open', 'prog', 'wait', 'close'].forEach(st => {
        const col = document.getElementById(`kb-col-${st}`);
        if (col) col.innerHTML = '';
    });

    const filterMonth = document.getElementById('wo-filter-month')?.value;
    const filterDate = document.getElementById('wo-filter-date')?.value;

    let filteredWOs = appData.work_orders.filter(w => {
        let match = true;
        if(filterMonth && !w.date.startsWith(filterMonth)) match = false;
        if(filterDate && w.date !== filterDate) match = false;
        return match;
    });

    filteredWOs.forEach(w => {
        let isBD = w.status_case !== 'CLOSE';
        if(isBD) bdCount++; else closedCount++;

        if (w.status_case === 'OPEN') cntOpen++;
        else if (w.status_case === 'IN_PROGRESS') cntProg++;
        else if (w.status_case === 'WAITING_PART') cntWait++;
        else if (w.status_case === 'CLOSE') cntClose++;

        let closeBtn = isBD ? `<button onclick="openModalCloseWO('${w.no_wo}')" class="btn-ios-primary !py-1 !px-2 !text-[10px]">✅ Close</button>` : '';
        let cardHtml = `
            <div class="glass-card-ios p-3.5 space-y-2 border-l-4 ${isBD?'border-l-rose-500':'border-l-emerald-500'}">
                <div class="flex justify-between items-center gap-2">
                    <span class="card-title-auto flex-1">${w.problem}</span>
                    <span class="bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded text-[10px] shrink-0 font-bold">${w.unit}</span>
                </div>
                <p class="card-text-auto">${w.component} / ${w.sub_component || '-'}</p>
                <p class="text-[9px] text-zinc-400 font-medium">HM: ${w.hm} | Site: ${w.job_site}</p>
                <div class="flex space-x-1 border-t border-zinc-800 pt-2">
                    ${closeBtn}
                    <button onclick="editWO('${w.no_wo}')" class="btn-ios-secondary !py-1 !px-2 !text-[10px]">✏️ Edit</button>
                    <button onclick="deleteWO('${w.no_wo}')" class="btn-ios-danger !py-1 !px-2 !text-[10px]">🗑️ Hapus</button>
                </div>
            </div>
        `;
        
        if(isBD && listBD) listBD.innerHTML += cardHtml;
        if(!isBD && listRFU) listRFU.innerHTML += cardHtml;

        let colId = 'kb-col-open';
        if (w.status_case === 'IN_PROGRESS') colId = 'kb-col-prog';
        else if (w.status_case === 'WAITING_PART') colId = 'kb-col-wait';
        else if (w.status_case === 'CLOSE') colId = 'kb-col-close';

        const col = document.getElementById(colId);
        if (col) {
            col.innerHTML += `
                <div class="glass-card-ios p-3 space-y-2 border-l-4 border-l-zinc-500">
                    <div class="flex justify-between font-bold text-xs"><span class="text-white">${w.no_wo}</span><span class="bg-zinc-800 text-zinc-200 px-2 py-0.5 rounded">${w.unit}</span></div>
                    <p class="font-bold text-white text-xs">${w.problem}</p>
                    <p class="text-[10px] text-zinc-400">${w.component} / ${w.sub_component || '-'}</p>
                    <div class="flex flex-wrap gap-1 border-t border-zinc-800 pt-2">
                        <select class="input-ios !py-1 !text-[10px] flex-1" onchange="updateWOStatus('${w.no_wo}', this.value)">
                            <option value="OPEN" ${w.status_case==='OPEN'?'selected':''}>OPEN</option>
                            <option value="IN_PROGRESS" ${w.status_case==='IN_PROGRESS'?'selected':''}>IN PROGRESS</option>
                            <option value="WAITING_PART" ${w.status_case==='WAITING_PART'?'selected':''}>WAITING PART</option>
                            <option value="CLOSE" ${w.status_case==='CLOSE'?'selected':''}>CLOSE</option>
                        </select>
                        <button onclick="editWO('${w.no_wo}')" class="btn-ios-secondary !py-1 !px-2 !text-[10px]">✏️</button>
                        <button onclick="deleteWO('${w.no_wo}')" class="btn-ios-danger !py-1 !px-2 !text-[10px]">🗑️</button>
                    </div>
                </div>
            `;
        }
    });

    const mrTable = document.getElementById('table-mr'); if(mrTable) mrTable.innerHTML = '';
    appData.material_requests.forEach((m, idx) => {
        if(mrTable) mrTable.innerHTML += `<tr onclick="loadMRToForm(${idx})" class="cursor-pointer hover:bg-zinc-900/60"><td class="p-3 font-bold text-white">${m.id_mr}</td><td class="p-3">WO: ${m.no_wo||'-'}<br><span class="text-zinc-400">${m.unit}</span></td><td class="p-3">${m.date}<br><span class="text-zinc-400">${m.req_by}</span></td><td class="p-3"><span class="bg-zinc-800 text-zinc-300 border border-zinc-700 px-2 py-0.5 rounded font-bold">${m.items?m.items.length:0} Item</span></td></tr>`;
    });

    const invCatFilter = document.getElementById('filter-inv-cat')?.value || 'ALL';
    const barcodeFilter = document.getElementById('search-inv-barcode')?.value.toLowerCase() || '';
    const invTable = document.getElementById('table-inventory'); if(invTable) invTable.innerHTML = '';
    
    appData.inventory.filter(i => {
        let matchCat = (invCatFilter === 'ALL' || i.kategori === invCatFilter);
        let matchBarcode = (!barcodeFilter || i.item_id.toLowerCase().includes(barcodeFilter) || i.item.toLowerCase().includes(barcodeFilter));
        return matchCat && matchBarcode;
    }).forEach((i, idx) => {
        let imgThumb = i.photo_url ? `<img src="${i.photo_url}" onclick="viewPhoto('${i.photo_url}')" class="w-8 h-8 object-cover rounded-lg cursor-pointer">` : `<div class="w-8 h-8 bg-zinc-800 rounded-lg flex items-center justify-center">📦</div>`;
        if(invTable) invTable.innerHTML += `<tr onclick="loadInvToForm(${idx})" class="cursor-pointer hover:bg-zinc-900/60"><td class="p-3">${imgThumb}</td><td class="p-3 font-bold text-white">${i.item_id}</td><td class="p-3"><b>${i.item}</b><br><span class="text-zinc-400">${i.part_no}</span></td><td class="p-3"><span class="bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded">${i.kategori || 'Sparepart'}</span></td><td class="p-3">${i.merk} / ${i.satuan}</td><td class="p-3 font-bold text-white">${i.stock}</td><td class="p-3 text-right font-bold text-zinc-200">${formatRupiah(i.harga)}</td></tr>`;
    });

    const bmTable = document.getElementById('table-barang-masuk'); if(bmTable) bmTable.innerHTML = '';
    appData.barang_masuk.forEach((b, idx) => {
        if(bmTable) bmTable.innerHTML += `<tr onclick="loadBMToForm(${idx})" class="cursor-pointer hover:bg-zinc-900/60"><td class="p-3"><b>${b.id_trans}</b><br><span class="text-zinc-400">${b.date}</span></td><td class="p-3"><b>${b.item_name}</b><br><span class="text-zinc-400">${b.part_no}</span></td><td class="p-3">${b.vendor}</td><td class="p-3 text-right"><b>${b.qty} Pcs</b> @ ${formatRupiah(b.price)}</td></tr>`;
    });

    const piTable = document.getElementById('table-part-instal'); if(piTable) piTable.innerHTML = '';
    appData.part_instal.forEach((p, idx) => {
        let mpListStr = p.mechanics ? p.mechanics.join(', ') : '-';
        if(piTable) piTable.innerHTML += `<tr onclick="loadPIToForm(${idx})" class="cursor-pointer hover:bg-zinc-900/60"><td class="p-3"><b>${p.no_wo}</b><br><span class="text-zinc-400">${p.unit}</span></td><td class="p-3">${p.item_name}</td><td class="p-3">Qty: ${p.qty} | Total: <b class="text-zinc-200">${formatRupiah(p.total_cost)}</b></td><td class="p-3">Mekanik: ${mpListStr}<br><span class="text-zinc-400">${p.date}</span></td></tr>`;
    });

    const uTable = document.getElementById('table-users'); if(uTable) uTable.innerHTML = '';
    appData.users.forEach((u, idx) => {
        if(uTable) uTable.innerHTML += `<tr onclick="loadUserToForm(${idx})" class="cursor-pointer hover:bg-zinc-900/60"><td class="p-3"><b>${u.name}</b></td><td class="p-3"><span class="text-white font-bold">${u.username}</span></td><td class="p-3"><span class="bg-zinc-800 text-zinc-300 border border-zinc-700 px-2 py-0.5 rounded font-bold text-[10px]">${u.role}</span></td><td class="p-3">${u.access.join(', ')}</td></tr>`;
    });

    if(document.getElementById('dash-kpi-bd')) document.getElementById('dash-kpi-bd').innerText = `${bdCount} Unit`;
    if(document.getElementById('dash-kpi-closed')) document.getElementById('dash-kpi-closed').innerText = `${closedCount} WO`;
    if(document.getElementById('dash-kpi-stockval')) document.getElementById('dash-kpi-stockval').innerText = formatRupiah(stockVal);
    if(document.getElementById('sum-open')) document.getElementById('sum-open').innerText = cntOpen;
    if(document.getElementById('sum-prog')) document.getElementById('sum-prog').innerText = cntProg;
    if(document.getElementById('sum-wait')) document.getElementById('sum-wait').innerText = cntWait;
    if(document.getElementById('sum-close')) document.getElementById('sum-close').innerText = cntClose;
}

function initCharts() {
    const ctxTrend = document.getElementById('trendChart');
    if(ctxTrend) {
        new Chart(ctxTrend.getContext('2d'), {
            type: 'line', data: { labels: ['01 Sep', '05 Sep', '10 Sep', '15 Sep'], datasets: [{ data: [10, 18, 5, 22], borderColor: '#a1a1aa', backgroundColor: 'rgba(161, 161, 170, 0.1)', fill: true }] },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
        });
    }
    const ctxComp = document.getElementById('componentChart');
    if(ctxComp) {
        new Chart(ctxComp.getContext('2d'), {
            type: 'doughnut', data: { labels: ['Engine', 'Hydraulic', 'Undercarriage'], datasets: [{ data: [40, 30, 20], backgroundColor: ['#71717a', '#a1a1aa', '#d4d4d8'] }] },
            options: { responsive: true, maintainAspectRatio: false }
        });
    }
}

function generateNextItemId() {
    let maxNum = 0, prefix = "BAS";
    appData.inventory.forEach(i => {
        let match = i.item_id.match(/^([A-Za-z]+)(\d+)$/);
        if (match) { prefix = match[1]; let num = parseInt(match[2], 10); if (num > maxNum) maxNum = num; }
    });
    return `${prefix}${String(maxNum + 1).padStart(5, '0')}`;
}

function setupFileInputBase64(fileInputId, hiddenInputId) {
    const fileEl = document.getElementById(fileInputId);
    if (!fileEl) return;
    fileEl.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function(evt) { document.getElementById(hiddenInputId).value = evt.target.result; };
        reader.readAsDataURL(file);
    });
}

function viewPhoto(url) {
    if(!url) return;
    document.getElementById('modalPhotoImg').src = url;
    document.getElementById('modalPhotoViewer').classList.remove('hidden');
    document.getElementById('modalPhotoViewer').classList.add('flex');
}

function closePhotoModal() {
    document.getElementById('modalPhotoViewer').classList.add('hidden');
    document.getElementById('modalPhotoViewer').classList.remove('flex');
}

let html5QrcodeScanner = null;
function openBarcodeScanner(targetInputId) {
    document.getElementById('modalBarcodeScanner').classList.remove('hidden');
    document.getElementById('modalBarcodeScanner').classList.add('flex');
    html5QrcodeScanner = new Html5Qrcode("reader");
    html5QrcodeScanner.start(
        { facingMode: "environment" }, { fps: 10, qrbox: { width: 250, height: 150 } },
        (decodedText) => {
            const inputEl = document.getElementById(targetInputId);
            if (inputEl) { inputEl.value = decodedText; $(inputEl).val(decodedText).trigger('change'); }
            sAlert(`Scanned: ${decodedText}`);
            closeBarcodeScanner();
        },
        () => {}
    ).catch(() => { sAlert('Kamera tidak dapat diakses', 'error'); closeBarcodeScanner(); });
}

function closeBarcodeScanner() {
    if (html5QrcodeScanner) { html5QrcodeScanner.stop().then(() => { html5QrcodeScanner.clear(); html5QrcodeScanner = null; }).catch(() => { html5QrcodeScanner = null; }); }
    document.getElementById('modalBarcodeScanner').classList.add('hidden');
    document.getElementById('modalBarcodeScanner').classList.remove('flex');
}

window.onload = checkAuth;