// import * as wasi from "wasi";

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
  I.executeScript((locator) => {
    const element = document.querySelector(locator);

    element.click();

  }, text);

});

When('I enter form fields:', (userData: IDataTable) => {
  userData.rows.forEach((row) => {
    const [fieldName, fieldValue] = row.cells;

    I.fillField(fieldName.value, fieldValue.value);
  });
});

When('I click {string} button', (text: string) => {
  I.executeScript((locator) => {
    const element = document.querySelector(locator);

    element.click();
  }, text);
});

Then('I see main page', () => {
  I.wait(5);
  I.seeInCurrentUrl('/');
});

When('I see main page', () => {
  I.wait(5);
  I.seeInCurrentUrl('/');
});

When('I move mouse to {string} in user menu', (text: string) => {
  I.moveCursorTo(text);
});


When('I click {string} in user menu', (text: string) => {
  I.executeScript((locator) => {
    const element = document.querySelector(locator);

    element.click();
  }, text);
});

Then('I see main page and {string}', async (text: string) => {
  I.wait(5);
  I.seeInCurrentUrl('/');
  I.seeElement(text);
});

Then('I see {string} in user menu', (login: string) => {
  const text = `${login}`;

  I.see(text);
});

Given('I am on the products page', () => {
  I.amOnPage('/products/page/1');
});

When('I click on the product link', () => {
  I.click('[data-product-id]:first-child');
});

Then('I see the product page and "В каталог"', async () => {
  await I.seeInCurrentUrl('/products/');
  await I.see('В каталог');
});

Given('I am on main page', () => {
  I.amOnPage('/');
});

Given('I click on {string} link', (text: string) => {
  I.click(`//a[contains(text(), '${text}')]`);
});

Then('I am on products page', () => {
  I.amOnPage('/products/page/1');
});

Then('I am on about us page', () => {
  I.amOnPage('/about');
  I.see('О нас');
});

Then('I am on cart page', () => {
  I.amOnPage('/cart');
  I.see('Корзина');
});


