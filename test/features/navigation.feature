@navigation
Feature: Products
  We have to go to the page we need by clicking in nav menu

  Scenario: To main page
    Given I am on products page
    Given I click on "Главная" link
    Then I am on main page

  Scenario: To product page
    Given I am on main page
    Given I click on "Продукция" link
    Then I am on products page

  Scenario: To about us page
    Given I am on main page
    Given I click on "О нас" link
    Then I am on about us page

  Scenario: To account page
    Given I am on main page
    Given I click on "Войти" link
    Then I am on accounts page

  Scenario: To cart page
    Given I am on main page
    Given I click on "Корзина" link
    Then I am on cart page
