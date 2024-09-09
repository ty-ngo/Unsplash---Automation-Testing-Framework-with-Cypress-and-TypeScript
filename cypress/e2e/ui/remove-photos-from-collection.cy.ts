/// <reference types="cypress" />

import { LoginAccountDto } from "../../data-objects/login-account-dto";
import { HomePage } from "../../page-objects/home-page";
import { LoginPage } from "../../page-objects/login-page";
import { MyProfilePage } from "../../page-objects/my-profile-page";
import * as allure from "allure-cypress";
import APIClient from "../../core/api/api-client";
import { ApiConstants } from "../../constants/api-constants";
import BrowserHelper from "../../core/browser/browser-helper";
import { expect } from "chai";
import { CollectionPage } from "../../page-objects/collection-page";
import CollectionServices from "../../services/collection-services";

describe('Remove photos from collection', () => {

    const loginPage: LoginPage = new LoginPage();
    const homePage: HomePage = new HomePage();
    const myProfilePage: MyProfilePage = new MyProfilePage();
    const collectionPage: CollectionPage = new CollectionPage();

    var collectionID: string;
    var collectionTitle: string;
    var removePhotoTitle: string;

    var numberOfPhotosBeforeRemoving: number;
    var numberOfPhotosAfterRemoving: number;

    const apiClient: APIClient = new APIClient('https://api.unsplash.com')
        .setBearerToken(ApiConstants.token)
        .addContentTypeHeader('application/json');

    beforeEach(() => {
        cy.fixture("/collections/new-collection-info.json").then((collections) => {
            CollectionServices.createCollection(apiClient, collections.collection_02).then((response) => {
                collectionID = response.body.id;
                collectionTitle = response.body.title;
            });
        });

        cy.fixture("/photos/photo-info.json").then((photos) => {
            CollectionServices.addPhotoToCollection(apiClient, collectionID, photos.photo_01.id);
            CollectionServices.addPhotoToCollection(apiClient, collectionID, photos.photo_02.id);
        });
    });

    it('Remove a photo from collection successfully', () => {
        allure.step("Go to Login Page", () => {
            loginPage.visit();
        });

        allure.step("Login with valid account loaded from json", () => {
            cy.fixture('/accounts/login_account.json').then((user: { email: string; password: string }) => {
                const loginAccount = new LoginAccountDto(user);
                loginPage.login(loginAccount.email, loginAccount.password);
            });
        });

        allure.step("Open the target Collection", () => {
            homePage.goToMyProfilePage();
            myProfilePage.openCollection(collectionTitle);
        });

        allure.step("Get the number of photo before removing", () => {
            collectionPage.getCurrentNumberOfPhotos().then((numberOfPhotos: number) => {
                numberOfPhotosBeforeRemoving = numberOfPhotos;
            });
        });

        allure.step("Remove the first photo from the collection", () => {
            collectionPage.removeNthPhotoFromCollection(1, collectionTitle).then((photoTitle: string) => {
                removePhotoTitle = photoTitle;
            });
        });

        allure.step("Go to collection's URL", () => {
            BrowserHelper.goToUrl('/collections/' + collectionID);
            BrowserHelper.forceReload();
        });

        allure.step("Get the number of remaining photos after removing", () => {
            collectionPage.getCurrentNumberOfPhotos().then((numberOfPhotos: number) => {
                numberOfPhotosAfterRemoving = numberOfPhotos;
            });
        });

        allure.step("Check if the number of photos decreased by 1", () => {
            expect(numberOfPhotosAfterRemoving).to.equal(numberOfPhotosBeforeRemoving - 1);
        });

        allure.step("Check if the removed photo exist in collection", () => {
            collectionPage.checkPhotoNotExist(removePhotoTitle);
        });
    });

    afterEach(() => {
        allure.step("Delete the created collection after test", () => {
            CollectionServices.deleteCollection(apiClient, collectionID);
        });
    });
});