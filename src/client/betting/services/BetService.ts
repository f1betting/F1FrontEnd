/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseBet } from '../models/BaseBet';
import type { FullBet } from '../models/FullBet';
import type { Message } from '../models/Message';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class BetService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get Bet
     * @param season 
     * @param race 
     * @returns FullBet Successful Response
     * @throws ApiError
     */
    public getBet(
season: number,
race: number,
): CancelablePromise<FullBet> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/bet/{season}/{race}',
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
     * Edit Bet
     * @param p1 
     * @param p2 
     * @param p3 
     * @returns Message Successful Response
     * @throws ApiError
     */
    public editBet(
p1: string,
p2: string,
p3: string,
): CancelablePromise<Message> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/bet',
            query: {
                'p1': p1,
                'p2': p2,
                'p3': p3,
            },
            errors: {
                404: `Not Found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create Bet
     * @param requestBody 
     * @returns FullBet Successful Response
     * @throws ApiError
     */
    public createBet(
requestBody: BaseBet,
): CancelablePromise<FullBet> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/bet',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Not Found`,
                409: `Conflict`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete Bet
     * @returns Message Successful Response
     * @throws ApiError
     */
    public deleteBet(): CancelablePromise<Message> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/bet',
            errors: {
                404: `Not Found`,
            },
        });
    }

}
