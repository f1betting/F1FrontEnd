/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Constructor } from '../models/Constructor';
import type { Constructors } from '../models/Constructors';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ConstructorsService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get Constructors
     * @returns Constructors Successful Response
     * @throws ApiError
     */
    public getConstructors(): CancelablePromise<Constructors> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/constructors',
            errors: {
                404: `Not Found`,
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
     * Get Constructor By Id
     * @param constructorId 
     * @returns Constructor Successful Response
     * @throws ApiError
     */
    public getConstructorById(
constructorId: string,
): CancelablePromise<Constructor> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/constructor/{constructor_id}',
            path: {
                'constructor_id': constructorId,
            },
            errors: {
                404: `Not Found`,
                422: `Validation Error`,
            },
        });
    }

}
