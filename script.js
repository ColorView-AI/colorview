// Elements
const upload = document.getElementById("imageUpload");
const preview = document.getElementById("preview");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let original = null;

// Upload Function
upload.addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = e => {
        preview.src = e.target.result;
        preview.style.display = "block";

        preview.onload = () => {
            canvas.width = preview.naturalWidth;
            canvas.height = preview.naturalHeight;

            ctx.drawImage(preview, 0, 0);
            original = ctx.getImageData(0, 0, canvas.width, canvas.height);

            canvas.style.display = "block";
        };
    };
    reader.readAsDataURL(file);
});


// Colorblind simulation matrices
const matrices = {
    protanopia: [0.567, 0.433, 0, 0, 0.558, 0.442, 0, 0, 0, 0.242, 0.758, 0],
    deuteranopia: [0.625, 0.375, 0, 0, 0.7, 0.3, 0, 0, 0, 0.3, 0.7, 0],
    tritanopia: [0.95, 0.05, 0, 0, 0, 0.433, 0.567, 0, 0, 0.475, 0.525, 0]
};


// Apply Filter
function apply(type) {
    if (!original) return;

    const img = new ImageData(
        new Uint8ClampedArray(original.data),
                              original.width,
                              original.height
    );

    const d = img.data;
    const m = matrices[type];

    for (let i = 0; i < d.length; i += 4) {
        const r = d[i], g = d[i+1], b = d[i+2];

        d[i]     = r*m[0] + g*m[1] + b*m[2];
        d[i + 1] = r*m[4] + g*m[5] + b*m[6];
        d[i + 2] = r*m[8] + g*m[9] + b*m[10];
    }

    ctx.putImageData(img, 0, 0);
}

// Reset
function resetImage() {
    if (!original) return;
    ctx.putImageData(original, 0, 0);
}


// Buttons
document.getElementById("btnPro").onclick = () => apply("protanopia");
document.getElementById("btnDeu").onclick = () => apply("deuteranopia");
document.getElementById("btnTri").onclick = () => apply("tritanopia");
document.getElementById("btnReset").onclick = resetImage;


// LANGUAGE SYSTEM
const lang = document.getElementById("language");

const text = {
    en: {
        title: "Upload an Image",
        pro: "Red‑Weak",
        deu: "Green‑Weak",
        tri: "Blue‑Weak",
        reset: "Reset",
        langLabel: "Language:"
    },
    ar: {
        title: "ارفع صورة",
        pro: "ضعف الأحمر",
        deu: "ضعف الأخضر",
        tri: "ضعف الأزرق",
        reset: "إعادة",
        langLabel: "اللغة:"
    }
};

function updateLanguage() {
    const L = lang.value;

    document.getElementById("title").textContent = text[L].title;
    document.getElementById("btnPro").textContent = text[L].pro;
    document.getElementById("btnDeu").textContent = text[L].deu;
    document.getElementById("btnTri").textContent = text[L].tri;
    document.getElementById("btnReset").textContent = text[L].reset;
    document.getElementById("langLabel").textContent = text[L].langLabel;
}

lang.addEventListener("change", updateLanguage);
