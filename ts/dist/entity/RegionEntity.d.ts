import { ColombiaPublicEntityBase } from '../ColombiaPublicEntityBase';
import type { ColombiaPublicSDK } from '../ColombiaPublicSDK';
import type { Control } from '../types';
import type { Region, RegionLoadMatch, RegionListMatch } from '../ColombiaPublicTypes';
declare class RegionEntity extends ColombiaPublicEntityBase<Region> {
    constructor(client: ColombiaPublicSDK, entopts: any);
    make(this: RegionEntity): RegionEntity;
    load(this: any, reqmatch?: RegionLoadMatch, ctrl?: Control): Promise<RegionEntity>;
    list(this: any, reqmatch?: RegionListMatch, ctrl?: Control): Promise<RegionEntity[]>;
}
export { RegionEntity };
