"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUser = void 0;
const common_1 = require("@nestjs/common");
exports.currentUser = (0, common_1.createParamDecorator)((data, context) => {
    const request = context.switchToHttp().getRequest();
    return request.currentUser;
});
//# sourceMappingURL=current-user.decorator.js.map