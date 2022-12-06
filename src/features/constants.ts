import { BoxProperty, BoxSetting, InfoCollision } from "features/interfaces";

export const defaultEnvSettings = {
    distance: 20,
};

export const defaultBoxSetting: BoxSetting = {
    speed: 10,
    mass: 1,
    distance: 50,
    width: 5,
};

const DISTANCE_LABEL = "distance (m)";
const SPEED_LABEL = "speed (m/s)";
const MASS_LABEL = "mass (kg)";
const WIDTH_LABEL = "width (m)";

export const BOX_PROPERTIES: BoxProperty[] = [
    {
        label: DISTANCE_LABEL,
        name: "distance",
    },
    {
        label: SPEED_LABEL,
        name: "speed",
    },
    {
        label: MASS_LABEL,
        name: "mass",
    },
    {
        label: WIDTH_LABEL,
        name: "width",
    },
];

export const SVG_PADDING = 20;

export const BOX_HEIGHT = 20;

export const DEFAULT_TIME_STEP = 500; //500 milliseconds = 0.5seconds

export const DEFAULT_STATS: InfoCollision = {
    time: 10,
    x: 10,
    velocity: {
        left: 10,
        right: 10,
    },
};
