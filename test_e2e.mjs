import puppeteer from 'puppeteer';
import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';
import http from 'http';

const artifactsDir = 'C:\\Users\\User\\.gemini\\antigravity\\brain\\5e59930b-719d-4746-bcd5-37b7d2de9a06';

(async () => {
    console.log("Starting vite server...");
    const server = exec('npm run dev');
    
    await new Promise(r => setTimeout(r, 6000));
    console.log("Launching puppeteer...");
    
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    
    await page.setRequestInterception(true);
    
    page.on('request', (req) => {
        if (req.url().includes('src/AuthContext.tsx')) {
            http.get(req.url(), (res) => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => {
                    // Inject seeded admin
                    let faked = data.replace(
                        'setUser(firebaseUser);', 
                        'setUser({uid:"admin"} as any); setUserProfile({uid:"admin", role:"admin", status:"approved"} as any); setLoading(false); setIsAuthReady(true); return;'
                    );
                    faked = faked.replace(
                        'setUser(firebaseUser)', 
                        'setUser({uid:"admin"} as any); setUserProfile({uid:"admin", role:"admin", status:"approved"} as any); setLoading(false); setIsAuthReady(true); return;'
                    );
                    req.respond({
                        status: 200,
                        contentType: res.headers['content-type'],
                        body: faked
                    });
                });
            }).on('error', err => {
                console.error(err);
                req.continue();
            });
        } else {
            req.continue();
        }
    });

    try {
        console.log("Navigating to Admin Plants...");
        await page.goto('http://localhost:5173/admin/plants');
        await new Promise(r => setTimeout(r, 3000));
        await page.screenshot({ path: path.join(artifactsDir, 'admin_plants_list.png'), fullPage: true });

        console.log("Clicking Create Plant Record...");
        await page.click('button:has-text("Create Plant")').catch(() => page.click('button'));
        await new Promise(r => setTimeout(r, 3000));
        await page.screenshot({ path: path.join(artifactsDir, 'admin_plants_create.png'), fullPage: true });

        console.log("Taking editor screenshot...");
        await page.screenshot({ path: path.join(artifactsDir, 'admin_plants_editor.png'), fullPage: true });

        // Go home
        await page.goto('http://localhost:5173/');
        await new Promise(r => setTimeout(r, 3000));
        await page.screenshot({ path: path.join(artifactsDir, 'home_sync.png'), fullPage: true });
        
        await page.goto('http://localhost:5173/collection');
        await new Promise(r => setTimeout(r, 3000));
        await page.screenshot({ path: path.join(artifactsDir, 'collection_sync.png'), fullPage: true });

    } catch(e) {
        console.error(e);
    }
    
    await browser.close();
    server.kill();
    console.log("Done");
    process.exit(0);
})();
