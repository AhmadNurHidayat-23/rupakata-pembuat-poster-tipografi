<?php

namespace Tests\Feature;

use Tests\TestCase;

class EditorTest extends TestCase
{
    public function test_editor_works_without_any_database_connection(): void
    {
        config(['database.default' => 'database_tidak_tersedia']);

        $this->get(route('editor'))
            ->assertOk()
            ->assertSee('<html lang="id">', false)
            ->assertSee('Buat Poster', false)
            ->assertSee('Tipografimu.')
            ->assertSee('Unduh PNG')
            ->assertSee('Atur ulang');
    }

    public function test_editor_exposes_required_controls_and_export_dimensions(): void
    {
        $response = $this->get('/')->assertOk();

        foreach (['poster-text', 'poster-font', 'font-size', 'text-color', 'background-color', 'poster-canvas', 'download-button'] as $id) {
            $response->assertSee('id="'.$id.'"', false);
        }

        foreach (['left', 'center', 'right', 'square', 'portrait'] as $value) {
            $response->assertSee('value="'.$value.'"', false);
        }

        $response->assertSee('width="1080" height="1080"', false)
            ->assertSee('maxlength="2000"', false)
            ->assertSee('role="status"', false);
    }

    public function test_editor_loads_separate_built_assets_without_inline_code(): void
    {
        $html = $this->get('/')->assertOk()->getContent();

        $this->assertStringContainsString('/build/assets/app-', $html);
        $this->assertDoesNotMatchRegularExpression('/<style\b|\sstyle=|\son(?:click|input|change)=/i', $html);
        $this->assertDoesNotMatchRegularExpression('/<script(?![^>]*\bsrc=)[^>]*>/i', $html);
    }
}
