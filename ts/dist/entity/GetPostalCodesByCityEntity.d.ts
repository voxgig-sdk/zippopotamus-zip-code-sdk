import { ZippopotamusZipCodeEntityBase } from '../ZippopotamusZipCodeEntityBase';
import type { ZippopotamusZipCodeSDK } from '../ZippopotamusZipCodeSDK';
import type { Control } from '../types';
import type { GetPostalCodesByCity, GetPostalCodesByCityListMatch } from '../ZippopotamusZipCodeTypes';
declare class GetPostalCodesByCityEntity extends ZippopotamusZipCodeEntityBase<GetPostalCodesByCity> {
    constructor(client: ZippopotamusZipCodeSDK, entopts: any);
    make(this: GetPostalCodesByCityEntity): GetPostalCodesByCityEntity;
    list(this: any, reqmatch?: GetPostalCodesByCityListMatch, ctrl?: Control): Promise<GetPostalCodesByCityEntity[]>;
}
export { GetPostalCodesByCityEntity };
