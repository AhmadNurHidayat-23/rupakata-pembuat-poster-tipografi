export const fonts = {
    sans: { family: 'Arial, Helvetica, sans-serif', weight: 700 },
    serif: { family: 'Georgia, "Times New Roman", serif', weight: 400 },
    condensed: { family: 'Impact, "Arial Narrow", sans-serif', weight: 400 },
    humanist: { family: '"Trebuchet MS", Arial, sans-serif', weight: 700 },
    mono: { family: '"Courier New", monospace', weight: 700 },
};

const segmenter = new Intl.Segmenter('id', { granularity: 'grapheme' });

function wrapText(context, text, maxWidth) {
    const lines = [];
    for (const paragraph of text.replace(/\r\n?/g, '\n').split('\n')) {
        let line = '';
        for (const word of paragraph.trim().split(/\s+/u)) {
            const candidate = line ? `${line} ${word}` : word;
            if (context.measureText(candidate).width <= maxWidth) {
                line = candidate;
                continue;
            }
            if (line) lines.push(line);
            line = '';
            // Break long words without splitting emoji or combining characters.
            for (const { segment } of segmenter.segment(word)) {
                if (line && context.measureText(line + segment).width > maxWidth) {
                    lines.push(line);
                    line = '';
                }
                line += segment;
            }
        }
        lines.push(line);
    }
    return lines;
}

function measureLayout(context, state, size, width, height) {
    const font = fonts[state.font] ?? fonts.sans;
    context.font = `${font.weight} ${size}px ${font.family}`;
    const lines = wrapText(context, state.text, width);
    const metrics = lines.map(line => context.measureText(line || 'Mg'));
    const ascent = Math.max(size * .85, ...metrics.map(m => m.actualBoundingBoxAscent));
    const descent = Math.max(size * .25, ...metrics.map(m => m.actualBoundingBoxDescent));
    const lineHeight = Math.max(size * 1.12, ascent + descent + size * .08);
    const blockHeight = ascent + descent + (lines.length - 1) * lineHeight;
    const fitsWidth = metrics.every(m => Math.max(m.width, m.actualBoundingBoxLeft + m.actualBoundingBoxRight) <= width);
    return { lines, ascent, descent, lineHeight, blockHeight, size, fits: fitsWidth && blockHeight <= height };
}

export function renderPoster(canvas, state) {
    const height = state.format === 'portrait' ? 1350 : 1080;
    if (canvas.width !== 1080 || canvas.height !== height) {
        canvas.width = 1080;
        canvas.height = height;
    }
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Canvas tidak tersedia.');
    context.textAlign = 'left';
    context.textBaseline = 'alphabetic';
    context.direction = 'ltr';
    context.fillStyle = state.background;
    context.fillRect(0, 0, canvas.width, canvas.height);
    const padding = 88;
    const width = canvas.width - padding * 2;
    const availableHeight = height - padding * 2;
    let low = .1;
    let high = state.size;
    let layout = measureLayout(context, state, high, width, availableHeight);
    if (!layout.fits) {
        // Search a bounded range; all text remains visible, including many blank lines.
        for (let step = 0; step < 18; step++) {
            const middle = (low + high) / 2;
            const candidate = measureLayout(context, state, middle, width, availableHeight);
            if (candidate.fits) low = middle;
            else high = middle;
        }
        layout = measureLayout(context, state, low, width, availableHeight);
    }
    context.fillStyle = state.color;
    let baseline = (height - layout.blockHeight) / 2 + layout.ascent;
    for (const line of layout.lines) {
        const metrics = context.measureText(line);
        // Use glyph bounds as well as advance width to protect overhanging glyphs.
        const left = Math.max(0, metrics.actualBoundingBoxLeft);
        const visualWidth = Math.max(metrics.width, left + metrics.actualBoundingBoxRight);
        const freeSpace = width - visualWidth;
        const offset = state.align === 'right' ? freeSpace : state.align === 'center' ? freeSpace / 2 : 0;
        context.fillText(line, padding + left + offset, baseline);
        baseline += layout.lineHeight;
    }
    return { ...layout, width: canvas.width, height };
}
