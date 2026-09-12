import { GetLocationByPostalCodeEntity } from './entity/GetLocationByPostalCodeEntity';
import { GetPostalCodesByCityEntity } from './entity/GetPostalCodesByCityEntity';
export type * from './ZippopotamusZipCodeTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { ZippopotamusZipCodeEntityBase } from './ZippopotamusZipCodeEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class ZippopotamusZipCodeSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    GetLocationByPostalCode(entopts?: Record<string, any>): GetLocationByPostalCodeEntity;
    GetPostalCodesByCity(entopts?: Record<string, any>): GetPostalCodesByCityEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): ZippopotamusZipCodeSDK;
    tester(testopts?: any, sdkopts?: any): ZippopotamusZipCodeSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof ZippopotamusZipCodeSDK;
export { stdutil, config, BaseFeature, ZippopotamusZipCodeEntityBase, ZippopotamusZipCodeSDK, SDK, };
