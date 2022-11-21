/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Constructor } from './Constructor';
import type { Driver } from './Driver';

export type QualifyingResult = {
    timestamp?: number;
    number: number;
    position: number;
    Driver: Driver;
    Constructor: Constructor;
    Q1?: string;
    Q2?: string;
    Q3?: string;
};
