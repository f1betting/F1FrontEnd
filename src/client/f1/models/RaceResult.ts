/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Constructor } from './Constructor';
import type { Driver } from './Driver';
import type { FastestLap } from './FastestLap';
import type { Time } from './Time';

export type RaceResult = {
    number: number;
    position: number;
    positionText: string;
    points: number;
    Driver: Driver;
    Constructor: Constructor;
    grid: number;
    laps: number;
    status: string;
    Time?: Time;
    FastestLap?: FastestLap;
};
