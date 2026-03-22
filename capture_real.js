import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  
  page.on('dialog', async dialog => {
    console.log('Dialog caught:', dialog.message());
    await dialog.dismiss();
  });

  console.log('Navigating to Admin Plants...');
  await page.goto('http://localhost:5173/admin/plants', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 4000));
  
  // screenshot 1: Admin upload (actually whatever page we land on, likely login)
  await page.screenshot({ path: 'C:/Users/User/.gemini/antigravity/brain/70684471-0245-4085-83e2-e71308efcea4/real_admin_editor.png' });

  // Try to click upload or cover
  try {
    const fileInput = await page.$('input[type="file"]');
    if (fileInput) {
       await fileInput.uploadFile('dummy.jpg');
       await new Promise(r => setTimeout(r, 2000));
    } else {
       console.log('Image upload error: 找不到上傳按鈕，真實狀態下權限阻擋 / 已遭導回登入頁。');
    }
  } catch (e) {
    console.log('Image upload error:', e.message);
  }

  // screenshot 2: After cover / upload attempt
  await page.screenshot({ path: 'C:/Users/User/.gemini/antigravity/brain/70684471-0245-4085-83e2-e71308efcea4/real_admin_cover.png' });

  // Go to collection page
  console.log('Navigating to Collection...');
  await page.goto('http://localhost:5173/collection', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 4000));
  await page.screenshot({ path: 'C:/Users/User/.gemini/antigravity/brain/70684471-0245-4085-83e2-e71308efcea4/real_collection.png' });

  // Go to single plant page (try to click the first one if it exists)
  try {
    const firstPlant = await page.$('div.group.cursor-pointer');
    if (firstPlant) {
      await firstPlant.click();
      await new Promise(r => setTimeout(r, 4000));
    } else {
      console.log('No plants found in collection to click.');
    }
  } catch (e) {
    console.log('Error clicking plant:', e.message);
  }
  await page.screenshot({ path: 'C:/Users/User/.gemini/antigravity/brain/70684471-0245-4085-83e2-e71308efcea4/real_single_plant.png' });

  await browser.close();
  console.log('Done!');
})();
