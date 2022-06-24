import { Router } from "express";
import { panelController } from "../controllers/panelController";
class PanelRoutes{
    public router : Router = Router();
    constructor(){
        this.config();
    }
    config():void{
        this.router.get('/',panelController.index);
        this.router.get('/listar',panelController.listar);
        this.router.get('/agregar',panelController.agregar);
        this.router.get('/editarPregunta',panelController.editar);
        this.router.get('/agregarUsuario',panelController.agregarUsuario);
    }
}
const panelRoutes = new PanelRoutes();
export default panelRoutes.router;