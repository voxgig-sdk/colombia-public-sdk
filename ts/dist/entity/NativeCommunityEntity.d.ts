import { ColombiaPublicEntityBase } from '../ColombiaPublicEntityBase';
import type { ColombiaPublicSDK } from '../ColombiaPublicSDK';
import type { Control } from '../types';
import type { NativeCommunity, NativeCommunityLoadMatch, NativeCommunityListMatch } from '../ColombiaPublicTypes';
declare class NativeCommunityEntity extends ColombiaPublicEntityBase<NativeCommunity> {
    constructor(client: ColombiaPublicSDK, entopts: any);
    make(this: NativeCommunityEntity): NativeCommunityEntity;
    load(this: any, reqmatch?: NativeCommunityLoadMatch, ctrl?: Control): Promise<NativeCommunityEntity>;
    list(this: any, reqmatch?: NativeCommunityListMatch, ctrl?: Control): Promise<NativeCommunityEntity[]>;
}
export { NativeCommunityEntity };
