import { Element } from "../core/element/element";
import { BasePage } from "./base-page";

export class PhotographerProfilePage extends BasePage {

    private _btnMoreActions = new Element("button[title='More Actions']");
    private _btnFollowPhotographer = new Element("button[role='menuitem']");
    private _imgPhotographerAvatar = new Element("div[data-testid='users-route'] img[alt^='Avatar of user']")

    public waitForLoad(): void {
        this._imgPhotographerAvatar.isVisible();
    }

    // public openMoreActions(): void {
    //     this.waitForLoad();
    //     this._btnMoreActions.getAttribute('aria-expanded').then((expanded: string) => {
    //         if (expanded === 'false') {
    //             this._btnMoreActions.click();
    //         }
    //     });
    // }

    public openMoreActions(): void {
        this.waitForLoad();
        this._btnMoreActions.getAttribute('aria-expanded').then((expanded: string) => {
            if (expanded === 'false') {
                this._btnMoreActions.click();
                //this.openMoreActions();
            }
        });
    }

    public followPhotographer(): void {
        this.openMoreActions();
        this._btnFollowPhotographer.click();
    }

    public unfollowPhotographer(): void {
        this.openMoreActions();
        if (this.checkFollowed()) {
            this._btnFollowPhotographer.click();
        }
    }

    public checkFollowed(): Cypress.Chainable<boolean> {
        this.openMoreActions();

        return this._btnFollowPhotographer.getText().then((text: string) => {
            return text.includes('Unfollow');
        });
    }
}
