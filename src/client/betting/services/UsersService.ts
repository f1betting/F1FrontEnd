/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { User } from '../models/User';
import type { Users } from '../models/Users';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class UsersService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get All Users
     * @returns Users Successful Response
     * @throws ApiError
     */
    public getAllUsers(): CancelablePromise<Users> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/users/',
            errors: {
                404: `Not Found`,
            },
        });
    }

    /**
     * Create User
     * @param requestBody 
     * @returns User Successful Response
     * @throws ApiError
     */
    public createUser(
requestBody: User,
): CancelablePromise<User> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/users/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                409: `Conflict`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get User By Id
     * @param userId 
     * @returns User Successful Response
     * @throws ApiError
     */
    public getUserById(
userId: string,
): CancelablePromise<User> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/users/{user_id}',
            path: {
                'user_id': userId,
            },
            errors: {
                404: `Not Found`,
                422: `Validation Error`,
            },
        });
    }

}
