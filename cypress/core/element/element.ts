export class Element {
    private locator: string;
    private xpath: boolean;

    constructor(locator: string, xpath: boolean = false) {
        this.locator = locator;
        this.xpath = xpath;
    }

    public getLocator(): string {
        return this.locator;
    }

    public getAllElements() {
        if (this.xpath) {
            return cy.xpath(this.locator);
        } else {
            return cy.get(this.locator);
        }
    }

    public getElementCount() {
        return this.getAllElements().its('length');
    }

    public isExist() {
        return this.getAllElements().should('exist');
    }

    public isNotExist() {
        return this.getAllElements().should('not.exist');
    }

    public isVisible() {
        return this.getAllElements().should('be.visible');
    }

    public isNotVisible() {
        return this.getAllElements().should('not.be.visible');
    }

    public click() {
        return this.isExist().click({ force: true });
    }

    public enter(value: string) {
        return this.isExist().clear().type(value);
    }

    public clear() {
        return this.isExist().clear();
    }

    public select(value: string) {
        return this.isExist().select(value);
    }

    public getText(): Cypress.Chainable<string> {
        return this.isExist().invoke('text').then((text: string) => text.trim());
    }

    public hover(): this {
        return this.isExist().realHover();
    }

    public scrollIntoView() {
        return this.isExist().scrollIntoView();
    }

    public getCurrentValue(): Cypress.Chainable<string> {
        return this.isExist().invoke('val').then((value: string) => value.trim());
    }

    public getAttribute(attribute: string): Cypress.Chainable<string> {
        return this.isExist().invoke('attr', attribute).then((attr: string) => attr ? attr.trim() : '');
    }

    public hasAttribute(attr: string) {
        return this.isExist().should('have.attr', attr);
    }
}