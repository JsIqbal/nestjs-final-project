"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminGuard = void 0;
class AdminGuard {
    canActivate(context) {
        var _a;
        const request = context.switchToHttp().getRequest();
        console.log(request.currentUser);
        return ((_a = request === null || request === void 0 ? void 0 : request.currentUser) === null || _a === void 0 ? void 0 : _a.admin) || false;
    }
}
exports.AdminGuard = AdminGuard;
//# sourceMappingURL=admin.guard.js.map