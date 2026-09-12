import { ColombiaPublicEntityBase } from '../ColombiaPublicEntityBase';
import type { ColombiaPublicSDK } from '../ColombiaPublicSDK';
import type { Control } from '../types';
import type { CategoryNaturalArea, CategoryNaturalAreaListMatch } from '../ColombiaPublicTypes';
declare class CategoryNaturalAreaEntity extends ColombiaPublicEntityBase<CategoryNaturalArea> {
    constructor(client: ColombiaPublicSDK, entopts: any);
    make(this: CategoryNaturalAreaEntity): CategoryNaturalAreaEntity;
    list(this: any, reqmatch?: CategoryNaturalAreaListMatch, ctrl?: Control): Promise<CategoryNaturalAreaEntity[]>;
}
export { CategoryNaturalAreaEntity };
