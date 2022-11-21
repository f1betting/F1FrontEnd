/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Constructor } from './Constructor';

export type ConstructorStanding = {
    timestamp?: number;
    position: number;
    positionText: string;
    points: number;
    wins: number;
    Constructor: Constructor;
};
