import {DOMAIN_FOR_AUSTRALIA, LOCALES} from "@theme/configs/constsLocales";

interface IHostName {
    [key: string]: any;
}

export const MIRRORS_FOR_REDIRECT_TO_BLOG: IHostName = {
    ["develop." + DOMAIN_FOR_AUSTRALIA]: true,
    [DOMAIN_FOR_AUSTRALIA]: true
};

export const MAP_REDIRECTS_TO_BLOG: { [key: string]: string } = {
    "/rocketplay-emucasino": "/blog/versus/emu-casino",
    "/rocketplay-fairgocasino": "/blog/versus/fair-go-casino",
    "/rocketplay-jackpotcitycasino": "/blog/versus/jackpot-city-casino",
    "/rocketplay-spinpalace": "/blog/versus/spin-palace-casino",
    "/rich-casino": "/blog/versus/rich-casino",
    "/rocketplay-playamocasino": "/blog/versus/playamo-casino",
    "/versus": "/blog/versus",
};

export const LANG_TO_MIRRORS_FOR_BLOG: { [key: string]: string[] } = {
    "local.rocketplay.com": [LOCALES.ENGLISH, LOCALES.CANADIAN_ENGLISH],
    "rocketplay.com": [LOCALES.ENGLISH, LOCALES.CANADIAN_ENGLISH],
    "develop.rocketplay.com": [LOCALES.ENGLISH, LOCALES.CANADIAN_ENGLISH],
    [DOMAIN_FOR_AUSTRALIA]: [LOCALES.ENGLISH, LOCALES.AUSTRALIAN_ENGLISH],
    ["develop." + DOMAIN_FOR_AUSTRALIA]: [LOCALES.ENGLISH, LOCALES.AUSTRALIAN_ENGLISH]
};
