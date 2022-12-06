import { BoxSetting, InfoCollision } from "features/interfaces";

export function getInfoOnCollision(
    leftBox: BoxSetting,
    rightBox: BoxSetting
): InfoCollision {
    const { time, xMeter } = getTimeAndDistOnCollision(leftBox, rightBox);

    return {
        time: time,
        x: xMeter,
        velocity: getVelocityOAfterCollision(leftBox, rightBox),
    };
}

export function getTimeAndDistOnCollision(
    leftBox: BoxSetting,
    rightBox: BoxSetting
) {
    const totalDistance = leftBox.distance + rightBox.distance; //meter
    const leftBoxVelocity = leftBox.speed;
    const rightBoxVelocity = -rightBox.speed;

    // 1 = right, 0 = left
    // x1 = x0 + v0*t + (1/2*a*t^2) but acceleration is 0 here
    // x0 + v0*t = x1 + v1*t
    // x0 - x1 = v1*t - v0*t = t(v1-v0)
    // (x0 - x1)/(v1-v0) = t
    const timeOnCollision =
        -totalDistance / (rightBoxVelocity - leftBoxVelocity);

    const xAtCollision = timeOnCollision * leftBoxVelocity;

    return {
        time: timeOnCollision, //seconds
        xMeter: xAtCollision, //meters
    };
}

export function getVelocityOAfterCollision(
    leftBox: BoxSetting,
    rightBox: BoxSetting
) {
    const leftBoxVelocity = leftBox.speed;
    const rightBoxVelocity = -rightBox.speed;
    //Elastic Collision Momentum
    // https://www.sciencefacts.net/elastic-collision.html

    const velocityLeftF =
        ((leftBox.mass - rightBox.mass) / (leftBox.mass + rightBox.mass)) *
            leftBoxVelocity +
        2 *
            ((rightBox.mass / (leftBox.mass + rightBox.mass)) *
                rightBoxVelocity);
    const velocityRightF =
        2 *
            ((leftBox.mass / (leftBox.mass + rightBox.mass)) *
                leftBoxVelocity) -
        ((leftBox.mass - rightBox.mass) / (leftBox.mass + rightBox.mass)) *
            leftBoxVelocity;

    return {
        left: velocityLeftF,
        right: velocityRightF,
    };
}
