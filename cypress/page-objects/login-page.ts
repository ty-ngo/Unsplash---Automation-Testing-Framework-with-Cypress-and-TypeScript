import { Element } from "../core/element/element";
import { BasePage } from "./base-page";

export class LoginPage extends BasePage {

    private _btnLogin: Element = new Element("//button[text()='Login']", true);
    private _txtEmail: Element = new Element("input[type='email']");
    private _txtPassword: Element = new Element("input[type='password']");

    public visit(): void {
        cy.visit('/login');
    }

    public login(email: string, password: string): void {
        this._txtEmail.enter(email);
        this._txtPassword.enter(password);
        this._btnLogin.click();
    }
}
