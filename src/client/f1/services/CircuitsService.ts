/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Circuit } from '../models/Circuit';
import type { Circuits } from '../models/Circuits';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class CircuitsService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get Circuits
     * @returns Circuits Successful Response
     * @throws ApiError
     */
    public getCircuits(): CancelablePromise<Circuits> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/circuits',
            errors: {
                404: `Not Found`,
                503: `Service Unavailable`,
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
                503: `Service Unavailable`,
            },
        });
    }

    /**
     * Get Circuit By Id
     * @param circuitId 
     * @returns Circuit Successful Response
     * @throws ApiError
     */
    public getCircuitById(
circuitId: string,
): CancelablePromise<Circuit> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/circuit/{circuit_id}',
            path: {
                'circuit_id': circuitId,
            },
            errors: {
                404: `Not Found`,
                422: `Validation Error`,
                503: `Service Unavailable`,
            },
        });
    }

}
