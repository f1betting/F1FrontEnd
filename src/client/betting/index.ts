/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export { BettingClient } from './BettingClient';

export { ApiError } from './core/ApiError';
export { BaseHttpRequest } from './core/BaseHttpRequest';
export { CancelablePromise, CancelError } from './core/CancelablePromise';
export { OpenAPI } from './core/OpenAPI';
export type { OpenAPIConfig } from './core/OpenAPI';

export type { BaseBet } from './models/BaseBet';
export type { FullBet } from './models/FullBet';
export type { HTTPValidationError } from './models/HTTPValidationError';
export type { Message } from './models/Message';
export type { Seasons } from './models/Seasons';
export type { User } from './models/User';
export type { UserResult } from './models/UserResult';
export type { UserResults } from './models/UserResults';
export type { Users } from './models/Users';
export type { ValidationError } from './models/ValidationError';

export { BetService } from './services/BetService';
export { ResultsService } from './services/ResultsService';
export { SeasonsService } from './services/SeasonsService';
export { UsersService } from './services/UsersService';
