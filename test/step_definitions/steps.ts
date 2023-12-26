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

const {I} = inject();
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

When('I click on {string} link', (text: string) => {
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

Then('I am on admin page', () => {
    I.amOnPage('/admin');
});

Then('I click on {string} in sidebar', (text: string) => {
    const element = `//span[contains(text(), '${text}')]`;
    I.click(element);
});

Then('I click on {string}', (text: string) => {
    const element = `//a[contains(text(), '${text}')]`;
    I.click(element);
});

Given('I am on admin products page', () => {
    I.amOnPage('/admin/products');
});

Then('I see {string} in title', async (text: string) => {
    await I.seeInCurrentUrl('/admin/products');
    await I.see(`${text}`);
});

Given('I am on create products page', () => {
    I.amOnPage('/admin/addProduct');
});

When('I select {string} in category select', async (text: string) => {
    const select = `//select`;
    const option = `//select/option[normalize-space(text())="${text}"]`;
    const categoryId = await I.grabAttributeFrom(option, 'data-category-id');

    I.selectOption(select, categoryId);
});
When('I attach the file {string} to the input', async (filePath) => {
    const input = '//input[@id="fileCategory" and @type="file" and @name="file"]';
    I.attachFile(input, filePath);
});
Then('I click on {string} button', () => {
    const element =`//button[@type="submit"]`
    I.click(element);
});

Then('I see {string}', (text: string) => {
    I.see(`${text}`);
});


