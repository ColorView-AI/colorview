// ====================================
// JavaScript Logic
// ====================================

// --- Elements ---
const body = document.body;
const logoImage = document.getElementById('logo-image');
const preview = document.getElementById('current-color-preview');
const uploadedImage = document.getElementById('uploaded-image');
const hexInput = document.getElementById('hexInput');
const rgbInput = document.getElementById('rgbInput');
const hslInput = document.getElementById('hslInput');

const hRange = document.getElementById('hRange');
const sRange = document.getElementById('sRange');
const lRange = document.getElementById('lRange');
const hValue = document.getElementById('hValue');
const sValue = document.getElementById('sValue');
const lValue = document.getElementById('lValue');

const settingsBtn = document.getElementById('settings-btn');
const settingsDrawer = document.getElementById('settings-drawer');
const lightModeBtn = document.getElementById('lightModeBtn');
const darkModeBtn = document.getElementById('darkModeBtn');
const colorblindSelect = document.getElementById('colorblind-mode-select');

const imageUpload = document.getElementById('imageUpload');
const uploadBtn = document.getElementById('uploadBtn');
const clearImageBtn = document.getElementById('clearImageBtn');

const languageSelect = document.getElementById('languageSelect');

const disclaimerPanel = document.getElementById('colorblind-disclaimer');
const disclaimerText = document.getElementById('disclaimer-text');
const disclaimerOkBtn = document.getElementById('disclaimer-ok-btn');
const disclaimerNeverBtn = document.getElementById('disclaimer-never-btn');

const pcLayoutBtn = document.getElementById('pcLayoutBtn');
const mobileLayoutBtn = document.getElementById('mobileLayoutBtn');

// NEW INFO BOX ELEMENTS
const modeInfoBox = document.getElementById('mode-info-box');
const modeInfoTitle = document.getElementById('mode-info-title');
const modeInfoList = document.getElementById('mode-info-list');

// NEW FOOTER ELEMENT
const singleLineFooter = document.getElementById('single-line-footer');


// --- State ---
let H = parseInt(hRange.value);
let S = parseInt(sRange.value);
let L = parseInt(lRange.value);


// --- Localization Data (UPDATED FOR SINGLE LINE FOOTER) ---
const translations = {
    en: {
        dir: 'ltr',
        main_title: 'Color Picker & Values',
        hsl_controls: 'HSL Controls',
        simulation_title: 'Color Blindness View',
        simulation_desc: 'Simulate for accessible design:',
        normal_vision: 'Normal Vision Test',
        deuteranopia: 'Deuteranopia Test',
        protanopia: 'Protanopia Test',
        settings_h2: 'Settings',
        theme_h3: 'Theme',
        light_mode: 'Light Mode',
        dark_mode: 'Dark Mode',
        language_h3: 'Language',
        layout_h3: 'Display Layout',
        pc_layout: 'PC Layout',
        mobile_layout: 'Mobile Layout',
        upload_btn: 'Upload Image for Simulation',
        clear_btn: 'Clear',

        // --- FOOTER UPDATES ---
        single_line_footer: 'ColorView Pro made by Ahmed Sameh and Nour Eldeen. | ColorView Pro © All rights reserved.',

        disclaimer: 'For the best use of this feature, You should have someone with you who is not colorblind',
        disclaimer_ok: 'Ok',
        disclaimer_never: 'Never Show Again',
        lang_options: [
            { code: 'en', name: 'English' },
            { code: 'ar', name: 'العربية' }
        ],
        // NEW: Colorblind Info
        info: {
            none: {
                title: 'No Simulation Selected',
                points: [
                    'Select a color blindness mode above to learn about it.',
                    'The boxes below will show how your design looks in that mode.'
                ]
            },
            protanopia: {
                title: 'Protanopia (Red-Weak)',
                points: [
                    'Protanopia is a type of color blindness where the eye can’t detect red light.',
                    'People with it often confuse reds with greens or browns.',
                    'Red shades may appear darker than they really are.',
                    'It’s usually inherited and present from birth.',
                    'Daily life is normal, but some color-based tasks can be harder.'
                ]
            },
            deuteranopia: {
                title: 'Deuteranopia (Green-Weak)',
                points: [
                    'Deuteranopia is a type of color blindness where the eye can’t detect green light.',
                    'People with it often confuse greens with reds or yellows.',
                    'Green shades may appear dull or faded.',
                    'It’s usually inherited and present from birth.',
                    'Daily life is normal, but some color-based tasks can be harder.'
                ]
            },
            tritanopia: {
                title: 'Tritanopia (Blue/Yellow)',
                points: [
                    'Tritanopia is a type of color blindness where the eye can’t detect blue light.',
                    'People with it often confuse blues with greens or yellows.',
                    'Blue shades may appear greener or faded.',
                    'It’s usually inherited and present from birth.',
                    'Daily life is normal, but some color-based tasks can be harder.'
                ]
            },
            achromatopsia: {
                title: 'Achromatopsia (Monochrome)',
                points: [
                    'Monochromacy is a rare form of color blindness where the eye cannot distinguish any colors at all.',
                    'People with it see the world in shades of gray, black, and white.',
                    'It happens when two or all three types of cone cells don’t work.',
                    'It’s usually inherited and appears from birth.',
                    'Daily life is normal, but color-based tasks can be much harder.'
                ]
            }
        }
    },
    ar: {
        dir: 'rtl',
        main_title: 'منتقي الألوان والقيم',
        hsl_controls: 'تحكم HSL',
        simulation_title: 'معاينة عمى الألوان',
        simulation_desc: 'محاكاة لتصميم يسهل الوصول إليه:',
        normal_vision: 'اختبار الرؤية العادية',
        deuteranopia: 'اختبار عمى الألوان الأخضر',
        protanopia: 'اختبار عمى الألوان الأحمر',
        settings_h2: 'الإعدادات',
        theme_h3: 'السمة',
        light_mode: 'الوضع الفاتح',
        dark_mode: 'الوضع الداكن',
        language_h3: 'اللغة',
        layout_h3: 'تخطيط العرض',
        pc_layout: 'تخطيط الحاسوب',
        mobile_layout: 'تخطيط الهاتف',
        upload_btn: 'تحميل صورة للمحاكاة',
        clear_btn: 'مسح',

        // --- FOOTER UPDATES ---
        single_line_footer: 'ColorView Pro صُنع بواسطة أحمد سامح ونور الدين. | ColorView Pro © جميع الحقوق محفوظة.',

        disclaimer: 'للاستفادة  من هذه الميزة يجب أن يكون معك شخص غير مصاب بعمى الألوان',
        disclaimer_ok: 'حسنا',
        disclaimer_never: 'لا تظهر مره اخرى',
        lang_options: [
            { code: 'en', name: 'English' },
            { code: 'ar', name: 'العربية' }
        ],
        // NEW: Colorblind Info (Arabic)
        info: {
            none: {
                title: 'لم يتم تحديد محاكاة',
                points: [
                    'حدد وضع عمى الألوان أعلاه للتعرف عليه.',
                    'ستعرض الصناديق أدناه كيف يبدو تصميمك في هذا الوضع.'
                ]
            },
            protanopia: {
                title: 'عمى الألوان البروتاني',
                points: [
                    'عمى الألوان البروتاني (Protanopia) هو نوع من عمى الألوان لا يستطيع فيه الشخص رؤية الضوء الأحمر.',
                    'غالبًا ما يَخلِط المصابون به بين اللونين الأحمر والأخضر أو الأحمر والبني.',
                    'تظهر الدرجات الحمراء أغمق مما هي عليه في الحقيقة.',
                    'يكون عادةً وراثيًا وموجودًا منذ الولادة.',
                    'يمكن العيش معه طبيعيًا، لكن بعض المهام التي تعتمد على الألوان قد تكون أصعب.'
                ]
            },
            deuteranopia: {
                title: 'عمى الألوان الديوتري',
                points: [
                    'عمى الألوان الديوتري (Deuteranopia) هو نوع من عمى الألوان لا يستطيع فيه الشخص رؤية الضوء الأخضر.',
                    'غالبًا ما يَخلِط المصابون به بين اللونين الأخضر والأحمر أو الأخضر والأصفر.',
                    'تبدو الدرجات الخضراء باهتة أو أقل وضوحًا.',
                    'يكون عادةً وراثيًا وموجودًا منذ الولادة.',
                    'يمكن العيش معه طبيعيًا، لكن بعض المهام التي تعتمد على الألوان قد تكون أصعب.'
                ]
            },
            tritanopia: {
                title: 'عمى الألوان التريتي',
                points: [
                    'عمى الألوان التريتي (Tritanopia) هو نوع من عمى الألوان لا يستطيع فيه الشخص رؤية الضوء الأزرق.',
                    'غالبًا ما يَخلِط المصابون به بين اللونين الأزرق والأخضر أو الأزرق والأصفر.',
                    'تبدو الدرجات الزرقاء أكثر خضرة أو باهتة.',
                    'يكون عادةً وراثيًا وموجودًا منذ الولادة.',
                    'يمكن العيش معه طبيعيًا، لكن بعض المهام التي تعتمد على الألوان قد تكون أصعب.'
                ]
            },
            achromatopsia: {
                title: 'عمى الألوان الكامل (Monochromacy)',
                points: [
                    'عمى الألوان الكامل (Monochromacy) هو نوع نادر من عمى الألوان لا يستطيع فيه الشخص تمييز أي ألوان.',
                    'يرى المصابون به العالم بدرجات الرمادي والأسود والأبيض فقط.',
                    'يحدث بسبب عدم عمل نوعين أو جميع أنواع خلايا المخاريط.',
                    'يكون عادةً وراثيًا وموجودًا منذ الولادة.',
                    'يمكن العيش معه طبيعيًا، لكن المهام التي تعتمد على الألوان تكون أصعب بكثير.'
                ]
            }
        }
    }
};


// --- Color Conversion Functions ---

function hslToRgb(h, s, l) {
    s /= 100; l /= 100;
    let c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs((h / 60) % 2 - 1)), m = l - c / 2, r = 0, g = 0, b = 0;
    if (0 <= h && h < 60) { r = c; g = x; b = 0; } else if (60 <= h && h < 120) { r = x; g = c; b = 0; } else if (120 <= h && h < 180) { r = 0; g = c; b = x; } else if (180 <= h && h < 240) { r = 0; g = x; b = c; } else if (240 <= h && h < 300) { r = x; g = 0; b = c; } else if (300 <= h && h < 360) { r = c; g = 0; b = x; }
    r = Math.round((r + m) * 255); g = Math.round((g + m) * 255); b = Math.round((b + m) * 255);
    return [r, g, b];
}
function rgbToHex(r, g, b) {
    const toHex = (c) => {
        const hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    };
    return "#" + toHex(r) + toHex(g) + toHex(b);
}
function hexToHsl(hex) {
    const cleanHex = hex.replace('#', '');
    if (cleanHex.length < 6) return [H, S, L];
    const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(cleanHex);
    if (!result) return [H, S, L];

    let r = parseInt(result[1], 16) / 255; let g = parseInt(result[2], 16) / 255; let b = parseInt(result[3], 16) / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [ Math.round(h * 360), Math.round(s * 100), Math.round(l * 100) ];
}


// --- Core Update Function ---
function updateColor(source, newH, newS, newL) {
    H = newH !== undefined ? newH : H;
    S = newS !== undefined ? newS : S;
    L = newL !== undefined ? newL : L;

    H = Math.max(0, Math.min(360, H));
    S = Math.max(0, Math.min(100, S));
    L = Math.max(0, Math.min(100, L));

    const [R, G, B] = hslToRgb(H, S, L);
    const hex = rgbToHex(R, G, B).toUpperCase();

    // Update HSL Sliders and Values
    if (source !== 'slider') {
        hRange.value = H;
        sRange.value = S;
        lRange.value = L;
    }
    hValue.textContent = H;
    sValue.textContent = S + '%';
    lValue.textContent = L + '%';

    // Update Inputs
    if (source !== 'hex') {
        hexInput.value = hex;
    }
    rgbInput.value = `${R}, ${G}, ${B}`;
    hslInput.value = `${H}, ${S}%, ${L}%`;

    // Update Preview Color (unless an image is active)
    if(uploadedImage.style.display !== 'block') {
        preview.style.backgroundColor = `hsl(${H}, ${S}%, ${L}%)`;
    }

    // Apply pulse effect
    if (source !== 'image' && source !== 'clear') {
        preview.classList.remove('pulse');
        void preview.offsetWidth;
        preview.classList.add('pulse');
    }
}


// --- UI Update Function ---
function updateUIContent(langCode) {
    const lang = translations[langCode] || translations.en;
    const currentMode = colorblindSelect.value;

    document.body.dir = lang.dir;

    // Header/Main Content
    document.getElementById('main-content-title').textContent = lang.main_title;
    document.getElementById('hsl-controls-title').textContent = lang.hsl_controls;

    // Simulation Area
    document.getElementById('simulation-area-title').textContent = lang.simulation_title;
    document.getElementById('simulation-desc').textContent = lang.simulation_desc;
    document.getElementById('normal-vision-test').textContent = lang.normal_vision;
    document.getElementById('deuteranopia-test').textContent = lang.deuteranopia;
    document.getElementById('protanopia-test').textContent = lang.protanopia;

    // Settings Drawer
    document.getElementById('settings-h2').textContent = lang.settings_h2;
    document.getElementById('theme-h3').textContent = lang.theme_h3;
    document.getElementById('language-h3').textContent = lang.language_h3;
    document.getElementById('layout-h3').textContent = lang.layout_h3;
    lightModeBtn.textContent = lang.light_mode;
    darkModeBtn.textContent = lang.dark_mode;
    pcLayoutBtn.textContent = lang.pc_layout;
    mobileLayoutBtn.textContent = lang.mobile_layout;

    // Buttons
    uploadBtn.textContent = lang.upload_btn;
    clearImageBtn.textContent = lang.clear_btn;

    // Footer UPDATED:
    singleLineFooter.textContent = lang.single_line_footer;

    // Disclaimer Panel
    disclaimerText.textContent = lang.disclaimer;
    disclaimerOkBtn.textContent = lang.disclaimer_ok;
    disclaimerNeverBtn.textContent = lang.disclaimer_never;

    // Update the colorblind info box content on language change
    updateModeInfo(currentMode, lang);

    // Rebuild Language Options
    languageSelect.innerHTML = '';
    lang.lang_options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option.code;
        opt.textContent = option.name;
        languageSelect.appendChild(opt);
    });
    languageSelect.value = langCode;

    localStorage.setItem('cvp_language', langCode);
}


// --- Function to Update Mode Info Box ---
function updateModeInfo(mode, currentLang) {
    const lang = currentLang || translations[localStorage.getItem('cvp_language') || 'en'];
    const info = lang.info[mode];

    modeInfoTitle.textContent = info.title;
    modeInfoList.innerHTML = '';

    info.points.forEach(pointText => {
        const li = document.createElement('li');
        li.textContent = pointText;
        modeInfoList.appendChild(li);
    });
}


// --- Layout Control Functions ---

function setLayout(layoutMode) {
    if (layoutMode === 'mobile') {
        body.classList.add('mobile-layout');
        mobileLayoutBtn.classList.add('active');
        pcLayoutBtn.classList.remove('active');
        localStorage.setItem('cvp_layout', 'mobile');
    } else {
        body.classList.remove('mobile-layout');
        pcLayoutBtn.classList.add('active');
        mobileLayoutBtn.classList.remove('active');
        localStorage.setItem('cvp_layout', 'pc');
    }
}

// -----------------------------------
// --- Event Listeners and Initializers ---
// -----------------------------------

// 1. Color Picker/HSL Control Listeners
[hRange, sRange, lRange].forEach(slider => {
    slider.addEventListener('input', () => {
        const newH = parseInt(hRange.value);
        const newS = parseInt(sRange.value);
        const newL = parseInt(lRange.value);
        updateColor('slider', newH, newS, newL);
    });
});

hexInput.addEventListener('input', (e) => {
    let val = e.target.value.toUpperCase().replace(/[^0-9A-F#]/g, '');
    if (!val.startsWith('#')) val = '#' + val.replace('#', '');

    if (val.length > 7) val = val.substring(0, 7);
    hexInput.value = val;

    if (val.length === 7) {
        const [newH, newS, newL] = hexToHsl(val);
        updateColor('hex', newH, newS, newL);
    }
});

// 2. Image Upload Logic
uploadBtn.addEventListener('click', () => {
    imageUpload.click();
});

clearImageBtn.addEventListener('click', () => {
    uploadedImage.src = '';
    uploadedImage.style.display = 'none';
    clearImageBtn.style.display = 'none';
    updateColor('clear', H, S, L);
});

imageUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            uploadedImage.src = e.target.result;
            uploadedImage.style.display = 'block';
            clearImageBtn.style.display = 'block';
            preview.style.backgroundColor = 'transparent';
        };
        reader.readAsDataURL(file);
    }
});

// 3. Theme Toggles
function setTheme(mode) {
    body.classList.remove('light-mode', 'dark-mode');
    body.classList.add(mode);

    if (mode === 'dark-mode') {
        logoImage.src = 'logo-dark.png';
    } else {
        logoImage.src = 'logo.png';
    }
    localStorage.setItem('cvp_theme', mode);
}

lightModeBtn.addEventListener('click', () => setTheme('light-mode'));
darkModeBtn.addEventListener('click', () => setTheme('dark-mode'));

// 4. Language Selector Listener
languageSelect.addEventListener('change', (e) => {
    updateUIContent(e.target.value);
});

// 5. Layout Buttons Listeners
pcLayoutBtn.addEventListener('click', () => setLayout('pc'));
mobileLayoutBtn.addEventListener('click', () => setLayout('mobile'));

// 6. Settings Drawer
settingsBtn.addEventListener('click', () => {
    settingsDrawer.classList.toggle('open');
});

document.addEventListener('click', (e) => {
    if (settingsDrawer.classList.contains('open') &&
        !settingsDrawer.contains(e.target) &&
        e.target !== settingsBtn &&
        !settingsBtn.contains(e.target)) {
        settingsDrawer.classList.remove('open');
        }
});

// 7. Disclaimer Actions
function checkAndShowDisclaimer() {
    const neverShow = localStorage.getItem('cvp_disclaimer_hidden') === 'true';
    disclaimerPanel.style.display = neverShow ? 'none' : 'flex';
}

disclaimerOkBtn.addEventListener('click', () => {
    disclaimerPanel.style.display = 'none';
});

disclaimerNeverBtn.addEventListener('click', () => {
    localStorage.setItem('cvp_disclaimer_hidden', 'true');
    disclaimerPanel.style.display = 'none';
});


// 8. Colorblind Simulation Select
colorblindSelect.addEventListener('change', (e) => {
    const mode = e.target.value;
    let filterUrl = 'none';

    switch(mode) {
        case 'deuteranopia': filterUrl = 'url(\'#deutan\')'; break;
        case 'protanopia': filterUrl = 'url(\'#protan\')'; break;
        case 'tritanopia': filterUrl = 'url(\'#tritan\')'; break;
        case 'achromatopsia': filterUrl = 'url(\'#mono\')'; break;
    }

    document.documentElement.style.setProperty('--filter-colorblind', filterUrl);

    // Update the dynamic information box
    updateModeInfo(mode);
});


// --- Initialization on Load ---

// 1. Initialize Color
updateColor('init', H, S, L);

// 2. Initialize Language (This calls updateUIContent, which calls updateModeInfo)
const storedLang = localStorage.getItem('cvp_language') || 'en';
updateUIContent(storedLang);

// 3. Initialize Theme
const storedTheme = localStorage.getItem('cvp_theme') || 'light-mode';
setTimeout(() => setTheme(storedTheme), 0);

// 4. Initialize Layout
const storedLayout = localStorage.getItem('cvp_layout') || 'pc';
setLayout(storedLayout);

// 5. Check and show disclaimer on load
checkAndShowDisclaimer();

// Ensure initial info box content is set (Safe check after initialization)
updateModeInfo(colorblindSelect.value);
