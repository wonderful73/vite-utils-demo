export declare function getCookie(key: string): string;
export interface ICookieParams {
    key: string;
    value: string;
    time?: number;
    options?: {
        domain?: string;
        path?: string;
    };
}
export declare function setCookie(params?: ICookieParams): void;
export declare function removeCookie(key: string): void;
