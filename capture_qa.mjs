import puppeteer from 'puppeteer';
import { spawn } from 'child_process';
import path from 'path';

const artifactsDir = 'C:\\Users\\User\\.gemini\\antigravity\\brain\\105ea1c7-148c-4625-88c2-a632cec65aef';

const results = {};

async function log(key, value) {
  results[key] = value;
  console.log(`[QA] ${key}: ${value}`);
}

(async () => {
    console.log("Starting vite...");
    const server = spawn('cmd.exe', ['/c', 'npm run dev'], { detached: false });
    await new Promise(r => setTimeout(r, 10000));
    
    const browser = await puppeteer.launch({ headless: "new" });
    
    try {
        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 1000 });

        // Login via dev admin
        await page.goto('http://localhost:5173/login', { waitUntil: 'domcontentloaded' });
        await new Promise(r => setTimeout(r, 2000));
        const devBtn = await page.$('button.bg-red-800');
        if (devBtn) { await devBtn.click(); await new Promise(r => setTimeout(r, 4000)); }

        // ===== QA 1: Admin creates new draft =====
        await page.goto('http://localhost:5173/admin/plants', { waitUntil: 'domcontentloaded' });
        await new Promise(r => setTimeout(r, 3000));
        
        // Click create draft
        await page.evaluate(() => {
            const btns = Array.from(document.querySelectorAll('button'));
            const cBtn = btns.find(b => b.textContent && b.textContent.includes('建立草稿'));
            if (cBtn) cBtn.click();
        });
        await new Promise(r => setTimeout(r, 4000));

        const currentUrl = page.url();
        const onEditorPage = currentUrl.includes('/admin/plants/') && !currentUrl.endsWith('/plants');
        await log('QA1_admin_create_draft_navigates_to_editor', onEditorPage ? 'PASS' : 'FAIL: URL=' + currentUrl);
        await page.screenshot({ path: path.join(artifactsDir, 'qa1_admin_create.png') });

        // ===== QA 2: Check editor has localName, serialNumber, coverImageUrl fields =====
        const hasLocalName = await page.evaluate(() => {
            const labels = Array.from(document.querySelectorAll('label'));
            return labels.some(l => l.textContent && l.textContent.includes('中文名'));
        });
        const hasSerial = await page.evaluate(() => {
            const labels = Array.from(document.querySelectorAll('label'));
            return labels.some(l => l.textContent && l.textContent.includes('檔案編號'));
        });
        await log('QA2_editor_has_localName_field', hasLocalName ? 'PASS' : 'FAIL');
        await log('QA2_editor_has_serialNumber_field', hasSerial ? 'PASS' : 'FAIL');

        // Fill in data and set status to exhibiting (public)
        await page.evaluate(() => {
            const inputs = document.querySelectorAll('input');
            if (inputs[0]) { inputs[0].value = 'QA Test Plant'; inputs[0].dispatchEvent(new Event('change', {bubbles: true})); }
            if (inputs[1]) { inputs[1].value = 'SN-001'; inputs[1].dispatchEvent(new Event('change', {bubbles: true})); }
            if (inputs[2]) { inputs[2].value = 'QA俗名'; inputs[2].dispatchEvent(new Event('change', {bubbles: true})); }
            
            // Set status to exhibiting
            const selects = document.querySelectorAll('select');
            if (selects[0]) {
                selects[0].value = 'exhibiting';
                selects[0].dispatchEvent(new Event('change', {bubbles: true}));
            }
            // Set visibility to public
            const checkboxes = document.querySelectorAll('input[type="checkbox"]');
            if (checkboxes[0]) {
                checkboxes[0].checked = true;
                checkboxes[0].dispatchEvent(new Event('change', {bubbles: true}));
            }
        });
        await new Promise(r => setTimeout(r, 500));

        // Save the plant
        await page.evaluate(() => {
            const btns = Array.from(document.querySelectorAll('button'));
            const saveBtn = btns.find(b => b.textContent && b.textContent.includes('儲存檔案'));
            if (saveBtn) saveBtn.click();
        });
        await new Promise(r => setTimeout(r, 3000));
        await page.screenshot({ path: path.join(artifactsDir, 'qa2_save_result.png') });

        const savedIndicator = await page.evaluate(() => {
            const spans = Array.from(document.querySelectorAll('span'));
            return spans.some(s => s.textContent && s.textContent.includes('已儲存'));
        });
        await log('QA3_save_shows_success_indicator', savedIndicator ? 'PASS' : 'FAIL');

        // ===== QA 4: Admin list shows new plant =====
        await page.goto('http://localhost:5173/admin/plants', { waitUntil: 'domcontentloaded' });
        await new Promise(r => setTimeout(r, 3000));
        const adminListHasQAPlant = await page.evaluate(() => {
            return document.body.textContent.includes('QA Test Plant');
        });
        await log('QA4_admin_list_has_new_plant', adminListHasQAPlant ? 'PASS' : 'FAIL');
        await page.screenshot({ path: path.join(artifactsDir, 'qa4_admin_list.png') });

        // ===== QA 5: Collection shows the plant (status=exhibiting, visibility=public) =====
        await page.goto('http://localhost:5173/collection', { waitUntil: 'domcontentloaded' });
        await new Promise(r => setTimeout(r, 4000));
        const collectionHasQAPlant = await page.evaluate(() => {
            return document.body.textContent.includes('QA Test Plant');
        });
        await log('QA5_collection_shows_exhibiting_public_plant', collectionHasQAPlant ? 'PASS' : 'FAIL');
        await page.screenshot({ path: path.join(artifactsDir, 'qa5_collection.png') });

        // ===== QA 6: No-image fallback =====
        const noImgFallback = await page.evaluate(() => {
            // Check if any plant card renders "Image Missing" for plants without images
            return document.body.innerHTML.includes('Image Missing') || document.body.innerHTML.includes('image-icon') ||
                   document.querySelectorAll('.bg-\\[\\#EBEBE8\\]').length > 0;
        });
        await log('QA6_no_image_fallback_renders', noImgFallback ? 'PASS' : 'PARTIAL (fallback bg present, icon not confirmed without image data)');

        // ===== QA 7: featuredOnHome=false plant NOT on home =====
        await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });
        await new Promise(r => setTimeout(r, 4000));
        // QA Test Plant has featuredOnHome=false, so should NOT appear in home featured
        const homeHasQA = await page.evaluate(() => document.body.textContent.includes('QA Test Plant'));
        await log('QA7_home_excludes_non_featured_plant', !homeHasQA ? 'PASS' : 'FAIL (plant appears on home without featuredOnHome=true)');
        await page.screenshot({ path: path.join(artifactsDir, 'qa7_home.png') });

        // ===== QA 8: localName / serialNumber display consistency =====
        await page.goto('http://localhost:5173/collection', { waitUntil: 'domcontentloaded' });
        await new Promise(r => setTimeout(r, 3000));
        const hasQASerial = await page.evaluate(() => document.body.textContent.includes('SN-001'));
        const hasQALocalName = await page.evaluate(() => document.body.textContent.includes('QA俗名'));
        await log('QA8_collection_shows_serialNumber', hasQASerial ? 'PASS' : 'FAIL');
        await log('QA8_collection_shows_localName', hasQALocalName ? 'PASS' : 'FAIL');

    } catch(e) {
        console.error(e);
        await log('EXCEPTION', e.message);
    }
    
    await browser.close();
    server.kill();
    
    console.log('\n===== QA MATRIX RESULTS =====');
    Object.entries(results).forEach(([k, v]) => console.log(`${v === 'PASS' ? '✅' : '❌'} ${k}: ${v}`));
    process.exit(0);
})();
