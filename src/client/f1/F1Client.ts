/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { AxiosHttpRequest } from './core/AxiosHttpRequest';

import { CircuitsService } from './services/CircuitsService';
import { ConstructorsService } from './services/ConstructorsService';
import { DefaultService } from './services/DefaultService';
import { DriversService } from './services/DriversService';
import { EventsService } from './services/EventsService';
import { ResultsService } from './services/ResultsService';
import { SeasonService } from './services/SeasonService';

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

export class F1Client {

    public readonly circuits: CircuitsService;
    public readonly constructors: ConstructorsService;
    public readonly default: DefaultService;
    public readonly drivers: DriversService;
    public readonly events: EventsService;
    public readonly results: ResultsService;
    public readonly season: SeasonService;

    public readonly request: BaseHttpRequest;

    constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = AxiosHttpRequest) {
        this.request = new HttpRequest({
            BASE: config?.BASE ?? '',
            VERSION: config?.VERSION ?? '1.2.5',
            WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
            CREDENTIALS: config?.CREDENTIALS ?? 'include',
            TOKEN: config?.TOKEN,
            USERNAME: config?.USERNAME,
            PASSWORD: config?.PASSWORD,
            HEADERS: config?.HEADERS,
            ENCODE_PATH: config?.ENCODE_PATH,
        });

        this.circuits = new CircuitsService(this.request);
        this.constructors = new ConstructorsService(this.request);
        this.default = new DefaultService(this.request);
        this.drivers = new DriversService(this.request);
        this.events = new EventsService(this.request);
        this.results = new ResultsService(this.request);
        this.season = new SeasonService(this.request);
    }
}
