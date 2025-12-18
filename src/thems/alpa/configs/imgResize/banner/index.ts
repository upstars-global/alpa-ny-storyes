import {
    BreakPoints,
    Extension,
    Gravity,
    IConfigForTypeImage,
    IConfigImg,
    ResizingType,
} from "@theme/configs/imgResize/imageConfig";

const sizeByBreakPoint: Partial<Record<BreakPoints, IConfigImg>> = {
    [BreakPoints.BREAK_POINT_XS]: {
        width: 334,
        height: 320,
    },
    [BreakPoints.BREAK_POINT_S]: {
        width: 456,
        height: 352,
    },
    [BreakPoints.BREAK_POINT_M]: {
        width: 650,
        height: 352,
    },
    [BreakPoints.BREAK_POINT_XM]: {
        width: 680,
        height: 352,
    },
    [BreakPoints.BREAK_POINT_L]: {
        width: 715,
        height: 352,
    },
};

const extension: Extension = Extension.png;
const resizeType: ResizingType = ResizingType.fill;
const gravity: Gravity = Gravity.northwest;

const config: IConfigForTypeImage = {
    sizeByBreakPoint,
    extension,
    gravity,
    resizeType,
};

export default config;
