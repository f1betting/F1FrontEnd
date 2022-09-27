/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Calendar } from '../models/Calendar';
import type { Circuits } from '../models/Circuits';
import type { Constructors } from '../models/Constructors';
import type { ConstructorStandings } from '../models/ConstructorStandings';
import type { Drivers } from '../models/Drivers';
import type { DriverStandings } from '../models/DriverStandings';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class SeasonService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get Calendar By Season
     * @param season 
     * @returns Calendar Successful Response
     * @throws ApiError
     */
    public getCalendarBySeason(
season: number,
): CancelablePromise<Calendar> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/calendar/{season}',
            path: {
                'season': season,
            },
            errors: {
                404: `Not Found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Circuits By Season
     * @param season 
     * @returns Circuits Successful Response
     * @throws ApiError
     */
    public getCircuitsBySeason(
season: string,
): CancelablePromise<Circuits> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/circuits/{season}',
            path: {
                'season': season,
            },
            errors: {
                404: `Not Found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Constructors By Season
     * @param season 
     * @returns Constructors Successful Response
     * @throws ApiError
     */
    public getConstructorsBySeason(
season: string,
): CancelablePromise<Constructors> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/constructors/{season}',
            path: {
                'season': season,
            },
            errors: {
                404: `Not Found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Drivers By Season
     * @param season 
     * @returns Drivers Successful Response
     * @throws ApiError
     */
    public getDriversBySeason(
season: number,
): CancelablePromise<Drivers> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/drivers/{season}',
            path: {
                'season': season,
            },
            errors: {
                404: `Not Found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Driver Standings By Season
     * @param season 
     * @returns DriverStandings Successful Response
     * @throws ApiError
     */
    public getDriverStandingsBySeason(
season: number,
): CancelablePromise<DriverStandings> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/results/standings/drivers/{season}',
            path: {
                'season': season,
            },
            errors: {
                404: `Not Found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Constructor Standings By Season
     * @param season 
     * @returns ConstructorStandings Successful Response
     * @throws ApiError
     */
    public getConstructorStandingsBySeason(
season: number,
): CancelablePromise<ConstructorStandings> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/results/standings/constructors/{season}',
            path: {
                'season': season,
            },
            errors: {
                404: `Not Found`,
                422: `Validation Error`,
            },
        });
    }

}
