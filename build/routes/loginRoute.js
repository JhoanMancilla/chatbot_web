"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginController_1 = require("../controllers/loginController");
class LoginRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', loginController_1.loginController.index);
        this.router.get('/recuperar', loginController_1.loginController.recuperar);
        this.router.post('/validar', loginController_1.loginController.validar);
    }
}
const loginRoutes = new LoginRoutes();
exports.default = loginRoutes.router;
