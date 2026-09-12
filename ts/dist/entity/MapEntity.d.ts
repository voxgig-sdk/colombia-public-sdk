import { ColombiaPublicEntityBase } from '../ColombiaPublicEntityBase';
import type { ColombiaPublicSDK } from '../ColombiaPublicSDK';
import type { Control } from '../types';
import type { MapType, MapListMatch } from '../ColombiaPublicTypes';
declare class MapEntity extends ColombiaPublicEntityBase<MapType> {
    constructor(client: ColombiaPublicSDK, entopts: any);
    make(this: MapEntity): MapEntity;
    list(this: any, reqmatch?: MapListMatch, ctrl?: Control): Promise<MapEntity[]>;
}
export { MapEntity };
