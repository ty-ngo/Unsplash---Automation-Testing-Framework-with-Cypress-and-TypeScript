/// <reference types="cypress" />

import { LoginAccountDto } from "../../data-objects/login-account-dto";
import { HomePage } from "../../page-objects/home-page";
import { LoginPage } from "../../page-objects/login-page";
import * as allure from "allure-cypress";
import { PhotoDetailPage } from "../../page-objects/photo-detail-page";

describe('Download photo', () => {

    const loginPage = new LoginPage();
    const homePage = new HomePage();
    const photoDetailPage = new PhotoDetailPage();

    var photoID: string;
    var photoTitle: string;
    var authorName: string;
    var fileName: string;

    it('Download a random photo successfully', () => {
        allure.step("Go to Login Page", () => {
            loginPage.visit();
        });

        allure.step("Login with valid account loaded from json", () => {
            cy.fixture('/accounts/login_account.json').then((user: { email: string; password: string }) => {
                const loginAccount = new LoginAccountDto(user);
                loginPage.login(loginAccount.email, loginAccount.password);
            });
        });

        allure.step("Open a random free photo", () => {
            homePage.openRandomFreePhoto();
        });

        allure.step("Get photo title", () => {
            photoDetailPage.getPhotoTitle().then((title) => {
                photoTitle = title;
            });
        });

        allure.step("Get photo ID from URL", () => {
            photoDetailPage.getPhotoIdFromUrl().then((id) => {
                photoID = id;
            });
        });

        allure.step("Get author's name", () => {
            photoDetailPage.getAuthorName().then((name) => {
                authorName = name;
            });
        });

        allure.step("Download photo", () => {
            photoDetailPage.downloadPhoto();
        });

        allure.step("Get expected file name from photoID and author's name", () => {
            fileName = `${authorName.toLowerCase().replace(/[^\w]+/g, "-")}-${photoID}-unsplash.jpg`;
        });

        allure.step("Check if the file exists in the folder", () => {
            const filePath: string = 'cypress/downloads/' + fileName;
            cy.readFile(filePath).should('exist');
        });
    });

    afterEach(() => {
        allure.step("Clear the Downloads folder after test", () => {
            cy.deleteDownloadsFolder();
        });
    });
});