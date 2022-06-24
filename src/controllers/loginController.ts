import { Request,Response } from "express";
import db from '../models';
import {QueryTypes} from 'sequelize';

class LoginController{
    public index(req:Request,res:Response){
        res.render('login/index')
        console.log("cristian")
        req.statusCode=200;
    }
    public recuperar(req:Request,res:Response){
        res.render('login/recuperar');
        req.statusCode=200;
    }
    public async validar(req:Request,res:Response){
        try{
            const admin = await db.sequelize.query("SELECT * FROM Personas as p inner join Administradors a on p.id=a.id where p.correo=:email and a.clave=:password",{
                replacements:  {email:req.body.usuario,password:req.body.clave} ,
                type: QueryTypes.SELECT
            });
            if(admin[0].id){
                
                res.redirect('/../panel');
            }
        }catch(err) {
            res.redirect('/');
        }
    }
    
}
export const loginController= new LoginController();