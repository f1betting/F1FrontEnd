/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Event } from '../models/Event';
import type { NextEvent } from '../models/NextEvent';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class EventsService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get Next Race
     * @returns NextEvent Successful Response
     * @throws ApiError
     */
    public getNextRace(): CancelablePromise<NextEvent> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/event/next',
            errors: {
                404: `Not Found`,
                503: `Service Unavailable`,
            },
        });
    }

    /**
     * Get Previous Race
     * @returns NextEvent Successful Response
     * @throws ApiError
     */
    public getPreviousRace(): CancelablePromise<NextEvent> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/event/previous',
            errors: {
                404: `Not Found`,
                503: `Service Unavailable`,
            },
        });
    }

    /**
     * Get Event Details
     * @param season 
     * @param round 
     * @returns Event Successful Response
     * @throws ApiError
     */
    public getEventDetails(
season: number,
round: number,
): CancelablePromise<Event> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/event/{season}/{round}',
            path: {
                'season': season,
                'round': round,
            },
            errors: {
                404: `Not Found`,
                422: `Validation Error`,
                503: `Service Unavailable`,
            },
        });
    }

}
