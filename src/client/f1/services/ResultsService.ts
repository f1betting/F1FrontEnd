/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ConstructorStandings } from '../models/ConstructorStandings';
import type { DriverStandings } from '../models/DriverStandings';
import type { QualifyingResults } from '../models/QualifyingResults';
import type { RaceResults } from '../models/RaceResults';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ResultsService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get Race Results
     * @param season 
     * @param race 
     * @returns RaceResults Successful Response
     * @throws ApiError
     */
    public getRaceResults(
season: number,
race: number,
): CancelablePromise<RaceResults> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/results/race/{season}/{race}',
            path: {
                'season': season,
                'race': race,
            },
            errors: {
                404: `Not Found`,
                422: `Validation Error`,
                503: `Service Unavailable`,
            },
        });
    }

    /**
     * Get Qualifying Results
     * @param season 
     * @param race 
     * @returns QualifyingResults Successful Response
     * @throws ApiError
     */
    public getQualifyingResults(
season: number,
race: number,
): CancelablePromise<QualifyingResults> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/results/qualifying/{season}/{race}',
            path: {
                'season': season,
                'race': race,
            },
            errors: {
                404: `Not Found`,
                422: `Validation Error`,
                503: `Service Unavailable`,
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
                503: `Service Unavailable`,
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
                503: `Service Unavailable`,
            },
        });
    }

}
