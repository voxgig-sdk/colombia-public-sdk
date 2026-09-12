import { ColombiaPublicEntityBase } from '../ColombiaPublicEntityBase';
import type { ColombiaPublicSDK } from '../ColombiaPublicSDK';
import type { Control } from '../types';
import type { TouristicAttraction, TouristicAttractionLoadMatch, TouristicAttractionListMatch } from '../ColombiaPublicTypes';
declare class TouristicAttractionEntity extends ColombiaPublicEntityBase<TouristicAttraction> {
    constructor(client: ColombiaPublicSDK, entopts: any);
    make(this: TouristicAttractionEntity): TouristicAttractionEntity;
    load(this: any, reqmatch?: TouristicAttractionLoadMatch, ctrl?: Control): Promise<TouristicAttractionEntity>;
    list(this: any, reqmatch?: TouristicAttractionListMatch, ctrl?: Control): Promise<TouristicAttractionEntity[]>;
}
export { TouristicAttractionEntity };
