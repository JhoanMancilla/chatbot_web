"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const panelController_1 = require("../controllers/panelController");
class PanelRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', panelController_1.panelController.index);
        this.router.get('/listar', panelController_1.panelController.listar);
        this.router.get('/agregar', panelController_1.panelController.agregar);
        this.router.get('/editarPregunta', panelController_1.panelController.editar);
        this.router.get('/agregarUsuario', panelController_1.panelController.agregarUsuario);
    }
}
const panelRoutes = new PanelRoutes();
exports.default = panelRoutes.router;
