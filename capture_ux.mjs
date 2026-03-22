import puppeteer from 'puppeteer';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

const artifactsDir = 'C:\\Users\\User\\.gemini\\antigravity\\brain\\105ea1c7-148c-4625-88c2-a632cec65aef';

(async () => {
    console.log("Starting vite...");
    const server = spawn('cmd.exe', ['/c', 'npm run dev'], { detached: false });
    
    // give vite server time to start
    await new Promise(r => setTimeout(r, 10000));
    console.log("Launching puppeteer...");
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 1000 });

    try {
        // 1. Login
        console.log("Navigating to Login...");
        await page.goto('http://localhost:5173/login', { waitUntil: 'domcontentloaded' });
        await new Promise(r => setTimeout(r, 2000));
        const devLoginBtn = await page.$('button.bg-red-800');
        if (devLoginBtn) {
            await devLoginBtn.click();
            await new Promise(r => setTimeout(r, 4000)); 
        } else {
            // Might have auto login via E2E_ADMIN or similar, let's try setting it just in case
            await page.evaluate(() => localStorage.setItem('E2E_ADMIN', 'true'));
        }

        // 2. Go to Admin Plants
        console.log("Navigating to /admin/plants...");
        await page.goto('http://localhost:5173/admin/plants', { waitUntil: 'domcontentloaded' });
        await new Promise(r => setTimeout(r, 3000));
        
        // click create draft if exists, else click the first plant
        await page.evaluate(() => {
            const btns = Array.from(document.querySelectorAll('button'));
            const cBtn = btns.find(b => b.textContent && (b.textContent.includes('新增草稿檔案') || b.textContent.includes('Create')));
            if(cBtn) {
                cBtn.click();
            } else {
                const rows = document.querySelectorAll('tbody tr');
                if (rows.length > 0) rows[0].click();
            }
        });
        await new Promise(r => setTimeout(r, 3000));
        
        // 4. Capture Controlled Fields
        console.log("Capturing Controlled Fields...");
        // Scroll to taxonomy section
        await page.evaluate(() => window.scrollTo(0, 500));
        await new Promise(r => setTimeout(r, 500));
        await page.screenshot({ path: path.join(artifactsDir, 'screenshot_4_controlled.png') });

        // 1. Generate dirty state
        console.log("Typing to generate dirty state...");
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.evaluate(() => {
            const inputs = document.querySelectorAll('input');
            if(inputs.length > 0) {
                inputs[0].value = "Modified Plant " + Date.now();
                inputs[0].dispatchEvent(new Event('input', { bubbles: true }));
                inputs[0].dispatchEvent(new Event('change', { bubbles: true }));
            }
        });
        await new Promise(r => setTimeout(r, 500));
        await page.screenshot({ path: path.join(artifactsDir, 'screenshot_1_unsaved.png') }); 

        // 3. Upload dummy image 
        console.log("Uploading dummy image...");
        fs.writeFileSync('dummy_cover.jpg', Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', 'base64'));
        
        const fileInput = await page.$('input[type="file"]');
        if (fileInput) {
            await fileInput.uploadFile('dummy_cover.jpg');
            await new Promise(r => setTimeout(r, 3000)); 
        }
        await page.evaluate(() => window.scrollTo(0, 300));
        await new Promise(r => setTimeout(r, 500));
        await page.screenshot({ path: path.join(artifactsDir, 'screenshot_3_images.png') });

        // 2. Save
        console.log("Saving...");
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.evaluate(() => {
            const btns = Array.from(document.querySelectorAll('button'));
            const sBtn = btns.find(b => b.textContent && b.textContent.includes('儲存檔案'));
            if(sBtn) sBtn.click();
        });
        await new Promise(r => setTimeout(r, 500)); // The success message might take a moment, but UI updates to saved almost instantly if fast
        await page.screenshot({ path: path.join(artifactsDir, 'screenshot_2_saved.png') });

    } catch(e) {
        console.error(e);
    }
    
    await browser.close();
    server.kill();
    console.log("Done");
    process.exit(0);
})();
