import { ZippopotamusZipCodeEntityBase } from '../ZippopotamusZipCodeEntityBase';
import type { ZippopotamusZipCodeSDK } from '../ZippopotamusZipCodeSDK';
import type { Control } from '../types';
import type { GetLocationByPostalCode, GetLocationByPostalCodeListMatch } from '../ZippopotamusZipCodeTypes';
declare class GetLocationByPostalCodeEntity extends ZippopotamusZipCodeEntityBase<GetLocationByPostalCode> {
    constructor(client: ZippopotamusZipCodeSDK, entopts: any);
    make(this: GetLocationByPostalCodeEntity): GetLocationByPostalCodeEntity;
    list(this: any, reqmatch?: GetLocationByPostalCodeListMatch, ctrl?: Control): Promise<GetLocationByPostalCodeEntity[]>;
}
export { GetLocationByPostalCodeEntity };
