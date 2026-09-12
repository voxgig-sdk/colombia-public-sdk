import { ColombiaPublicEntityBase } from '../ColombiaPublicEntityBase';
import type { ColombiaPublicSDK } from '../ColombiaPublicSDK';
import type { Control } from '../types';
import type { NaturalArea, NaturalAreaLoadMatch, NaturalAreaListMatch } from '../ColombiaPublicTypes';
declare class NaturalAreaEntity extends ColombiaPublicEntityBase<NaturalArea> {
    constructor(client: ColombiaPublicSDK, entopts: any);
    make(this: NaturalAreaEntity): NaturalAreaEntity;
    load(this: any, reqmatch?: NaturalAreaLoadMatch, ctrl?: Control): Promise<NaturalAreaEntity>;
    list(this: any, reqmatch?: NaturalAreaListMatch, ctrl?: Control): Promise<NaturalAreaEntity[]>;
}
export { NaturalAreaEntity };
