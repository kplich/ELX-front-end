import {TestBed} from "@angular/core/testing";

import {JwtStorageService} from "./jwt-storage.service";

describe("JwtStorageService", () => {

    const EXAMPLE_USERNAME = "username";
    const EXAMPLE_JWT = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VybmFtZSIsInJvbGVzIjpbIlJPTEVfVVNFUiJdfQ.PNeqCw9bx9sodhLtNMF8zw4zqeh7JoUrgyPjHxGif47hSK9n4H7ZGSQK5jZoYCR25zMxyv6TC6DHZNuvoI5x0g";

    let localStorage = new Map<string, string>();
    const mockLocalStorage = {
        getItem: (key: string): string | null => {
            const value = localStorage.get(key);
            return value !== undefined ? value : null;
        },
        setItem: (key: string, value: string) => {
            localStorage.set(key, value);
        },
        removeItem: (key: string) => {
            localStorage.delete(key);
        },
        clear: () => {
            localStorage = new Map<string, string>();
        }
    };

    let service: JwtStorageService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(JwtStorageService);
        spyOn(sessionStorage, "getItem").and.callFake(mockLocalStorage.getItem);
        spyOn(sessionStorage, "setItem").and.callFake(mockLocalStorage.setItem);
        spyOn(sessionStorage, "removeItem").and.callFake(mockLocalStorage.removeItem);
        spyOn(sessionStorage, "clear").and.callFake(mockLocalStorage.clear);
    });

    afterAll(() => {
        sessionStorage.clear();
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
        service.removeJwt();
    });

    it("should not contain any token at the beginning", () => {
        expect(service.getJwt()).toBeNull();
        expect(service.getAuthenticatedUser()).toBeNull();
    });

    it("should add and retrieve the token and username", () => {
        service.putJwt(EXAMPLE_JWT);
        expect(service.getJwt()).toEqual(EXAMPLE_JWT);
        expect(service.getAuthenticatedUser()).toEqual(EXAMPLE_USERNAME);
    });

    it("should remove the token", () => {
        service.removeJwt();
        expect(service.getJwt()).toBeNull();
        expect(service.getAuthenticatedUser()).toBeNull();
    });
});
