class BrowserHelper {
    public static reload() {
        return cy.reload();
    }

    public static forceReload() {
        return cy.reload(true);
    }

    public static goToUrl(url: string) {
        return cy.visit(url);
    }
}

export default BrowserHelper;
