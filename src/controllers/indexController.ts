import { Request,Response } from "express";
class IndexController{
    public index(req:Request,res:Response){
        res.render('index/index')
        req.statusCode=200;
    }
    
}
export const indexController= new IndexController();