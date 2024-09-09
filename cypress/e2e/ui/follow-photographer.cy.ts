/// <reference types="cypress" />

import { LoginAccountDto } from "../../data-objects/login-account-dto";
import { HomePage } from "../../page-objects/home-page";
import { LoginPage } from "../../page-objects/login-page";
import { PhotoDetailPage } from "../../page-objects/photo-detail-page";
import { PhotographerProfilePage } from "../../page-objects/photographer-profile-page";
import * as allure from "allure-cypress";

describe('Follow a photographer', () => {

    const loginPage = new LoginPage();
    const homePage = new HomePage();
    const photoDetailPage = new PhotoDetailPage();
    const photographerProfilePage = new PhotographerProfilePage();

    it('Follow a photographer successfully', () => {
        allure.step("Go to Login Page", () => {
            loginPage.visit();
        });

        allure.step("Login with valid account loaded from json", () => {
            cy.fixture('/accounts/login_account.json').then((user: { email: string; password: string }) => {
                const loginAccount = new LoginAccountDto(user);
                loginPage.login(loginAccount.email, loginAccount.password);
            });
        });

        allure.step("Open 3rd photo", () => {
            homePage.openRandomFreePhoto();
        });

        allure.step("Go to Photographer's Profile", () => {
            photoDetailPage.goToPhotographerProfile();
        });

        allure.step("Follow photographer", () => {
            photographerProfilePage.followPhotographer();
        });

        allure.step("Check if photographer is followed", () => {
            photographerProfilePage.checkFollowed().should('equal', true);
        });
    });

    afterEach(() => {
        allure.step("Unfollow photographer after test", () => {
            photographerProfilePage.unfollowPhotographer();
        });
    });
});