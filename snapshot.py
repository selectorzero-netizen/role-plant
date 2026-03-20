from playwright.sync_api import sync_playwright
import time

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5174/collection')
    page.wait_for_load_state('networkidle')
    page.screenshot(path='c:/Users/User/.gemini/antigravity/brain/5e59930b-719d-4746-bcd5-37b7d2de9a06/after_collection.png')
    
    page.goto('http://localhost:5174/collection/RP-24-001')
    page.wait_for_load_state('networkidle')
    page.screenshot(path='c:/Users/User/.gemini/antigravity/brain/5e59930b-719d-4746-bcd5-37b7d2de9a06/after_single_plant.png')
    
    page.goto('http://localhost:5174/login')
    page.wait_for_load_state('networkidle')
    page.screenshot(path='c:/Users/User/.gemini/antigravity/brain/5e59930b-719d-4746-bcd5-37b7d2de9a06/after_login.png')
    browser.close()
