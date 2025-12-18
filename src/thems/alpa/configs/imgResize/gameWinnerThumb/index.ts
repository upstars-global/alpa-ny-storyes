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
        width: 40,
        height: 40,
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
