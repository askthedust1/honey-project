@hits
Feature: Hits

  Scenario: To add a hit
    Given I am on accounts page
    Given I click the "#button-log" button
    When I enter form fields:
      | email    | admin@gmail.com |
      | password | admin           |
    And I click "#logBtn" button
    Then I see main page
    Then I am on admin page
    Then I click on "Управление хитами" link
    And I am on admin hits page
    When I click on plus button
    Then I see a product name in upper block

  Scenario: To delete a hit
    Given I am on accounts page
    Given I click the "#button-log" button
    When I enter form fields:
      | email    | admin@gmail.com |
      | password | admin           |
    And I click "#logBtn" button
    Then I see main page
    Then I am on admin page
    Then I click on "Управление хитами" link
    And I am on admin hits page
    When I click on delete button
    Then I don't see a product name in upper block
    And I see a product name in the table
