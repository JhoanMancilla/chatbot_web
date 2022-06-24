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
exports.indexController = void 0;
const dialogFlow_1 = require("./api/dialogFlow");
const models_1 = __importDefault(require("../models"));
const sequelize_1 = require("sequelize");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class IndexController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let texto = req.body;
            try {
                let intent = yield dialogFlow_1.connection.detectIntent('chatbot-354104', '1234567', texto.text, 'es');
                console.log(intent);
                if (intent.queryResult.intent.displayName == "Saludo") {
                    res.json({ 'message': `${intent.queryResult.fulfillmentText}`, 'status': 200 });
                }
                else if (intent.queryResult.intent.displayName == "Identificar") {
                    try {
                        let pregunta;
                        if (intent.queryResult.parameters.fields.any.listValue.values.length > 1) {
                            pregunta = yield models_1.default.Pregunta.findAll({
                                where: {
                                    [sequelize_1.Op.or]: [
                                        {
                                            descripcion: {
                                                [sequelize_1.Op.like]: `%${intent.queryResult.parameters.fields.any.listValue.values[0].stringValue}%`
                                            }
                                        },
                                        {
                                            descripcion: {
                                                [sequelize_1.Op.like]: `%${intent.queryResult.parameters.fields.any.listValue.values[1].stringValue}%`
                                            }
                                        }
                                    ]
                                }
                            });
                        }
                        else {
                            pregunta = yield models_1.default.Pregunta.findAll({
                                where: {
                                    descripcion: {
                                        [sequelize_1.Op.like]: `%${intent.queryResult.parameters.fields.any.listValue.values[0].stringValue}%`
                                    }
                                }
                            });
                        }
                        if (pregunta != "") {
                            let respuesta = yield models_1.default.Respuesta.findOne({
                                where: {
                                    pregunta: {
                                        [sequelize_1.Op.eq]: pregunta[0].id
                                    }
                                }
                            });
                            if (respuesta != null) {
                                res.json({ 'message': `${respuesta.description}`, 'status': 200 });
                            }
                            else {
                                res.json({ 'message': "La pregunta aun esta en revision", 'status': 200 });
                            }
                        }
                        else if (pregunta == "" && req.headers["x-access-token"] != undefined) {
                            let token = req.headers["x-access-token"];
                            let tok = jsonwebtoken_1.default.verify(token, "privateKey");
                            let consulta = models_1.default.Consulta.build({
                                cliente: tok.id,
                                estado: "EN REVISION"
                            });
                            yield consulta.save();
                            models_1.default.Pregunta.create({
                                descripcion: texto.text,
                                consulta: consulta.id
                            });
                            res.json({ 'message': "Consulta almacenada correctamente", 'status': 200 });
                        }
                        else {
                            let intent = yield dialogFlow_1.connection.detectIntent('chatbot-354104', '1234567', 'sin respuesta', 'es');
                            res.json({ 'message': `${intent.queryResult.fulfillmentText}.Registrate por favor, escribe:nombre apellido,correo,codigo o 000000 y reenvia tu consulta`, 'status': 200 });
                        }
                    }
                    catch (e) {
                        console.log(e);
                        res.json({ 'message': "Tuvimos un error en tu busqueda", 'status': 200 });
                    }
                }
                else if (intent.queryResult.intent.displayName == "Registro") {
                    try {
                        let cliente = models_1.default.Persona.build({
                            nombre: intent.queryResult.parameters.fields['given-name'].stringValue,
                            apellido: intent.queryResult.parameters.fields['last-name'].listValue.values[0].stringValue,
                            correo: intent.queryResult.parameters.fields['email'].stringValue,
                            tipo: 'CLIENTE'
                        });
                        yield cliente.save();
                        models_1.default.Cliente.create({
                            id: cliente.id,
                            codigo: intent.queryResult.parameters.fields.codigo.numberValue
                        });
                        var token = jsonwebtoken_1.default.sign({ id: cliente.id }, "privateKey", { expiresIn: 84600 });
                        res.json({ 'message': "Registro exitoso proceda a realizar su consulta", 'status': 200, 'token': token });
                    }
                    catch (e) {
                        console.log(e);
                        res.json({ 'message': "Esto correo ya fue registrado", 'status': 200 });
                    }
                }
                else if (intent.queryResult.intent.displayName == "leer_nombre") {
                    res.json({ 'message': `${intent.queryResult.fulfillmentText}`, 'status': 200 });
                }
            }
            catch (err) {
                console.log(err);
                let intent = yield dialogFlow_1.connection.detectIntent('chatbot-354104', '1234567', 'sin respuesta', 'es');
                res.json({ 'message': `${intent.queryResult.fulfillmentText}`, 'status': 200 });
            }
        });
    }
}
exports.indexController = new IndexController();
