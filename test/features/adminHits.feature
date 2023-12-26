@adminHits
Feature: Hits

  Scenario: To add a hit
    Given I am on main page
    Given I click on "Войти" link
    Given I click the "#button-log" button
    When I enter form fields:
      | email    | admin@gmail.com |
      | password | admin           |
    And I click "#logBtn" button
    Then I see main page
    Then I am on admin page
    Then I click on "Управление хитами" in sidebar
    And I am on admin hits page
    When I click on "Добавить в хиты" button
