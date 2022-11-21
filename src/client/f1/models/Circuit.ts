/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Location } from './Location';

export type Circuit = {
    timestamp?: number;
    circuitId: string;
    url: string;
    circuitName: string;
    Location: Location;
};
