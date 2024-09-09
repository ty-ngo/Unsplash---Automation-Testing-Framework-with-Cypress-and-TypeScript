import { faker } from "@faker-js/faker";
import Ajv from 'ajv';
import { expect } from "chai";

export class Utilities {
    static getRandomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static getUniqueRandomNumbers(min: number, max: number, n: number): number[] {
        const numbers = new Set<number>();

        while (numbers.size < n) {
            const randomNumber = this.getRandomNumber(min, max);
            numbers.add(randomNumber);
        }

        return Array.from(numbers);
    }

    static generateRandomUsername(first_name: string, last_name: string): Cypress.Chainable<string> {
        let username: string;
        const nameRegex = /^[a-zA-Z0-9_]+$/;

        do {
            username = faker.internet.userName({ firstName: first_name, lastName: last_name });
        } while (!nameRegex.test(username));

        return cy.wrap(username);
    }

    static validateSchema(schema: object, responseBody: object): void {
        const valid = new Ajv().validate(schema, responseBody);
        expect(valid).to.equal(true);
    }
}