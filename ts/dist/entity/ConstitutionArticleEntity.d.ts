import { ColombiaPublicEntityBase } from '../ColombiaPublicEntityBase';
import type { ColombiaPublicSDK } from '../ColombiaPublicSDK';
import type { Control } from '../types';
import type { ConstitutionArticle, ConstitutionArticleLoadMatch, ConstitutionArticleListMatch } from '../ColombiaPublicTypes';
declare class ConstitutionArticleEntity extends ColombiaPublicEntityBase<ConstitutionArticle> {
    constructor(client: ColombiaPublicSDK, entopts: any);
    make(this: ConstitutionArticleEntity): ConstitutionArticleEntity;
    load(this: any, reqmatch?: ConstitutionArticleLoadMatch, ctrl?: Control): Promise<ConstitutionArticleEntity>;
    list(this: any, reqmatch?: ConstitutionArticleListMatch, ctrl?: Control): Promise<ConstitutionArticleEntity[]>;
}
export { ConstitutionArticleEntity };
