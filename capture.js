import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  
  page.on('dialog', async dialog => {
    console.log('Dialog caught:', dialog.message());
    await dialog.dismiss();
  });

  console.log('Navigating to Homepage...');
  await page.goto('http://localhost:5173', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 3000));
  await page.screenshot({ path: 'C:/Users/User/.gemini/antigravity/brain/70684471-0245-4085-83e2-e71308efcea4/homepage.png' });

  console.log('Navigating to Admin Plants...');
  await page.goto('http://localhost:5173/admin/plants', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 3000));
  
  // Try to click "新增草稿檔案" if it exists
  try {
    const btn = await page.$('button.bg-\\[\\#1A1A1A\\]');
    if (btn) {
      await btn.click();
      await new Promise(r => setTimeout(r, 3000));
    }
  } catch (e) {
    console.log('No new button found or error:', e.message);
  }

  // We should be in the editor now or failed
  console.log('Taking screenshot of Admin Editor...');
  await page.screenshot({ path: 'C:/Users/User/.gemini/antigravity/brain/70684471-0245-4085-83e2-e71308efcea4/admin_editor.png' });

  // Upload an image requires an input type=file, let's create a dummy image locally
  const fs = await import('fs');
  fs.writeFileSync('dummy.jpg', Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', 'base64'));

  try {
    const fileInput = await page.$('input[type="file"]');
    if (fileInput) {
       await fileInput.uploadFile('dummy.jpg');
       await new Promise(r => setTimeout(r, 2000)); // wait for upload
    }
  } catch (e) {
    console.log('Image upload error:', e.message);
  }

  console.log('Taking screenshot after Upload attempt...');
  await page.screenshot({ path: 'C:/Users/User/.gemini/antigravity/brain/70684471-0245-4085-83e2-e71308efcea4/admin_upload.png' });
  
  // Go to collection page
  console.log('Navigating to Collection...');
  await page.goto('http://localhost:5173/collection', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 3000));
  await page.screenshot({ path: 'C:/Users/User/.gemini/antigravity/brain/70684471-0245-4085-83e2-e71308efcea4/collection.png' });

  await browser.close();
  console.log('Done!');
})();
