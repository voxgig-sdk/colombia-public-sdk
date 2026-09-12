import { ColombiaPublicEntityBase } from '../ColombiaPublicEntityBase';
import type { ColombiaPublicSDK } from '../ColombiaPublicSDK';
import type { Control } from '../types';
import type { President, PresidentLoadMatch, PresidentListMatch } from '../ColombiaPublicTypes';
declare class PresidentEntity extends ColombiaPublicEntityBase<President> {
    constructor(client: ColombiaPublicSDK, entopts: any);
    make(this: PresidentEntity): PresidentEntity;
    load(this: any, reqmatch?: PresidentLoadMatch, ctrl?: Control): Promise<PresidentEntity>;
    list(this: any, reqmatch?: PresidentListMatch, ctrl?: Control): Promise<PresidentEntity[]>;
}
export { PresidentEntity };
