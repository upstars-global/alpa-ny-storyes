interface IStringDictionary {
    [key: string]: string;
}

interface IBooleanDictionary {
    [key: string]: boolean;
}

export const DOMAIN_FOR_AUSTRALIA = "rocketplay9.com";

const LOCALES: IStringDictionary = {
    ENGLISH: "en",
    GERMANY: "de",
    AUSTRALIAN_ENGLISH: "en-AU",
    CANADIAN_ENGLISH: "en-CA",
    CANADIAN_FRANCH: "fr-CA",
    NEW_ZEALAND: "en-NZ",
    IRELAND: "en-IE",
    JAPAN: "ja",
    BRAZILIAN_PORTUGUESE: "pt-BR",
    SPANISH_MEXICAN: "es-MX",
    NORWEGIAN: "no",
};

const COUNTRIES: IStringDictionary = {
    CANADA: "CA",
    AUSTRALIA: "AU",
    JAPAN: "JA",
    GERMANY: "DE",
    BRASILIA: "BR",
    NEW_ZEALAND: "NZ",
};

const ALLOW_DOMAINS: string[] = [
    "rocketplay.com",
    DOMAIN_FOR_AUSTRALIA,
];

const REGIONS_BY_COUNTRIES = {};

// Prod
const COOKIE_BY_LOCALE: IStringDictionary = {
    [LOCALES.ENGLISH]: "ImVuIg==--2ca1ab4c829b62130fedf57080892fa170337245",
    [LOCALES.GERMANY]: "ImRlIg==--23cbfeb117a0f32c6c914f76c44dad237fcf5c21",
    [LOCALES.AUSTRALIAN_ENGLISH]: "ImVuLUFVIg==--41062fd3167c295a3748ff92e55ae986e103b7a0",
    [LOCALES.CANADIAN_ENGLISH]: "ImVuLUNBIg==--6e27a9a10df018a53702dde3691e75c25cb304ba",
    [LOCALES.CANADIAN_FRANCH]: "ImZyLUNBIg==--d3c30ca9a1b943ce60092b748ba192d59081e12f",
    [LOCALES.NEW_ZEALAND]: "ImVuLU5aIg==--40320e527b8363f3ac75e89d07be5795225da12b",
    [LOCALES.IRELAND]: "ImVuLUlFIg==--3a15d0cea8cef7ae5655b5f7b1628d299ad50e4d",
    [LOCALES.JAPAN]: "ImphIg==--415e361e5490129e3b4ced0e117175b2c1975335",
    [LOCALES.BRAZILIAN_PORTUGUESE]: "InB0LUJSIg==--a80e1d55c81d204f67fa8e855240e179d9ef8606",
    [LOCALES.NORWEGIAN]: "Im5vIg==--bf8d17c4fdce64751f515db68dafcd87ed55074f",
};

// // Stage
// const COOKIE_BY_LOCALE: IStringDictionary = {
//     [LOCALES.ENGLISH]: "ImVuIg==--2fe6ec9f3011901f7cfe4eecf1860f3ef40e2785",
//     [LOCALES.GERMANY]: "",
//     [LOCALES.AUSTRALIAN_ENGLISH]: "ImVuLUFVIg==--59a5c4efe7ba287962afe6e55c1018cc88f4f48d",
//     [LOCALES.CANADIAN_ENGLISH]: "ImVuLUNBIg==--d916ad335f8f6bc5b8f37b4e08383ab7e3eff1c7",
//     [LOCALES.NEW_ZEALAND]: "ImVuLU5aIg==--a3bd186f8af139e618d2ca4fecf7cb6c41b6ba2c",
//     [LOCALES.IRELAND]: "ImVuLUlFIg==--b5f53402f7c0fbb75fd4e8c6913c20a9d7aa9cbc",
// };

const COUNTRY_BY_HOST: IStringDictionary = {
    "rocketplay.com": COUNTRIES.CANADA,
    "develop.rocketplay.com": COUNTRIES.CANADA,
    "local.rocketplay.com": COUNTRIES.CANADA,

    [DOMAIN_FOR_AUSTRALIA]: COUNTRIES.AUSTRALIA,
    ["develop." + DOMAIN_FOR_AUSTRALIA]: COUNTRIES.AUSTRALIA,
    ["local." + DOMAIN_FOR_AUSTRALIA]: COUNTRIES.AUSTRALIA,
    "rocketplay-de.com": COUNTRIES.GERMANY,
    "rocketplay-nz.com": COUNTRIES.NEW_ZEALAND,
};

const AVAILABLE_LOCALES: IBooleanDictionary = {
    [LOCALES.ENGLISH]: true,
    [LOCALES.GERMANY]: true,
    [LOCALES.AUSTRALIAN_ENGLISH]: true,
    [LOCALES.CANADIAN_ENGLISH]: true,
    [LOCALES.CANADIAN_FRANCH]: true,
    [LOCALES.NEW_ZEALAND]: true,
    [LOCALES.IRELAND]: true,
    [LOCALES.JAPAN]: true,
    [LOCALES.BRAZILIAN_PORTUGUESE]: true,
    [LOCALES.SPANISH_MEXICAN]: true,
    [LOCALES.NORWEGIAN]: true,
};

const DEFAULT_LOCALE_BY_COUNTRY: IStringDictionary = {
    default: LOCALES.CANADIAN_ENGLISH,
    [COUNTRIES.CANADA]: LOCALES.CANADIAN_ENGLISH,
    [COUNTRIES.AUSTRALIA]: LOCALES.AUSTRALIAN_ENGLISH,
    [COUNTRIES.GERMANY]: LOCALES.GERMANY,
    [COUNTRIES.BRASILIA]: LOCALES.BRAZILIAN_PORTUGUESE,
    [COUNTRIES.NEW_ZEALAND]: LOCALES.NEW_ZEALAND,
};

const DEFAULT_COUNTRY = COUNTRIES.CANADA;

const LOCALES_CLOSED_FOR_BOT = {
    [LOCALES.ENGLISH]: true,
    [LOCALES.GERMANY]: true,
    [LOCALES.IRELAND]: true,
};

const EXCEPTION_DOMAIN_LANG_ALLOW = {
    "rocketplay.com": [ LOCALES.GERMANY, LOCALES.NEW_ZEALAND ], // for production
    "develop.rocketplay.com": [ LOCALES.GERMANY, LOCALES.NEW_ZEALAND ], // for QA test on RC stage
    "local.rocketplay.com": [ LOCALES.GERMANY, LOCALES.NEW_ZEALAND ], // for local test
};

const DOMAINS_USE_LANG_FROM_URL: { [key: string]: boolean } = {
    "rocketplay.com": true, // for production
    "develop.rocketplay.com": true, // for QA test on RC stage
    "staging.rocketplay.com": true, // for seo test
    "local.rocketplay.com": true, // for local test
};

export {
    LOCALES,
    COUNTRIES,
    COOKIE_BY_LOCALE,
    COUNTRY_BY_HOST,
    AVAILABLE_LOCALES,
    DEFAULT_LOCALE_BY_COUNTRY,
    ALLOW_DOMAINS,
    DEFAULT_COUNTRY,
    EXCEPTION_DOMAIN_LANG_ALLOW,
    REGIONS_BY_COUNTRIES,
    DOMAINS_USE_LANG_FROM_URL,
};
