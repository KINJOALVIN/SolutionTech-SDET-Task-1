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
Given("User navigates to Main page", async function () {
  await page.goto("http://localhost:8000/", { waitUntil: "load" });
  await page.waitForLoadState("networkidle");
});

When("user clicks book tour", async function () { 
    await page.getByRole('button', { name: 'Book Tour' }).first().click();

});

Then("inputs all tour details", async function () {
    await page.getByRole('textbox', { name: 'Please enter the number of slots you are booking.' }).fill('1');
    await page.getByRole('textbox', { name: 'Please enter the ticket holder name.' }).fill('Lindah');
    await page.getByRole('textbox', { name: 'Please enter your email address..' }).fill('Lindah@account.com');
    await page.getByRole('button', { name: 'Book Tour' }).click();
  });

  Then('Ticket details are displayed', async function () {
    await page.getByText("Ticket Details").waitFor();
    const errorMessage = await page.getByText("Bookings made successfully").textContent();
    console.log("Error Message:", errorMessage);
    await page.getByRole('button', { name: 'Done' }).click();
 });

// Invalid Login Attempt
Then("User enters invalid username and password", async function () {
 await page.getByRole('link', { name: 'Log in' }).waitFor({ timeout: 15000 });
  await page.getByRole('textbox', { name: 'Email' }).fill('testuser@example.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('wrongpassword');
});

When("User clicks the login button", async function () {
  await page.getByRole('button', { name: 'Log in' }).click();
});

Then("An error message should be displayed", async function () {
  await page.getByText("These credentials do not match our records").waitFor();
  const errorMessage = await page.getByText("These credentials do not match our records").textContent();
  console.log("Error Message:", errorMessage);
});