import banner from "@theme/configs/imgResize/banner";
import gameRowThumb from "@theme/configs/imgResize/gameRowThumb";
import gameThumb from "@theme/configs/imgResize/gameThumb";
import gameWinnerThumb from "@theme/configs/imgResize/gameWinnerThumb";
import { IConfigForTypeImage } from "@theme/configs/imgResize/imageConfig";

export enum TypeImage {
    BANNER = "banner",
    GAME_THUMB = "gameThumb",
    GAME_ROW_THUMB = "gameRowThumb",
    GAME_WINNER_THUMB = "gameWinnerThumb"
}

export interface IConfigResizeImg {
    [TypeImage.BANNER]: IConfigForTypeImage;
    [TypeImage.GAME_THUMB]: IConfigForTypeImage;
    [TypeImage.GAME_ROW_THUMB]: IConfigForTypeImage;
    [TypeImage.GAME_WINNER_THUMB]: IConfigForTypeImage;
}

const CONFIGS_BY_TYPE: IConfigResizeImg = {
    [TypeImage.BANNER]: banner,
    [TypeImage.GAME_THUMB]: gameThumb,
    [TypeImage.GAME_ROW_THUMB]: gameRowThumb,
    [TypeImage.GAME_WINNER_THUMB]: gameWinnerThumb,
};

export function getConfigImg(type: TypeImage): IConfigForTypeImage {
    return CONFIGS_BY_TYPE[type];
}
