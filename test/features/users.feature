@userLogin
Feature: Users
  We have registration and login pages.

  Scenario: User login
    Given I am on accounts page
    Given I click the "#button-log" button
    When I enter form fields:
      | email | sam@gmail.com |
      | password | user |
    And I click "#logBtn" button
    Then I see main page
    When I move mouse to "#user-drop" in user menu
    And I click "#user-logout" in user menu
    Then I see main page and "#accLog"

  Scenario: User register
    Given I am on accounts page
    When I enter form fields:
      | email | test@gmail.com |
      | password | user |
      | passwordConfirm | user |
      | displayName | User |
      | phone | +996555555555 |
    And I click "#regBtn" button
    Then I see main page
    When I move mouse to "#user-drop" in user menu
    And I click "#user-logout" in user menu
    Then I see main page and "#accLog"
