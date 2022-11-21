/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class DefaultService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Test
     * @returns any Successful Response
     * @throws ApiError
     */
    public test(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/test',
        });
    }

}
