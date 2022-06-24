"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = void 0;
const models_1 = __importDefault(require("../models"));
const sequelize_1 = require("sequelize");
class LoginController {
    index(req, res) {
        res.render('login/index');
        console.log("cristian");
        req.statusCode = 200;
    }
    recuperar(req, res) {
        res.render('login/recuperar');
        req.statusCode = 200;
    }
    validar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const admin = yield models_1.default.sequelize.query("SELECT * FROM Personas as p inner join Administradors a on p.id=a.id where p.correo=:email and a.clave=:password", {
                    replacements: { email: req.body.usuario, password: req.body.clave },
                    type: sequelize_1.QueryTypes.SELECT
                });
                if (admin[0].id) {
                    res.redirect('/../panel');
                }
            }
            catch (err) {
                res.redirect('/');
            }
        });
    }
}
exports.loginController = new LoginController();
