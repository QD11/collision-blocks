import { BoxProperty } from "features/interfaces";

export const defaultEnvSettings = {
    distance: 20,
};

export const defaultBoxSetting = {
    speed: 10,
    mass: 1,
    distance: 100,
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
