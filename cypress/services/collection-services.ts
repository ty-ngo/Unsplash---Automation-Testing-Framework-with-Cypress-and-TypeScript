import APIClient from "../core/api/api-client";

class CollectionServices {
    public static createCollection(client: APIClient, collectionInfo: object) {
        return client.executePost('/collections', null, collectionInfo);
    }

    public static deleteCollection(client: APIClient, collectionID: string) {
        return client.executeDelete('/collections/' + collectionID);
    }

    public static addPhotoToCollection(client: APIClient, collectionID: string, photoID: string) {
        return client.executePost('/collections/' + collectionID + '/add', null, { "photo_id": photoID });
    }

    public static removePhotoFromCollection(client: APIClient, collectionID: string, photoID: string) {
        return client.executeDelete('/collections/' + collectionID + '/remove', { "photo_id": photoID });
    }
}

export default CollectionServices;