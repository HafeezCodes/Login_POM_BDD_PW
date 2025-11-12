# features/login.feature
# This file contains test scenarios using Scenario Outline for reusability

Feature: Login Functionality
    As a user of the application
    I want to be able to login with my credentials
    So that I can access my account

    Scenario Outline: Login with different credentials
        Given user navigates to the login page
        When user enters "<email_type>" email address
        And user enters "<password_type>" password
        And user clicks on Sign In button
        Then user should see "<expected_result>"

        Examples:
            | email_type | password_type | expected_result |
            | valid      | valid         | dashboard       |
            | valid      | invalid       | error           |
            | invalid    | valid         | error           |
