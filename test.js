import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const url = 'http://localhost:5173';
  const delay = ms => new Promise(res => setTimeout(res, ms));

  let report = '--- Puppeteer Test Report ---\n';
  const log = (msg) => { console.log(msg); report += msg + '\n'; }

  try {
    log("Checking Home...");
    await page.goto(url, { waitUntil: 'networkidle2' });
    await page.waitForSelector('h1', {timeout: 5000});
    let homeText = await page.content();
    if(homeText.includes('專注於龜甲龍的')) log("✓ Home text");
    else log("! Home text missing");

    log("Checking Collection...");
    await page.click('a[href="/collection"]');
    await delay(1500); // give it time to load firestore
    let collectionText = await page.content();
    // Console log the text for debugging if it fails
    if(collectionText.includes('可釋出') && collectionText.includes('觀察中')) log("✓ Collection categories");
    else log("! Collection categories missing");

    log("Checking Plant Profile...");
    let plants = await page.$$('.group.cursor-pointer');
    if(plants.length > 0) {
      await plants[0].click();
      await delay(1500); 
      let profileText = await page.content();
      if(profileText.includes('判讀摘要') && profileText.includes('適合對象')) log("✓ Plant Profile text");
      else log("! Plant Profile text missing. Text snippet: " + profileText.substring(0, 50));
    } else {
      log("! No plants found in Collection.");
    }

    log("Checking Learn...");
    await page.click('a[href="/learn"]');
    await delay(1000);
    let learnText = await page.content();
    if(learnText.includes('判讀與培育') || learnText.includes('FAQ')) log("✓ Learn text");
    else log("! Learn text missing");

    log("Checking About...");
    await page.click('a[href="/about"]');
    await delay(500);
    let aboutText = await page.content();
    if(aboutText.includes('時間的觀察者')) log("✓ About text");
    else log("! About text missing");

    log("Checking Business...");
    await page.click('a[href="/business"]');
    await delay(500);
    let businessText = await page.content();
    if(businessText.includes('空間陳列與顧問')) log("✓ Business text");
    else log("! Business text missing");

    log("Checking Login / Join...");
    let navLinks = await page.$$('a[href="/login"]');
    if(navLinks.length > 0) {
      await navLinks[0].click();
      await delay(1000);
      let loginText = await page.content();
      if(loginText.includes('使用 Google 登入')) log("✓ Login text");
      else log("! Login text missing");
    } else {
      log("! Login link missing");
    }

  } catch (e) {
    log("❌ Error during flow: " + e.message);
  } finally {
    await browser.close();
  }
})();
