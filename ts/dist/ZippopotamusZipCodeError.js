"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZippopotamusZipCodeError = void 0;
class ZippopotamusZipCodeError extends Error {
    isZippopotamusZipCodeError = true;
    sdk = 'ZippopotamusZipCode';
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
exports.ZippopotamusZipCodeError = ZippopotamusZipCodeError;
//# sourceMappingURL=ZippopotamusZipCodeError.js.map