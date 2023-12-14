Feature: product
  We have a product info page.

  Scenario: Product info
    Given I am on products page
    When I click on a random product link
    Then I should be on the product page