import { Element } from "../core/element/element";

export class PhotoDetailPage {

    private _imgPhotographerAvatar = new Element("div[data-testid='photos-route'] header img");
    private _imgTargetPhoto = new Element("//button[@aria-label='Zoom in on this image']//img[@alt]", true);
    private _btnViewProfile = new Element("//a[text()='View profile']", true);
    private _btnDownload = new Element("//a[text()='Download']", true);

    public goToPhotographerProfile(): void {
        this._imgPhotographerAvatar.hover();
        this._btnViewProfile.click();
    }

    public downloadPhoto() {
        this._btnDownload.click();
        cy.wait(5000);
    }

    public getAuthorName(): Cypress.Chainable<string> {
        return this._imgPhotographerAvatar.getAttribute('alt').then((text: string) => text.split('Go to ')[1].split("'s profile")[0]);
    }

    public getPhotoTitle(): Cypress.Chainable<string> {
        return this._imgTargetPhoto.getAttribute('alt');
    }

    public getPhotoIdFromUrl(): Cypress.Chainable<string> {
        return this.getPhotoTitle().then((title) => {
            const urlTitle: string = title.toLowerCase().replace(/[^\w]+/g, "-");
            cy.url().then((currentUrl) => {
                let urlSplit: string[] = currentUrl.split(urlTitle + '-');
                return urlSplit[urlSplit.length - 1];
            });
        });
    }
}
