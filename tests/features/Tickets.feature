Feature: User Login

  Background:
    Given User navigates to Main page

 Scenario: Booking a tour
  When user clicks book tour
  And inputs all tour details
  Then Ticket details are displayed

  Scenario: Login with invalid credentials
    When User enters invalid username and password
    And User clicks the login button
    Then An error message should be displayed
