import { COUNTRIES } from "@theme/configs/constsLocales";

export const STAG_KEY = "stag";

export const REFERRER = {
    GOOGLE: "google",
    BING: "bing",
    YAHOO: "yahoo",
};

export const REFERRER_NAME = {
    google: REFERRER.GOOGLE,
    bing: REFERRER.BING,
    yahoo: REFERRER.YAHOO,
};

export const STAGS_COUNTRY_REFER = {
    [COUNTRIES.CANADA]: {
        [REFERRER.GOOGLE]: "97251_60214a36eb3e175502a40cb1",
        [REFERRER.BING]: "97251_602150e2eb3e175502a4173f",
        [REFERRER.YAHOO]: "97251_602150ef191a418c96f34f3f",
    },
    [COUNTRIES.AUSTRALIA]: {
        [REFERRER.GOOGLE]: "97251_6021512b191a418c96f34f9f",
        [REFERRER.BING]: "97251_60215136eb3e175502a417bd",
        [REFERRER.YAHOO]: "97251_6021513f6ed54bdde36083a7",
    },
};
