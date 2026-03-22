import puppeteer from 'puppeteer';
import { spawn } from 'child_process';
import path from 'path';

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
        // 1. Home
        console.log("Navigating to Home...");
        await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });
        await new Promise(r => setTimeout(r, 4000));
        await page.evaluate(() => window.scrollTo(0, 1000)); // scroll to featured plants
        await new Promise(r => setTimeout(r, 500));
        await page.screenshot({ path: path.join(artifactsDir, 'screenshot_home.png') });

        // 2. Collection
        console.log("Navigating to /collection...");
        await page.goto('http://localhost:5173/collection', { waitUntil: 'domcontentloaded' });
        await new Promise(r => setTimeout(r, 4000));
        await page.screenshot({ path: path.join(artifactsDir, 'screenshot_collection.png') });

        // 3. Single Plant Page
        console.log("Navigating to /collection/:id...");
        // Click the first plant in the collection
        await page.evaluate(() => {
            const items = document.querySelectorAll('.group.cursor-pointer');
            if (items.length > 0) items[0].click();
        });
        await new Promise(r => setTimeout(r, 4000));
        await page.screenshot({ path: path.join(artifactsDir, 'screenshot_single.png') });

        // 4. Admin List
        console.log("Navigating to /admin/plants...");
        // To access admin, we might need E2E_ADMIN or login again.
        await page.goto('http://localhost:5173/login', { waitUntil: 'domcontentloaded' });
        await new Promise(r => setTimeout(r, 2000));
        const devLoginBtn = await page.$('button.bg-red-800');
        if (devLoginBtn) {
            await devLoginBtn.click();
            await new Promise(r => setTimeout(r, 4000)); 
        } else {
            await page.evaluate(() => localStorage.setItem('E2E_ADMIN', 'true'));
        }

        await page.goto('http://localhost:5173/admin/plants', { waitUntil: 'domcontentloaded' });
        await new Promise(r => setTimeout(r, 4000));
        await page.screenshot({ path: path.join(artifactsDir, 'screenshot_admin_list.png') });

    } catch(e) {
        console.error(e);
    }
    
    await browser.close();
    server.kill();
    console.log("Done");
    process.exit(0);
})();
