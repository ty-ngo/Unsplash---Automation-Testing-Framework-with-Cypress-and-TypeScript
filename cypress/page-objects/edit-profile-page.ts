import { Element } from "../core/element/element";
import { Utilities } from "../utilities/utilities";
import { BasePage } from "./base-page";

export class EditProfilePage extends BasePage {
    private _txtFirstName: Element = new Element("#user_first_name");
    private _txtLastName: Element = new Element("#user_last_name");
    private _txtUsername: Element = new Element("#user_username");
    private _btnUpdateAccount: Element = new Element("input[value='Update account']");

    public getCurrentFirstName(): Cypress.Chainable<string> {
        return this._txtFirstName.getCurrentValue();
    }

    public getCurrentLastName(): Cypress.Chainable<string> {
        return this._txtLastName.getCurrentValue();
    }

    public getCurrentFullName(): Cypress.Chainable<string> {
        return this.getCurrentFirstName().then((firstName: string) => {
            return this.getCurrentLastName().then((lastName: string) => {
                return `${firstName} ${lastName}`;
            });
        });
    }

    public setRandomUsernameAndSave(): Cypress.Chainable<string> {
        this.getCurrentFirstName().then((firstName: string) => {
            this.getCurrentLastName().then((lastName: string) => {
                Utilities.generateRandomUsername(firstName, lastName).then((username: string) => {
                    this._txtUsername.clear();
                    this._txtUsername.enter(username);
                    this._btnUpdateAccount.click();
                    cy.wrap(username).as('newUsername');
                });
            });
        });
        return cy.get('@newUsername');
    }
}
