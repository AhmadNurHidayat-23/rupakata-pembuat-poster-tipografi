<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Ubah kata dan ide menjadi poster tipografi. Atur teks, font, warna, dan unduh poster PNG melalui RupaKata.">
    <title>RupaKata — Pembuat Poster Tipografi</title>
    <link rel="icon" href="{{ asset('favicon.svg') }}" type="image/svg+xml">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body>
    <a class="skip-link" href="#editor">Lewati ke editor</a>
    <header class="site-header page-width">
        <a class="brand" href="{{ url('/') }}" aria-label="RupaKata, beranda">rupakata.</a>
        <nav aria-label="Navigasi utama"><a href="#editor">Editor poster <span aria-hidden="true">↗</span></a></nav>
    </header>

    <main class="page-width">
        <section class="introduction" aria-labelledby="page-title">
            <p class="eyebrow">RUANG KECIL UNTUK IDE BESAR</p>
            <h1 id="page-title">Buat Poster<br>Tipografimu.</h1>
            <p class="description">Ubah kata dan ide menjadi poster tipografi yang menarik.</p>
        </section>

        <section class="editor" id="editor" aria-label="Editor poster tipografi">
            <form id="poster-form" class="settings">
                <div class="panel-heading"><h2><span>01</span> Pengaturan</h2><button class="reset-button" type="reset">Atur ulang <span aria-hidden="true">↺</span></button></div>
                <div class="field">
                    <div class="label-row"><label for="poster-text">Teks poster</label><output id="text-count" for="poster-text">16 / 2.000</output></div>
                    <textarea id="poster-text" name="text" rows="4" maxlength="2000" spellcheck="false" aria-describedby="text-help">KATA
PUNYA
DAYA.</textarea>
                    <p class="hint" id="text-help">Tekan Enter untuk membuat baris baru.</p>
                </div>
                <div class="field">
                    <label for="poster-font">Jenis font</label>
                    <select id="poster-font" name="font">
                        <option value="sans">Sans serif — Arial</option>
                        <option value="serif">Serif — Georgia</option>
                        <option value="condensed">Padat — Impact</option>
                        <option value="humanist">Humanis — Trebuchet</option>
                        <option value="mono">Monospace — Courier</option>
                    </select>
                </div>
                <div class="field">
                    <div class="label-row"><label for="font-size">Ukuran font</label><output id="size-value" for="font-size">180 px</output></div>
                    <input id="font-size" name="size" type="range" min="24" max="240" value="180" step="1">
                </div>
                <div class="color-fields">
                    <div class="field"><label for="text-color">Warna teks</label><div class="color-control"><input id="text-color" name="color" type="color" value="#20201e"><output id="text-color-value" for="text-color">#20201E</output></div></div>
                    <div class="field"><label for="background-color">Warna latar</label><div class="color-control"><input id="background-color" name="background" type="color" value="#eeede7"><output id="background-color-value" for="background-color">#EEEDE7</output></div></div>
                </div>
                <fieldset class="field">
                    <legend>Perataan teks</legend>
                    <div class="segments alignment">
                        <label><input type="radio" name="align" value="left" checked><span>Kiri</span></label>
                        <label><input type="radio" name="align" value="center"><span>Tengah</span></label>
                        <label><input type="radio" name="align" value="right"><span>Kanan</span></label>
                    </div>
                </fieldset>
                <fieldset class="field format-field">
                    <legend>Ukuran poster</legend>
                    <div class="segments formats">
                        <label><input type="radio" name="format" value="square" checked><span>Persegi <small>1.080 × 1.080</small></span></label>
                        <label><input type="radio" name="format" value="portrait"><span>Potret <small>1.080 × 1.350</small></span></label>
                    </div>
                </fieldset>
            </form>

            <div class="preview-panel">
                <div class="panel-heading"><h2><span>02</span> Pratinjau</h2><span class="live-label"><span aria-hidden="true">●</span> Langsung</span></div>
                <div class="poster-stage"><canvas id="poster-canvas" width="1080" height="1080" role="img" aria-label="Pratinjau poster: KATA PUNYA DAYA.">Pratinjau poster membutuhkan peramban yang mendukung Canvas.</canvas></div>
                <div class="preview-footer"><p id="poster-dimensions">1.080 × 1.080 px <span>· PNG</span></p><button id="download-button" class="download-button" type="button">Unduh PNG <span aria-hidden="true">↓</span></button></div>
                <p class="hint preview-hint" id="fit-status">Teks dibungkus dan diperkecil otomatis agar tetap di dalam poster.</p>
                <p class="status" id="status" role="status" aria-live="polite"></p>
                <noscript><p>Aktifkan JavaScript untuk menggunakan editor dan mengunduh poster.</p></noscript>
            </div>
        </section>
    </main>
    <footer class="site-footer page-width"><span>RupaKata — Pembuat Poster Tipografi</span><span>Kata sederhana. Kesan bermakna.</span></footer>
</body>
</html>
