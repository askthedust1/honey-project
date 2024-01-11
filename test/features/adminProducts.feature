@adminProducts
Feature: Products
  We have to go to the admin page we need to check functionality

  Scenario: To watch detail information
    Given I am on accounts page
    Given I click the "#button-log" button
    When I enter form fields:
      | email    | admin@gmail.com |
      | password | admin           |
    And I click "#logBtn" button
    Then I see main page
    Then I am on admin page
    Then I click on "Управление продуктами" in sidebar
    Then I click on "Все продукты"
    And I am on admin products page
    When I click on the product link
    Then I see "Информация о продукте" in title

  Scenario: To create new product
    Given I am on accounts page
    Given I click the "#button-log" button
    When I enter form fields:
      | email    | admin@gmail.com |
      | password | admin           |
    And I click "#logBtn" button
    Then I see main page
    Then I am on admin page
    Then I click on "Управление продуктами" in sidebar
    Then I click on "Новый продукт"
    And I am on create products page
    When I enter form fields:
      | titleEN       | Honey                                                           |
      | titleRU       | Мед                                                             |
      | titleKG       | Бал                                                             |
      | descriptionEN | It is collected from flowering plants in meadows and fields     |
      | descriptionRU | Он собирается из цветущих растений на лугах и полях             |
      | descriptionKG | Ал жайыттарда жана талааларда гүлдөгөн өсүмдүктөрдөн чогултулат |
      | amount        | 50                                                              |
      | oldPrice      | 120                                                             |
      | actualPrice   | 120                                                             |
    And I select "Мед" in category select
    When I attach the file "images/honey.svg" to the input
    Then I click on "Создать новый продукт" button
    Then I am on admin products page
    Then I see "Мед"