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
