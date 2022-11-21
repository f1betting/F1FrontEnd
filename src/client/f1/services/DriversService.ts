/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Driver } from '../models/Driver';
import type { Drivers } from '../models/Drivers';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class DriversService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get Drivers
     * @returns Drivers Successful Response
     * @throws ApiError
     */
    public getDrivers(): CancelablePromise<Drivers> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/drivers',
            errors: {
                404: `Not Found`,
                503: `Service Unavailable`,
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
                503: `Service Unavailable`,
            },
        });
    }

    /**
     * Get Driver By Id
     * @param driverId 
     * @returns Driver Successful Response
     * @throws ApiError
     */
    public getDriverById(
driverId: string,
): CancelablePromise<Driver> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/driver/{driver_id}',
            path: {
                'driver_id': driverId,
            },
            errors: {
                404: `Not Found`,
                422: `Validation Error`,
                503: `Service Unavailable`,
            },
        });
    }

}
