import { Element } from "../core/element/element";
import { BasePage } from "./base-page";

export class MyProfilePage extends BasePage {

    private _btnEditProfile = new Element("//a[text()='Edit profile']", true);
    private _lblFullName(fullName: string): Element { return new Element(`//div[text()='${fullName}']`, true); }
    private _btnTab(tabName: string): Element { return new Element(`//a[@data-testid='user-nav-link-${tabName.toLowerCase()}']`, true); }
    private _lblNumberOfItemInTab(tabName: string): Element { return new Element(`//a[@data-testid='user-nav-link-${tabName.toLowerCase()}']/span/span`, true); }
    private _imgPhotoWithTitle(title: string) { return new Element(`figure img[alt='${title}']`) }
    private _lnkCollection(title: string): Element { return new Element(`//div[@data-testid='users-collections-route']//div[text()='${title}']`, true) }

    public goToEditProfilePage(): void {
        this._btnEditProfile.click();
    }

    public checkFullNameDisplayed(fullName: string): void {
        this._lblFullName(fullName).isVisible();
    }

    public goToTab(tabName: string): void {
        this._btnTab(tabName).click();
    }

    public getNumberOfLikedPhotos(): Cypress.Chainable<number> {
        return this._lblNumberOfItemInTab('likes').getText().then((count: string) => Number(count));
    }

    public openCollection(collectionTitle: string) {
        this.goToTab('collections');
        this._lnkCollection(collectionTitle).click();
    }

    public checkPhotoExist(photoTitle: string) {
        return this._imgPhotoWithTitle(photoTitle).isExist();
    }
}