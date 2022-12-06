export type BoxName = "distance" | "speed" | "mass" | "width";

export interface BoxProperty {
    label: string;
    name: BoxName;
}

export interface BoxSetting {
    speed: number;
    mass: number;
    distance: number;
    width: number;
}

export interface InfoCollision {
    time: number;
    x: number;
    velocity: {
        left: number;
        right: number;
    };
}
