import { ColombiaPublicEntityBase } from '../ColombiaPublicEntityBase';
import type { ColombiaPublicSDK } from '../ColombiaPublicSDK';
import type { Control } from '../types';
import type { InvasiveSpecie, InvasiveSpecieLoadMatch, InvasiveSpecieListMatch } from '../ColombiaPublicTypes';
declare class InvasiveSpecieEntity extends ColombiaPublicEntityBase<InvasiveSpecie> {
    constructor(client: ColombiaPublicSDK, entopts: any);
    make(this: InvasiveSpecieEntity): InvasiveSpecieEntity;
    load(this: any, reqmatch?: InvasiveSpecieLoadMatch, ctrl?: Control): Promise<InvasiveSpecieEntity>;
    list(this: any, reqmatch?: InvasiveSpecieListMatch, ctrl?: Control): Promise<InvasiveSpecieEntity[]>;
}
export { InvasiveSpecieEntity };
