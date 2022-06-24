"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.panelController = void 0;
class PanelController {
    index(req, res) {
        console.log("estoy en el serv");
        res.render('panel/index');
        req.statusCode = 200;
    }
    listar(req, res) {
        res.render('panel/listar');
        req.statusCode = 200;
    }
    editar(req, res) {
        res.render('panel/editarPregunta');
        req.statusCode = 200;
    }
    agregar(req, res) {
        res.render('panel/agregar');
        req.statusCode = 200;
    }
    agregarUsuario(req, res) {
        res.render('panel/agregarUsuario');
        req.statusCode = 200;
    }
}
exports.panelController = new PanelController();
