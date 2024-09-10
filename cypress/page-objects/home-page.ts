import { Element } from "../core/element/element";
import { Utilities } from "../utilities/utilities";
import { BasePage } from "./base-page";

export class HomePage extends BasePage {
    private _imgNthPhoto(n: number): Element { return new Element(`//figure[@data-masonryposition='${n.toString()}']//img[@alt and not(contains(@alt,'Go to') or contains(@alt,'Avatar'))]`, true); }
    private _imgFreePhotos: Element = new Element("//a[@title='Download this image']/ancestor::figure", true)
    private _btnLikeNthPhoto(n: number): Element { return new Element(`//figure[@data-masonryposition='${n.toString()}']//button[@title='Like this image']`, true); }

    public openNthPhoto(n: number): void {
        this._imgNthPhoto(n).click();
    }

    public openRandomFreePhoto(): void {
        this._imgFreePhotos.getElementCount().then((count: number) => {
            const randomNumber = Utilities.getRandomNumber(0, count - 1);
            this._imgFreePhotos.getAllElements().eq(randomNumber).click();
        });
    }

    public likeNthPhoto(n: number): Cypress.Chainable<string> {
        this._imgNthPhoto(n).hover();
        this._btnLikeNthPhoto(n).click();
        return this.getTitleOfNthPhoto(n);
    }

    public likeRandomPhotos(n: number): string[] {
        const randomNumbers = Utilities.getUniqueRandomNumbers(1, 20, n);
        const expectedLikedPhotos: string[] = [];
        for (const number of randomNumbers) {
            this.likeNthPhoto(number).then((photoTitle: string) => {
                expectedLikedPhotos.push(photoTitle);
            });
        };
        return expectedLikedPhotos;
    }

    public getTitleOfNthPhoto(n: number): Cypress.Chainable<string> {
        return this._imgNthPhoto(n).getAttribute("alt");
    }
}