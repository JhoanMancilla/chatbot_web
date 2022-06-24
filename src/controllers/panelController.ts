import { Request,Response } from "express";
class PanelController{
    public index(req:Request,res:Response){
        console.log("estoy en el serv");
        res.render('panel/index')
        req.statusCode=200;
    }

    public listar(req:Request,res:Response){
        res.render('panel/listar')
        req.statusCode=200;
    }
    public editar(req:Request,res:Response){
        res.render('panel/editarPregunta')
        req.statusCode=200;
    }
    public agregar(req:Request,res:Response){
        res.render('panel/agregar')
        req.statusCode=200;
    }
    public agregarUsuario(req:Request,res:Response){
        res.render('panel/agregarUsuario')
        req.statusCode=200;
    }
    
}
export const panelController= new PanelController();