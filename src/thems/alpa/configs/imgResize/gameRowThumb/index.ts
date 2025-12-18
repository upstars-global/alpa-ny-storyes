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
        width: 128,
        height: 179,
    },
    [BreakPoints.BREAK_POINT_M]: {
        width: 160,
        height: 224,
    },
    [BreakPoints.BREAK_POINT_XXL]: {
        width: 192,
        height: 269,
    },
};

const extension: Extension = Extension.jpg;
const gravity: Gravity = Gravity.center;
const resizeType: ResizingType = ResizingType.fit;

const config: IConfigForTypeImage = {
    sizeByBreakPoint,
    extension,
    gravity,
    resizeType,
};

export default config;
