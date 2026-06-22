import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login'

test('test', async ({ page }) => {

  const Login = new LoginPage(page)

  await Login.gotoLoginPage()
  await Login.login('moe', '1234567890')

  // await page.goto('https://the-internet.herokuapp.com/login');
  // await page.getByLabel('Username').click();
  // await page.getByLabel('Username').fill('moe');
  // await page.getByLabel('Password').click();
  // await page.getByLabel('Password').fill('1234567890');
  // await page.getByRole('button', { name: ' Login' }).click();
});