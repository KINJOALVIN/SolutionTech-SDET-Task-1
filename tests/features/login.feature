Feature: User Login

  Background:
    Given User navigates to the login page

  Scenario: Login with invalid credentials
    When User enters invalid username and password
    And User clicks the login button
    Then An error message should be displayed

   Scenario: Login with valid crredentials
   When User enters valid username and password
   And User clicks the submit button
   Then Dashboard is shown

   Scenario: create tours
   When user goes to tours page
   And clicks create tours
   And Fills all the fields
   And User clicks the submit button
   Then a new tour is created

   Scenario: View all bookings
   When User goes to bookings page
   Then User can view all bookings

   Scenario: View all tickets
   When User goes to tickets page
   Then User can view all tickets