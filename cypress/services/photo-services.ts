import APIClient from "../core/api/api-client";
import UserServices from "./user-services";

class PhotoServices {
    public static unlike(client: APIClient, photoID: string) {
        return client.executeDelete('/photos/' + photoID + '/like');
    }

    public static unlikeAllPhotos(client: APIClient): void {
        UserServices.getLikedPhotos(client).then((response) => {
            response.body.forEach((photo) => {
                PhotoServices.unlike(client, photo.id)
            });
        });
    }
}

export default PhotoServices;