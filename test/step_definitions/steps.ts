// import * as wasi from "wasi";
import assert from 'assert';

interface IDataTableCalls {
  value: string
}

interface IDataTableRows {
  cells: IDataTableCalls[],
}
interface IDataTable {
  rows: IDataTableRows[],
}

const { I } = inject();
// Add in your custom step files

// Given('I have a defined step', () => {
//   // TODO: replace with your own step
// });

Given('I am on accounts page', () => {
  I.amOnPage('/accounts');
});

Given('I click the {string} button', (text: string) => {
  I.click(`//button[contains(text(), '${text}')]`);
});

When('I enter form fields:', (userData: IDataTable) => {
  userData.rows.forEach((row) => {
    const [fieldName, fieldValue] = row.cells;

    I.fillField(fieldName.value, fieldValue.value);
  });
});

When('I click {string} button', (text: string) => {
  I.click(`//button[contains(text(), '${text}')]`);
});

Then('I see {string} in user menu.', (logout: string) => {
  const text = `${logout}`;

  I.see(text);
});

const productId = ['65796edc808b3741700725be', '65796edc808b3741700725bc', '65796edc808b3741700725c5', '65796edc808b3741700725bd'];
Given('I am on products page', () => {
  I.amOnPage('/products/page/1');
});

When('I click on a random product link', async () => {
  const randomProductId = productId[Math.floor(Math.random() * productId.length)];
  const productLinkSelector = `//a[contains(@href, '/products/${randomProductId}')]`;
  await I.waitForElement(productLinkSelector);
  I.click(productLinkSelector);
});

Then('I should be on the product page', async () => {
  const currentUrl = await I.grabCurrentUrl();
  const expectedUrlPart = '/products/';

  // Проверяем, что текущий URL содержит ожидаемый фрагмент URL (часть)
  assert.ok(currentUrl.includes(expectedUrlPart), `Expected URL to include "${expectedUrlPart}", but got "${currentUrl}"`);
});