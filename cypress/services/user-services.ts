import APIClient from "../core/api/api-client";

class UserServices {
    public static getUsername(client: APIClient): Cypress.Chainable<string> {
        return client.executeGet('/me').then((response) => {
            return response.body.username;
        });
    }

    public static getAllCollections(client: APIClient) {
        return this.getUsername(client).then((username) => {
            return client.executeGet('/users/' + username + '/collections');
        });
    }

    public static getLikedPhotos(client: APIClient) {
        return this.getUsername(client).then((username) => {
            return client.executeGet('/users/' + username + '/likes');
        });
    }
}

export default UserServices;