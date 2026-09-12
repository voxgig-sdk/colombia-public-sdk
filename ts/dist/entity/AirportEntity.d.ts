import { ColombiaPublicEntityBase } from '../ColombiaPublicEntityBase';
import type { ColombiaPublicSDK } from '../ColombiaPublicSDK';
import type { Control } from '../types';
import type { Airport, AirportLoadMatch, AirportListMatch } from '../ColombiaPublicTypes';
declare class AirportEntity extends ColombiaPublicEntityBase<Airport> {
    constructor(client: ColombiaPublicSDK, entopts: any);
    make(this: AirportEntity): AirportEntity;
    load(this: any, reqmatch?: AirportLoadMatch, ctrl?: Control): Promise<AirportEntity>;
    list(this: any, reqmatch?: AirportListMatch, ctrl?: Control): Promise<AirportEntity[]>;
}
export { AirportEntity };
