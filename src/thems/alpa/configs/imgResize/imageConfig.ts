export enum BreakPoints {
    BREAK_POINT_XS = 320,
    BREAK_POINT_S = 508,
    BREAK_POINT_M = 754,
    BREAK_POINT_XM = 980,
    BREAK_POINT_L = 1200,
    BREAK_POINT_XL = 1300,
    BREAK_POINT_NEW_XL = 1420,
    BREAK_POINT_XXL = 1792,
}

export interface IConfigImg {
    width: number;
    height: number;
}

export interface IResizeImgQueryParams extends IConfigImg {
    dpr?: number;
}

export interface IConfigPreparing extends IResizeImgQueryParams {
    url: string;
}

export enum Extension {
    png = "png",
    jpg = "jpg",
}

export enum Gravity {
    center = "ce",
    northwest = "nowe", // top-left corner
}

export enum ResizingType {
    fill = "fill",
    fit = "fit",
}

export interface IConfigForTypeImage {
    sizeByBreakPoint: Partial<Record<BreakPoints, IConfigImg>>;
    extension: Extension;
    gravity: Gravity;
    resizeType: ResizingType;
}

export const IMG_QUERY_WIDTH = "width";
export const IMG_QUERY_HEIGHT = "height";
export const IMG_QUERY_DPR = "dpr";
