import { renderPoster } from './poster.js';

const form = document.querySelector('#poster-form');
const canvas = document.querySelector('#poster-canvas');
const downloadButton = document.querySelector('#download-button');
const status = document.querySelector('#status');
const number = new Intl.NumberFormat('id-ID');
let ready = false;

function stateFromForm() {
    const values = new FormData(form);
    return {
        text: String(values.get('text')).slice(0, 2000),
        font: values.get('font'),
        size: Number(values.get('size')),
        color: values.get('color'),
        background: values.get('background'),
        align: values.get('align'),
        format: values.get('format'),
    };
}

function updatePreview() {
    try {
        const state = stateFromForm();
        const layout = renderPoster(canvas, state);
        document.querySelector('#text-count').textContent = `${number.format(state.text.length)} / 2.000`;
        document.querySelector('#size-value').textContent = `${state.size} px`;
        document.querySelector('#text-color-value').textContent = state.color.toUpperCase();
        document.querySelector('#background-color-value').textContent = state.background.toUpperCase();
        document.querySelector('#poster-dimensions').textContent = `${number.format(layout.width)} × ${number.format(layout.height)} px · PNG`;
        document.querySelector('#fit-status').textContent = layout.size < state.size - .1
            ? `Ukuran teks disesuaikan menjadi ${number.format(Math.floor(layout.size))} px agar seluruh teks tetap di dalam poster.`
            : 'Teks dibungkus dan diperkecil otomatis agar tetap di dalam poster.';
        canvas.setAttribute('aria-label', `Pratinjau poster: ${state.text || 'tanpa teks'}`);
        ready = true;
        return state;
    } catch {
        ready = false;
        status.textContent = 'Pratinjau gagal dibuat. Coba muat ulang dengan peramban terbaru.';
        return null;
    }
}

form.addEventListener('submit', event => event.preventDefault());
form.addEventListener('input', () => {
    status.textContent = '';
    updatePreview();
});
form.addEventListener('change', updatePreview);
form.addEventListener('reset', () => {
    // The reset event fires before the browser restores the form values.
    requestAnimationFrame(() => {
        updatePreview();
        status.textContent = 'Semua pengaturan telah dikembalikan ke kondisi awal.';
    });
});

downloadButton.addEventListener('click', () => {
    const state = updatePreview();
    if (!ready || !state) return;
    downloadButton.disabled = true;
    status.textContent = 'Menyiapkan gambar PNG…';
    try {
        canvas.toBlob(blob => {
            downloadButton.disabled = false;
            if (!blob) {
                status.textContent = 'Gambar gagal dibuat. Silakan coba lagi.';
                return;
            }
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `rupakata-${state.format === 'portrait' ? 'potret' : 'persegi'}.png`;
            document.body.append(link);
            link.click();
            link.remove();
            setTimeout(() => URL.revokeObjectURL(url), 10000);
            status.textContent = 'PNG siap. Unduhan telah dimulai.';
        }, 'image/png');
    } catch {
        downloadButton.disabled = false;
        status.textContent = 'Unduhan gagal. Silakan coba lagi.';
    }
});

updatePreview();
