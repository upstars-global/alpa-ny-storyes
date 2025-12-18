import {
    SLUG_CATEGORY_BONUS_WAGERING,
    SLUG_CATEGORY_BTC_GAMES,
    SLUG_CATEGORY_JACKPOT,
    SLUG_CATEGORY_LIVE,
    SLUG_CATEGORY_NEW,
    SLUG_CATEGORY_POKIES,
    SLUG_CATEGORY_RECOMMENDED,
    SLUG_CATEGORY_TOP,
} from "@theme/configs/categoryesGames";

export const DEFAULT_PAGE_LIMIT = 40;

export const CATEGORY_CONFIG = [
    { slug: SLUG_CATEGORY_TOP },
    { slug: SLUG_CATEGORY_NEW },
    { slug: SLUG_CATEGORY_RECOMMENDED },
    { slug: SLUG_CATEGORY_BONUS_WAGERING },
    { slug: SLUG_CATEGORY_BTC_GAMES },
];

import iconSlots from "@theme/images/icon-slots.svg";
import iconTop from "@theme/images/icon-action.svg";
import iconLive from "@theme/images/icon-live.svg";
import iconJackpot from "@theme/images/icon-jackpot.svg";

export const MAIN_MENU = [
    {
        image: iconSlots,
        slug: SLUG_CATEGORY_POKIES,
    },
    {
        image: iconLive,
        slug: SLUG_CATEGORY_LIVE,
    },
    {
        image: iconTop,
        slug: SLUG_CATEGORY_TOP,
    },
    {
        image: iconJackpot,
        slug: SLUG_CATEGORY_JACKPOT,
    },
];

export const SPECIAL_GAME_LINK = "/play/turbogames/rocket-x";
