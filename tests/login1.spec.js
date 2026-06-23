import { test } from '@playwright/test';

const credentials = {
  username: 'standard_user',
  password: 'secret_sauce',
};

const itemsToAdd = [
  'sauce-labs-bike-light',
  'sauce-labs-backpack',
  'sauce-labs-bolt-t-shirt',
  'sauce-labs-fleece-jacket',
  'test.allthethings()-t-shirt-(red)',
  'sauce-labs-onesie',
];

const itemsToRemove = ['sauce-labs-onesie', 'test.allthethings()-t-shirt-(red)'];

const checkoutDetails = {
  firstName: 'Test',
  lastName: 'Tester',
  postalCode: '123',
};

test.beforeEach(async ({ page }) => {
  console.log('Opening Sauce Demo login page');
  await page.goto('https://www.saucedemo.com/');
  console.log(`Entering username: ${credentials.username}`);
  await page.locator('[data-test="username"]').fill(credentials.username);
  console.log('Entering password');
  await page.locator('[data-test="password"]').fill(credentials.password);
  console.log('Submitting login form');
  await page.locator('[data-test="login-button"]').click();
});

test.afterEach(async ({ page }) => {
  console.log('Opening application menu');
  await page.getByRole('button', { name: 'Open Menu' }).click();
  console.log('Logging out');
  await page.locator('[data-test="logout-sidebar-link"]').click();
});

test ('Add every item to cart and remove some then checkout', async ({ page }) => {
  for (const item of itemsToAdd) {
    console.log(`Adding item to cart: ${item}`);
    await page.locator(`[data-test="add-to-cart-${item}"]`).click();
  }

  console.log('Opening shopping cart');
  await page.locator('[data-test="shopping-cart-link"]').click();

  for (const item of itemsToRemove) {
    console.log(`Removing item from cart: ${item}`);
    await page.locator(`[data-test="remove-${item}"]`).click();
  }

  console.log('Starting checkout');
  await page.locator('[data-test="checkout"]').click();

  for (const [field, value] of Object.entries(checkoutDetails)) {
    console.log(`Filling checkout field: ${field}`);
    await page.locator(`[data-test="${field}"]`).fill(value);
  }

  console.log('Continuing checkout');
  await page.locator('[data-test="continue"]').click();
  console.log('Finishing checkout');
  await page.locator('[data-test="finish"]').click();
  console.log('Returning to products page');
  await page.locator('[data-test="back-to-products"]').click();
});

test('Add every item to cart and remove all then checkout', async ({ page }) => {
  for (const item of itemsToAdd) {
    console.log(`Adding item to cart: ${item}`);
    await page.locator(`[data-test="add-to-cart-${item}"]`).click();
  }

  console.log('Opening shopping cart');
  await page.locator('[data-test="shopping-cart-link"]').click();

  for (const item of itemsToAdd) {
    console.log(`Removing item from cart: ${item}`);
    await page.locator(`[data-test="remove-${item}"]`).click();
  }

  console.log('Starting checkout');
  await page.locator('[data-test="checkout"]').click();

  for (const [field, value] of Object.entries(checkoutDetails)) {
    console.log(`Filling checkout field: ${field}`);
    await page.locator(`[data-test="${field}"]`).fill(value);
  }

  console.log('Continuing checkout');
  await page.locator('[data-test="continue"]').click();
  console.log('Finishing checkout');
  await page.locator('[data-test="finish"]').click();
  console.log('Returning to products page');
  await page.locator('[data-test="back-to-products"]').click();
});
