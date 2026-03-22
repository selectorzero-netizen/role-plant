import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  
  page.on('dialog', async dialog => {
    console.log('Dialog caught:', dialog.message());
    await dialog.dismiss();
  });

  // 1. Go to Login Page and use the seeded DEV admin login
  console.log('Navigating to Login...');
  await page.goto('http://localhost:5173/login', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 2000));
  
  console.log('Taking screenshot of DEV Admin Login...');
  await page.screenshot({ path: 'C:/Users/User/.gemini/antigravity/brain/70684471-0245-4085-83e2-e71308efcea4/emu_login.png' });
  
  console.log('Clicking DEV Admin login button...');
  // The button has "w-full bg-red-800 text-white"
  const devLoginBtn = await page.$('button.bg-red-800');
  if (devLoginBtn) {
    await devLoginBtn.click();
    await new Promise(r => setTimeout(r, 4000)); // wait for login and redirect to /admin
  } else {
    console.log('DEV Login button not found!');
  }

  // 2. Go to Admin Plants
  console.log('Navigating to Admin Plants...');
  await page.goto('http://localhost:5173/admin/plants', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 3000));

  // Click "新增草稿檔案"
  try {
    const btn = await page.$('button.bg-\\[\\#1A1A1A\\]');
    if (btn) {
      await btn.click();
      await new Promise(r => setTimeout(r, 3000));
    }
  } catch (e) {
    console.log('Error clicking new draft:', e.message);
  }

  // screenshot 1: Admin Editor after successful creation (because Emulator allows it!)
  console.log('Taking screenshot of Admin Editor...');
  await page.screenshot({ path: 'C:/Users/User/.gemini/antigravity/brain/70684471-0245-4085-83e2-e71308efcea4/emu_admin_editor.png' });

  // 3. Upload Image
  const fs = await import('fs');
  fs.writeFileSync('dummy.jpg', Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', 'base64'));

  try {
    const fileInput = await page.$('input[type="file"]');
    if (fileInput) {
       await fileInput.uploadFile('dummy.jpg');
       await new Promise(r => setTimeout(r, 4000)); // wait for emulator storage upload
    } else {
       console.log('Image upload input not found!');
    }
  } catch (e) {
    console.log('Image upload error:', e.message);
  }

  // screenshot 2: After cover / upload attempt
  console.log('Taking screenshot after Upload...');
  await page.screenshot({ path: 'C:/Users/User/.gemini/antigravity/brain/70684471-0245-4085-83e2-e71308efcea4/emu_admin_upload.png' });
  
  // Set as cover
  try {
    await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const coverBtn = btns.find(b => b.textContent && b.textContent.includes('設封面'));
        if (coverBtn) coverBtn.click();
    });
    await new Promise(r => setTimeout(r, 1000));
  } catch(e) {
      console.log('Set cover error:', e.message);
  }

  // Set status and click Save
  try {
     await page.evaluate(() => {
         // Fix select & public so it shows in collection
         const selects = document.querySelectorAll('select');
         if(selects.length > 0) {
             const evt = new Event('change', { bubbles: true });
             selects[0].value = 'exhibiting';
             selects[0].dispatchEvent(evt);
         }
         const checkboxes = document.querySelectorAll('input[type="checkbox"]');
         if(checkboxes.length > 0) {
             checkboxes[0].checked = true;
             checkboxes[0].dispatchEvent(new Event('change', { bubbles: true }));
         }
         
         const btns = Array.from(document.querySelectorAll('button'));
         const saveBtn = btns.find(b => b.textContent && b.textContent.includes('儲存檔案'));
         if (saveBtn) saveBtn.click();
     });
     await new Promise(r => setTimeout(r, 4000)); // wait for save
  } catch(e) {
     console.log('Save error:', e.message);
  }

  await page.screenshot({ path: 'C:/Users/User/.gemini/antigravity/brain/70684471-0245-4085-83e2-e71308efcea4/emu_admin_cover.png' });

  // 4. Go to collection page
  console.log('Navigating to Collection...');
  await page.goto('http://localhost:5173/collection', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 3000));
  await page.screenshot({ path: 'C:/Users/User/.gemini/antigravity/brain/70684471-0245-4085-83e2-e71308efcea4/emu_collection.png' });

  // 5. Go to single plant page
  try {
    const firstPlant = await page.$('div.group.cursor-pointer');
    if (firstPlant) {
      await firstPlant.click();
      await new Promise(r => setTimeout(r, 3000));
    }
  } catch (e) {
    console.log('Error clicking plant:', e.message);
  }
  await page.screenshot({ path: 'C:/Users/User/.gemini/antigravity/brain/70684471-0245-4085-83e2-e71308efcea4/emu_single_plant.png' });

  await browser.close();
  console.log('Done!');
})();
