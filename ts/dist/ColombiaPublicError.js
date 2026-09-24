"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColombiaPublicError = void 0;
class ColombiaPublicError extends Error {
    isColombiaPublicError = true;
    sdk = 'ColombiaPublic';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.ColombiaPublicError = ColombiaPublicError;
//# sourceMappingURL=ColombiaPublicError.js.map