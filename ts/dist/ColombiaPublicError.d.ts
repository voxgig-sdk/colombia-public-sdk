import { Context } from './Context';
declare class ColombiaPublicError extends Error {
    isColombiaPublicError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { ColombiaPublicError };
