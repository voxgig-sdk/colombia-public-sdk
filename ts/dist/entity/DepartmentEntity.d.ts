import { ColombiaPublicEntityBase } from '../ColombiaPublicEntityBase';
import type { ColombiaPublicSDK } from '../ColombiaPublicSDK';
import type { Control } from '../types';
import type { Department, DepartmentLoadMatch, DepartmentListMatch } from '../ColombiaPublicTypes';
declare class DepartmentEntity extends ColombiaPublicEntityBase<Department> {
    constructor(client: ColombiaPublicSDK, entopts: any);
    make(this: DepartmentEntity): DepartmentEntity;
    load(this: any, reqmatch?: DepartmentLoadMatch, ctrl?: Control): Promise<DepartmentEntity>;
    list(this: any, reqmatch?: DepartmentListMatch, ctrl?: Control): Promise<DepartmentEntity[]>;
}
export { DepartmentEntity };
