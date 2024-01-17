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

Given('I am on accounts page', () => {
    I.wait(10);
    I.amOnPage('/accounts');
});

Given('I click the {string} button', async (text: string) => {
    await I.executeScript((locator) => {
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

When('I click {string} button', async (text: string) => {
    await I.executeScript((locator) => {
        const element = document.querySelector(locator);

        element.click();
    }, text);
});

Then('I see main page', () => {
    I.wait(10);
    I.seeInCurrentUrl('/');
});

When('I see main page', () => {
    I.wait(10);
    I.seeInCurrentUrl('/');
});

When('I move mouse to {string} in user menu', (text: string) => {
    I.moveCursorTo(text);
});


When('I click {string} in user menu', async (text: string) => {
    await I.executeScript((locator) => {
        const element = document.querySelector(locator);

        element.click();
    }, text);
});

Then('I see main page and {string}', async (text: string) => {
    I.wait(10);
    I.seeInCurrentUrl('/');
    I.seeElement(text);
});

Then('I see {string} in user menu', (login: string) => {
    const text = `${login}`;

    I.see(text);
});

Given('I am on the products page', () => {
    I.wait(10);
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
    I.wait(10);
    I.amOnPage('/');
});

When('I click on {string} link', (text: string) => {
    I.click(`//a[contains(text(), '${text}')]`);
});

Then('I am on products page', () => {
    I.wait(10);
    I.amOnPage('/products/page/1');
});

Then('I am on about us page', () => {
    I.wait(10);
    I.amOnPage('/about');
    I.see('О нас');
});

Then('I am on cart page', () => {
    I.wait(10);
    I.amOnPage('/cart');
    I.see('Корзина');
});

Then('I am on admin page', () => {
    I.wait(10);
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
    I.wait(10);
    I.amOnPage('/admin/products');
});

Then('I see {string} in title', async (text: string) => {
    await I.seeInCurrentUrl('/admin/products');
    await I.see(`${text}`);
});

Given('I am on create products page', () => {
    I.wait(10);
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

Given('I am on admin hits page', () => {
    I.wait(10);
    I.amOnPage('/admin/bestseller');
});

let productName;
When('I click on plus button', async () => {
    productName = await I.grabAttributeFrom('[data-product-button]:first-child', 'data-product-button');
    await I.click('[data-product-button]:first-child');
});

Then('I see a product name in upper block', () => {
    const hitsDiv = '[data-hits]';
    I.waitForVisible(hitsDiv);
    I.see(productName, hitsDiv);
});

let hitName;
When('I click on delete button', async () => {
    hitName = await I.grabAttributeFrom('[data-hit-button]', 'data-hit-button');
    await I.click('[data-hit-button]');
});

Then('I don\'t see a product name in upper block', async() => {
    const hitsDiv = '[data-hits]';
    await I.waitForVisible(hitsDiv);
    I.dontSee(hitName, hitsDiv);
});

Then('I see a product name in the table', async () => {
    const productsTable = '[data-products-table]';
    await I.waitForVisible(productsTable);
    I.see(hitName, productsTable);
});
