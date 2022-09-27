/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserResults } from '../models/UserResults';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ResultsService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get All Results For Round
     * @param season 
     * @param race 
     * @returns UserResults Successful Response
     * @throws ApiError
     */
    public getAllResultsForRound(
season: number,
race: number,
): CancelablePromise<UserResults> {
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
            },
        });
    }

    /**
     * Get Standings
     * @param season 
     * @returns UserResults Successful Response
     * @throws ApiError
     */
    public getStandings(
season: number,
): CancelablePromise<UserResults> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/results/standings/{season}',
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
