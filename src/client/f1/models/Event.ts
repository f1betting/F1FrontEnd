/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Circuit } from './Circuit';
import type { Session } from './Session';

export type Event = {
    timestamp?: number;
    season: number;
    round: number;
    url: string;
    raceName: string;
    Circuit: Circuit;
    date: string;
    time?: string;
    FirstPractice?: Session;
    SecondPractice?: Session;
    ThirdPractice?: Session;
    Qualifying?: Session;
};
