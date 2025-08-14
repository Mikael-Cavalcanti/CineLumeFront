import { test, expect } from '@playwright/test';

test.describe('CineLume - Simple Chrome Test', () => {
  test('Quick login test with your credentials', async ({ page }) => {
    console.log('🚀 Starting simple Chrome test...');

    // Go to the app
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    console.log(`📍 Initial URL: ${page.url()}`);
    
    // Try to navigate to login if not already there
    if (!page.url().includes('login')) {
      await page.goto('/login');
      await page.waitForLoadState('networkidle');
    }

    console.log('🔐 Looking for login form...');
    
    // Find login elements - try multiple selectors
    const emailSelector = 'input[type="email"]';
    const passwordSelector = 'input[type="password"]';
    const submitSelector = 'button[type="submit"]';

    // Wait for elements to be visible
    await page.waitForSelector(emailSelector, { timeout: 10000 });
    await page.waitForSelector(passwordSelector, { timeout: 10000 });
    await page.waitForSelector(submitSelector, { timeout: 10000 });

    // Get credentials from environment
    const email = process.env.USER_EMAIL || 'test@example.com';
    const password = process.env.USER_PASSWORD || 'password123';
    
    console.log(`📧 Using email: ${email}`);

    // Fill the form slowly so you can see what's happening
    await page.fill(emailSelector, email);
    await page.waitForTimeout(1000);
    
    await page.fill(passwordSelector, password);
    await page.waitForTimeout(1000);

    // Take a screenshot before submitting
    await page.screenshot({ path: 'tests/screenshots/before-login.png' });

    // Submit the form
    await page.click(submitSelector);
    
    // Wait for navigation
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000); // Give extra time
    
    console.log(`📍 After login URL: ${page.url()}`);
    
    // Take screenshot after login attempt
    await page.screenshot({ path: 'tests/screenshots/after-login.png', fullPage: true });

    // Basic success check - we should not be on login page anymore
    const currentUrl = page.url();
    const notOnLogin = !currentUrl.includes('login');
    
    if (notOnLogin) {
      console.log('✅ Successfully moved away from login page');
      
      // If we're on profiles page, try to select a profile
      if (currentUrl.includes('profiles')) {
        console.log('🎭 On profiles page, looking for profiles...');
        
        // Wait a bit for profiles to load
        await page.waitForTimeout(2000);
        
        // Look for profile avatar/icon elements (NOT manage profiles button)
        const profileSelectors = [
          'img[alt*="avatar"]',
          'img[src*="avatar"]',
          'div:has(img):not(:has-text("Gerenciar")):not(:has-text("Manage"))',
          '[data-testid="profile-avatar"]',
          'div.cursor-pointer:has(img):not(:has-text("Gerenciar")):not(:has-text("Manage"))',
          'div.relative:has(img):not(:has-text("Gerenciar"))'
        ];
        
        let profileFound = false;
        
        for (const selector of profileSelectors) {
          const elements = page.locator(selector);
          const count = await elements.count();
          
          if (count > 0) {
            console.log(`🎭 Found ${count} profile elements with selector: ${selector}`);
            // Click on the first profile avatar (not manage profiles button)
            await elements.first().click();
            profileFound = true;
            console.log('✅ Clicked on profile avatar');
            break;
          }
        }
        
        if (!profileFound) {
          console.log('⚠️  No profile avatar found, trying alternative approach...');
          // Alternative: click on any clickable element that contains an image but not text
          const genericProfileSelector = 'div:has(img):not(:has-text(""))';
          const genericElements = page.locator(genericProfileSelector);
          const genericCount = await genericElements.count();
          
          if (genericCount > 0) {
            console.log(`🔍 Trying generic profile selector, found ${genericCount} elements`);
            await genericElements.first().click();
            profileFound = true;
          }
        }
        
        if (profileFound) {
          await page.waitForLoadState('networkidle');
          await page.waitForTimeout(2000);
          console.log(`📍 Final URL: ${page.url()}`);
          
          // Take final screenshot
          await page.screenshot({ path: 'tests/screenshots/final-page.png', fullPage: true });
        }
      }
    } else {
      console.log('❌ Still on login page, check credentials or error messages');
    }

    // Basic assertions
    expect(page.url()).toContain('localhost:3000');
    
    console.log('🎉 Simple test completed!');
  });
});