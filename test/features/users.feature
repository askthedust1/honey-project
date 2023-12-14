@userLogin
Feature: Users
  We have registration and login pages.

  Scenario: User login
    Given I am on accounts page
    Given I click the "Войти!" button
    When I enter form fields:
      | email | sam@gmail.com |
      | password | user |
    And I click "Войти в аккаунт" button
    Then I see "Выйти" in user menu.

  Scenario: User logout
    Given I am on accounts page
    Given I click the "Войти!" button
    When I enter form fields:
      | email | sam@gmail.com |
      | password | user |
    And I click "Войти в аккаунт" button
    Then I see "Выйти" in user menu.
    When I click "Выйти" in user menu
    Then I see "Войти" in user menu

  Scenario: User register
    Given I am on accounts page
    When I enter form fields:
      | email | test@gmail.com |
      | password | user |
      | passwordConfirm | user |
      | displayName | User |
      | phone | +996555555555 |
      | address | street Chy |
    And I click "Зарегистрироваться" button
    Then I see "Выйти" in user menu.