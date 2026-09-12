import { Context } from './Context';
declare class ZippopotamusZipCodeError extends Error {
    isZippopotamusZipCodeError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { ZippopotamusZipCodeError };
