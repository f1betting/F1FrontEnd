/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Constructor } from './Constructor';
import type { Driver } from './Driver';

export type DriverStanding = {
    position: number;
    positionText: string;
    points: number;
    wins: number;
    Driver: Driver;
    Constructors: Array<Constructor>;
};
