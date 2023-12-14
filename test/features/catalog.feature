@watchCatalog
Feature: Catalog
  We have to go to the page with all the products by clicking the button

  Scenario: Catalog transition
    Given I am on main page
    Given I click on "Перейти в каталог" button
    Then I see products page
