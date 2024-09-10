import APIClient from "../../core/api/api-client";
import { expect } from "chai";
import { ApiConstants } from "../../constants/api-constants";
import * as allure from "allure-cypress";
import { Utilities } from "../../utilities/utilities";
import UserServices from "../../services/user-services";

describe('Like a photo', () => {
    const apiClient: APIClient = new APIClient('https://api.unsplash.com')
        .setBearerToken(ApiConstants.token)
        .addContentTypeHeader('application/json');

    var photoID: string;

    it('Like a photo successfully', () => {
        
        allure.step("Get the photo info to like", () => {
            cy.fixture("photos/photo-info.json").then((photos) => {

                allure.step("Execute the POST request to like the photo", () => {
                    apiClient.executePost('/photos/' + photos.photo_01.id + '/like', null).then((response) => {

                        allure.step("Verify that status code is 201", () => {
                            expect(response.status).to.equal(201);
                        });

                        allure.step("Get the photo ID for unlike after test", () => {
                            photoID = response.body.photo.id;
                        });

                        allure.step("Get the response schema to verify", () => {
                            cy.fixture("/schemas/like-photo-schema.json").then((schema: object) => {

                                allure.step("Verify schema of response", () => {
                                    Utilities.validateSchema(schema, response.body);
                                });
                            });
                        });

                        allure.step("Check if the liked photo exists in User's liked list", () => {
                            UserServices.getLikedPhotos(apiClient).then((response) => {
                                const check = response.body.some((item: { id: string }) => item.id === photoID);
                                expect(check).to.be.true;
                            });
                        });
                    });
                });
            });
        });
    });

    afterEach(() => {
        allure.step("Unlike photo after test", () => {
            apiClient.executeDelete('/photos/' + photoID + '/like').then((response) => {

                allure.step("Check if the response status is 200", () => {
                    expect(response.status).to.equal(200);
                });
            });
        });
    });
});