import { Element } from "../core/element/element";
import { BasePage } from "./base-page";

export class CollectionPage extends BasePage {

    private _btnAddNthImageToCollection(n: number): Element { return new Element(`//figure[@data-masonryposition='${n.toString()}']//button[@title='Add this image to a collection']`, true); }
    private _imgNthPhoto(n: number): Element { return new Element(`//figure[@data-masonryposition='${n.toString()}']//img[@alt and not(contains(@alt,'Go to') or contains(@alt,'Avatar'))]`, true); }
    private _btnSelectCollection(collectionTitle: string) { return new Element(`//h4//span[text()='${collectionTitle}']`, true); }
    private _imgPhotoWithTitle(title: string) { return new Element(`figure img[alt='${title}']`) }
    private _btnClosePopup: Element = new Element("//*[name()='desc'][text()='An X shape']/ancestor::button", true);
    private _lblNumberOfImages: Element = new Element("//span[contains(text(),'image')]", true)

    public addNthPhotoToCollection(n: number) {
        this._imgNthPhoto(n).hover();
        this._btnAddNthImageToCollection(n).click();
    }

    public selectCollectionToAdd(collectionTitle: string) {
        this._btnSelectCollection(collectionTitle).click();
    }

    public closeSelectCollectionPopup() {
        this._btnClosePopup.click();
    }

    public removeNthPhotoFromCollection(n: number, collectionTitle: string): Cypress.Chainable<string> {
        this.getTitleOfNthPhoto(n).then((altText: string) => {
            cy.wrap(altText).as('photoTitle');
        });
        this.addNthPhotoToCollection(n);
        this.selectCollectionToAdd(collectionTitle);
        this.closeSelectCollectionPopup();
        return cy.get('@photoTitle');
    }

    public getCurrentNumberOfPhotos(): Cypress.Chainable<number> {
        return this._lblNumberOfImages.getText().then((text: string) => Number(text.split(' ')[0]));
    }

    public getTitleOfNthPhoto(n: number): Cypress.Chainable<string> {
        return this._imgNthPhoto(n).getAttribute("alt");
    }

    public checkPhotoNotExist(photoTitle: string) {
        return this._imgPhotoWithTitle(photoTitle).isNotExist();
    }
}