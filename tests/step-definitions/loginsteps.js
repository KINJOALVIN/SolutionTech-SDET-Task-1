const { Given, When, Then, Before, After, setDefaultTimeout } = require("@cucumber/cucumber");
const { chromium } = require("playwright");

let browser, context, page;
setDefaultTimeout(50 * 1000);

Before(async function () {
  if (!browser) {
    browser = await chromium.launch({ headless: false }); // Set true for CI/CD
    context = await browser.newContext();
    page = await context.newPage();
  }
});

// Navigate to Login Page
Given("User navigates to the login page", async function () {
  await page.goto("http://localhost:8000/login", { waitUntil: "load" });
  await page.waitForLoadState("networkidle");
});
// Valid Login Attempt (continues from previous scenario)
When("User enters valid username and password", async function () {
  await page.getByRole('textbox', { name: 'Email' }).fill('admin@account.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('password');
});

When("User clicks the submit button", async function () {
  await page.getByRole('button', { name: 'Log in' }).click();
});
Then("Dashboard is shown", async function () {
    await page.pause(); 
    await page.waitForLoadState("networkidle"); 
    await page.waitForTimeout(2000); 
    await page.getByRole('link', { name: 'Dashboard' }).waitFor({ timeout: 15000 });
   
});
    When("user goes to tours page", async function () {
           
           await page.getByRole('link', { name: 'Tours' }).click();
         });

    When('clicks create tours',  async function () {
           // Write code here that turns the phrase above into concrete actions
           await page.getByRole('button', { name: 'Create Tour' }).click();
         });

         When('Fills all the fields', async function () {
            await page.getByRole('textbox', { name: 'Enter tour name' }).fill('Test User');
            await page.getByRole('textbox', { name: 'Enter Tour description' }).fill('Test User');
            await page.locator('select[name="Choose Destination"]').selectOption({ label: 'Bali' });
            await page.getByRole('textbox', { name: 'Enter the price per slot' }).fill('Test User');
            await page.getByRole('textbox', { name: 'Enter the number of slots available' }).fill('Test User');
        
            await page.getByRole('button', { name: 'Submit' }).click();

         });

         Then('a new tour is created', async function () {
            await page.getByText("Tours created").waitFor();
            const errorMessage = await page.getByText("Tours created").textContent();
            console.log("Error Message:", errorMessage);
         });
    
           When('User goes to bookings page', async function () {
            await page.getByRole('link', { name: 'Bookings' }).click();
           });

           Then('User can view all bookings', async function () {
            await page.waitForSelector('.bookings-table', { timeout: 10000 }); // Adjust selector
           const bookings = await page.$$('.booking-row'); // Select all booking rows

           });

           When('User goes to tickets page', async function () {
            await page.getByRole('link', { name: 'Tickets' }).click();
           });

           Then('User can view all tickets', async function () {
            await page.waitForSelector('.tickets-table', { timeout: 10000 }); // Adjust selector
            const bookings = await page.$$('.tickets-row'); // Select all booking rows
 
           });
        

// Keep browser open after all scenarios
After(async function () {
  console.log("Test completed, browser session remains open.");
});