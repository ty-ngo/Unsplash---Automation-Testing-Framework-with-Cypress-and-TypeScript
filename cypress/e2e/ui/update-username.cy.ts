/// <reference types="cypress" />

import { LoginAccountDto } from "../../data-objects/login-account-dto";
import { EditProfilePage } from "../../page-objects/edit-profile-page";
import { HomePage } from "../../page-objects/home-page";
import { LoginPage } from "../../page-objects/login-page";
import { MyProfilePage } from "../../page-objects/my-profile-page";
import * as allure from "allure-cypress";

describe('Update user info', () => {

    const loginPage = new LoginPage();
    const homePage = new HomePage();
    const myProfilePage = new MyProfilePage();
    const editProfilePage = new EditProfilePage();

    var newUsername: string;

    it('Update username successfully', () => {
        allure.step("Go to Login Page", () => {
            loginPage.visit();
        });

        allure.step("Login with valid account loaded from json", () => {
            cy.fixture('/accounts/login_account.json').then((user: { email: string; password: string }) => {
                const loginAccount = new LoginAccountDto(user);
                loginPage.login(loginAccount.email, loginAccount.password);
            });
        });

        allure.step("Go to My Profile Page", () => {
            homePage.goToMyProfilePage();
        });

        allure.step("Go to Edit Profile Page", () => {
            myProfilePage.goToEditProfilePage();
        });

        allure.step("Set a new random username based on the current first name and last name", () => {
            editProfilePage.setRandomUsernameAndSave().then((username) => {
                newUsername = username;
            });
        });

        allure.step("Verify the username update by navigating to the new profile URL and check if the full name is displayed", () => {
            editProfilePage.getCurrentFullName().then((fullName: string) => {
                cy.visit(`/${newUsername}`);
                myProfilePage.checkFullNameDisplayed(fullName);
            });
        });
    });
});