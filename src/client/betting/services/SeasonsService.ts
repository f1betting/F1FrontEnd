/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Seasons } from '../models/Seasons';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class SeasonsService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get Seasons
     * @returns Seasons Successful Response
     * @throws ApiError
     */
    public getSeasons(): CancelablePromise<Seasons> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/seasons',
            errors: {
                404: `Not Found`,
            },
        });
    }

}
