import { ColombiaPublicEntityBase } from '../ColombiaPublicEntityBase';
import type { ColombiaPublicSDK } from '../ColombiaPublicSDK';
import type { Control } from '../types';
import type { TypicalDish, TypicalDishLoadMatch, TypicalDishListMatch } from '../ColombiaPublicTypes';
declare class TypicalDishEntity extends ColombiaPublicEntityBase<TypicalDish> {
    constructor(client: ColombiaPublicSDK, entopts: any);
    make(this: TypicalDishEntity): TypicalDishEntity;
    load(this: any, reqmatch?: TypicalDishLoadMatch, ctrl?: Control): Promise<TypicalDishEntity>;
    list(this: any, reqmatch?: TypicalDishListMatch, ctrl?: Control): Promise<TypicalDishEntity[]>;
}
export { TypicalDishEntity };
