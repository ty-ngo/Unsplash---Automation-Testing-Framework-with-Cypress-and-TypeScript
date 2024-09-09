/// <reference types="cypress" />

import { LoginAccountDto } from "../../data-objects/login-account-dto";
import { HomePage } from "../../page-objects/home-page";
import { LoginPage } from "../../page-objects/login-page";
import { MyProfilePage } from "../../page-objects/my-profile-page";
import * as allure from "allure-cypress";
import APIClient from "../../core/api/api-client";
import { ApiConstants } from "../../constants/api-constants";
import PhotoServices from "../../services/photo-services";
import BrowserHelper from "../../core/browser/browser-helper";
import { expect } from "chai";

describe('Like random photos', () => {

    const loginPage = new LoginPage();
    const homePage = new HomePage();
    const myProfilePage = new MyProfilePage();

    var expectedLikedPhotos: string[];
    const expectedNumberOfPhotos = 3;

    it('Like 3 random photos successfully', () => {
        allure.step("Go to Login Page", () => {
            loginPage.visit();
        });

        allure.step("Login with valid account loaded from json", () => {
            cy.fixture('/accounts/login_account.json').then((user: { email: string; password: string }) => {
                const loginAccount = new LoginAccountDto(user);
                loginPage.login(loginAccount.email, loginAccount.password);
            });
        });

        allure.step("Like random photos based on the defined number", () => {
            expectedLikedPhotos = homePage.likeRandomPhotos(expectedNumberOfPhotos);
        });

        allure.step("Go to the profile page and navigate to the Likes tab", () => {
            homePage.goToMyProfilePage();
            myProfilePage.goToTab("likes");
            BrowserHelper.forceReload();
        });

        allure.step("Verify the actual number of liked photos", () => {
            myProfilePage.getNumberOfLikedPhotos().then((actualNumberOfPhotos: number) => {
                expect(actualNumberOfPhotos).to.equal(expectedNumberOfPhotos);
            });
        });

        allure.step("Verify that each liked photos exist in the Likes tab", () => {
            for (const title of expectedLikedPhotos) {
                myProfilePage.checkPhotoExist(title);
            }
        });
    });

    afterEach(() => {
        const apiClient: APIClient = new APIClient('https://api.unsplash.com')
            .setBearerToken(ApiConstants.token)
            .addContentTypeHeader('application/json');

        allure.step("Unlike all photos after test", () => {
            PhotoServices.unlikeAllPhotos(apiClient);
        });
    });
});