import { ColombiaPublicEntityBase } from '../ColombiaPublicEntityBase';
import type { ColombiaPublicSDK } from '../ColombiaPublicSDK';
import type { Control } from '../types';
import type { Holiday, HolidayLoadMatch, HolidayListMatch } from '../ColombiaPublicTypes';
declare class HolidayEntity extends ColombiaPublicEntityBase<Holiday> {
    constructor(client: ColombiaPublicSDK, entopts: any);
    make(this: HolidayEntity): HolidayEntity;
    load(this: any, reqmatch?: HolidayLoadMatch, ctrl?: Control): Promise<HolidayEntity>;
    list(this: any, reqmatch?: HolidayListMatch, ctrl?: Control): Promise<HolidayEntity[]>;
}
export { HolidayEntity };
