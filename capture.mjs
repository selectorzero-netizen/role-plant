import puppeteer from 'puppeteer';
import { spawn } from 'child_process';
import path from 'path';

const artifactsDir = 'C:\\Users\\User\\.gemini\\antigravity\\brain\\5e59930b-719d-4746-bcd5-37b7d2de9a06';

(async () => {
    console.log("Starting vite...");
    const server = spawn('npm', ['run', 'dev'], { shell: true, detached: false });
    
    await new Promise(r => setTimeout(r, 8000));
    console.log("Launching puppeteer...");
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    try {
        await page.goto('http://localhost:5173/');
        await page.evaluate(() => localStorage.setItem('E2E_ADMIN', 'true'));
        
        console.log("1. /admin/plants 列表");
        await page.goto('http://localhost:5173/admin/plants');
        await new Promise(r => setTimeout(r, 4000));
        await page.screenshot({ path: path.join(artifactsDir, '1_admin_plants_list.png'), fullPage: true });

        console.log("2. 點擊 Create Plant");
        await page.evaluate(() => {
            const btns = Array.from(document.querySelectorAll('button'));
            const cBtn = btns.find(b => b.textContent && b.textContent.includes('Create Plant Record'));
            if(cBtn) cBtn.click();
        });
        await new Promise(r => setTimeout(r, 4000));
        await page.screenshot({ path: path.join(artifactsDir, '2_admin_plants_create.png'), fullPage: true });

        // Let's type something to generate dirty state
        await page.evaluate(() => {
            const inputs = document.querySelectorAll('input');
            if(inputs.length > 0) {
                inputs[0].value = "Test Plant Data";
                inputs[0].dispatchEvent(new Event('input', { bubbles: true }));
            }
        });
        await new Promise(r => setTimeout(r, 1000));
        await page.screenshot({ path: path.join(artifactsDir, '3_admin_plants_editor_dirty.png'), fullPage: true });

        // Try Upload failure
        console.log("3. 圖片上傳失敗測試");
        // We can't trigger native input[type=file] dialogue, but we can upload a dummy file via ElementHandle
        const fileInput = await page.$('input[type="file"]');
        if (fileInput) {
            // Need a dummy file on disk. Let's create one
            const fs = await import('fs');
            fs.writeFileSync('dummy.jpg', 'base64...');
            await fileInput.uploadFile('dummy.jpg');
            await new Promise(r => setTimeout(r, 3000)); // wait for upload try
            await page.screenshot({ path: path.join(artifactsDir, '4_upload_failed.png'), fullPage: true });
        }

        // Try Save
        console.log("Try Save failure");
        await page.evaluate(() => {
            const btns = Array.from(document.querySelectorAll('button'));
            const sBtn = btns.find(b => b.textContent && b.textContent.includes('儲存檔案'));
            if(sBtn) sBtn.click();
        });
        await new Promise(r => setTimeout(r, 2000));
        await page.screenshot({ path: path.join(artifactsDir, '5_save_failure.png'), fullPage: true });

        console.log("5. 首頁");
        await page.goto('http://localhost:5173/');
        await new Promise(r => setTimeout(r, 4000));
        await page.screenshot({ path: path.join(artifactsDir, '6_home_sync.png'), fullPage: true });

        console.log("6. Collection");
        await page.goto('http://localhost:5173/collection');
        await new Promise(r => setTimeout(r, 4000));
        await page.screenshot({ path: path.join(artifactsDir, '7_collection_sync.png'), fullPage: true });

    } catch(e) {
        console.error(e);
    }
    
    await browser.close();
    server.kill();
    console.log("Done");
    process.exit(0);
})();
