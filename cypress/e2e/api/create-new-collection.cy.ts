import APIClient from "../../core/api/api-client";
import { expect } from "chai";
import { ApiConstants } from "../../constants/api-constants";
import * as allure from "allure-cypress";
import { Utilities } from "../../utilities/utilities";
import UserServices from "../../services/user-services";
import CollectionServices from "../../services/collection-services";

describe('Create a new collection', () => {
    const apiClient: APIClient = new APIClient('https://api.unsplash.com')
        .setBearerToken(ApiConstants.token)
        .addContentTypeHeader('application/json');

    var collectionID: string;

    it('Create a new collection successfully', () => {
        allure.step("Get the new collection info from json", () => {
            cy.fixture("collections/new-collection-info.json").then((collections) => {

                allure.step("Execute the POST request to create a new collection", () => {
                    CollectionServices.createCollection(apiClient, collections.collection_01).then((response) => {

                        allure.step("Verify that status code is 201", () => {
                            expect(response.status).to.equal(201);
                        });

                        allure.step("Get the collection ID for deleting after test", () => {
                            collectionID = response.body.id;
                        });

                        allure.step("Get the schema to verify", () => {
                            cy.fixture("/schemas/create-collection-schema.json").then((schema: object) => {

                                allure.step("Verify schema of response", () => {
                                    Utilities.validateSchema(schema, response.body);
                                });
                            });
                        });

                        allure.step("Verify the info of the created collection in the response", () => {
                            expect(response.body.title).to.equal(collections.collection_01.title);
                            expect(response.body.description).to.equal(collections.collection_01.description);
                            expect(response.body.private).to.equal(collections.collection_01.private);
                        });

                        allure.step("Check if the created collections exists in User's collection list", () => {
                            UserServices.getAllCollections(apiClient).then((response) => {
                                const check = response.body.some((item: { id: string }) => item.id === collectionID);
                                expect(check).to.be.true;
                            });
                        });
                    });
                });
            });
        });
    });

    afterEach(() => {
        allure.step("Delete the created collection after test", () => {
            CollectionServices.deleteCollection(apiClient, collectionID);
        });
    });
});