import { ColombiaPublicEntityBase } from '../ColombiaPublicEntityBase';
import type { ColombiaPublicSDK } from '../ColombiaPublicSDK';
import type { Control } from '../types';
import type { Radio, RadioLoadMatch, RadioListMatch } from '../ColombiaPublicTypes';
declare class RadioEntity extends ColombiaPublicEntityBase<Radio> {
    constructor(client: ColombiaPublicSDK, entopts: any);
    make(this: RadioEntity): RadioEntity;
    load(this: any, reqmatch?: RadioLoadMatch, ctrl?: Control): Promise<RadioEntity>;
    list(this: any, reqmatch?: RadioListMatch, ctrl?: Control): Promise<RadioEntity[]>;
}
export { RadioEntity };
