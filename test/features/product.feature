@watchOneProductInfo
Feature: Product
  We have product info page.

  Scenario: Navigate to Product Page
    Given I am on the products page
    When I click on the product link
    Then I see the product page and "В каталог"