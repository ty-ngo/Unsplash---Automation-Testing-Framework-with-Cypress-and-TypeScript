import { Element } from "../core/element/element";

export class BasePage {
    private _btnMenuProfile: Element = new Element("button[title='Your personal menu button']", false);
    private _btnViewProfile: Element = new Element("//a[text()='View profile']", true);

    // public openProfileMenu(): void {
    //     this._btnMenuProfile.getAttribute("aria-expanded").then((expanded) => {
    //         if (expanded === "false") {
    //             this._btnMenuProfile.click();
    //         }
    //     });
    //     this._btnMenuProfile.getAttribute("aria-expanded").should('equal', 'true');
    // }

    public openProfileMenu(): void {
        // this._btnMenuProfile.getAllElements().should('have.attr', 'aria-expanded').then((expanded) => {
        this._btnMenuProfile.hasAttribute('aria-expanded').then((expanded) => {
            if (expanded === 'false') {
                this._btnMenuProfile.click();
                this.openProfileMenu();
            }
        });
    }


    public goToMyProfilePage(): void {
        this.openProfileMenu();
        this._btnViewProfile.click();
    }
}