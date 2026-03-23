import puppeteer from 'puppeteer';

(async () => {
  console.log('Starting minimal verification...');
  let hasNetworkFailedError = false;
  let browser = await puppeteer.launch({ headless: true });
  try {
    const page = await browser.newPage();
    page.on('console', msg => {
      const text = msg.text();
      if (text.includes('auth/network-request-failed') ||
          text.includes('Could not reach Cloud Firestore backend') ||
          text.includes('ERR_CONNECTION_REFUSED')) {
        hasNetworkFailedError = true;
        console.error('DETECTED ERROR:', text);
      }
    });

    console.log('Navigating to http://127.0.0.1:5173/admin/plants...');
    
    // Will fail if vite isn't answering on 127.0.0.1
    try {
      await page.goto('http://127.0.0.1:5173/admin/plants', { waitUntil: 'domcontentloaded', timeout: 60000 });
    } catch (e) {
      console.log('Failed to load page. Is vite running on 127.0.0.1:5173? Trying localhost to confirm...');
      throw new Error('VITE_NOT_RUNNING_ON_127.0.0.1');
    }
    
    // Inject super_admin
    await page.evaluate(() => {
      localStorage.setItem('__dev_role__', 'super_admin');
    });
    // Reload to apply
    await page.goto('http://127.0.0.1:5173/admin/plants', { waitUntil: 'domcontentloaded', timeout: 60000 });

    console.log('Checking for network errors...');
    await new Promise(r => setTimeout(r, 2000));

    if (hasNetworkFailedError) {
      console.log('RESULT: A. FAILED (auth/network-request-failed observed)');
    } else {
      console.log('RESULT: A. PASSED (No auth/network-request-failed)');
      
      const pageText = await page.evaluate(() => document.body.innerText);
      
      if (hasNetworkFailedError) {
         // double check
         return; 
      }

      if (pageText.includes('Loading') || pageText.includes('載入中') || pageText.includes('載入')) {
        if (!pageText.includes('新增植株') && !pageText.includes('植物列表')) {
          console.log('RESULT: B. FAILED (Firestore stuck on loading)');
        } else {
          console.log('RESULT: B. PASSED (Firestore data loaded)');
        }
      } else {
        console.log('RESULT: B. PASSED (Firestore data loaded)');
        
        // Try minimal write by finding the button more robustly or injecting a quick script
        console.log('Attempting minimal write flow...');
        const createSuccess = await page.evaluate(async () => {
          const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('建立草稿'));
          if (btn) {
             btn.click();
             return true;
          }
          return false;
        });

        if (createSuccess) {
           await page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 5000 }).catch(e => {});
           if (page.url().includes('/admin/plants/')) {
             console.log('RESULT: C. PASSED (Created draft and navigated)');
           } else {
             console.log('RESULT: C. FAILED (Button found and clicked but URL did not change)');
           }
        } else {
           console.log('RESULT: C. FAILED (Could not find Create button)');
           console.log('Page text snapshot:', pageText.slice(0, 500));
        }
      }
    }
    
  } catch (err) {
    console.error('CRITICAL FAILURE:', err.message);
  } finally {
    await browser.close();
  }
})();
