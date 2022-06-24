import { Request,Response } from "express";
import {connection} from './api/dialogFlow';
import db from '../models';
import {Op} from 'sequelize';
import jwt from 'jsonwebtoken';
class IndexController{
    public async  index(req:Request,res:Response){
        let texto =req.body;
        try{
            let intent:any = await connection.detectIntent('chatbot-354104','1234567',texto.text,'es');
            console.log(intent)
            if(intent.queryResult.intent.displayName=="Saludo"){
                res.json({'message':`${intent.queryResult.fulfillmentText}`,'status':200});
            }else if(intent.queryResult.intent.displayName=="Identificar"){
                try{
                    let pregunta;
                    if(intent.queryResult.parameters.fields.any.listValue.values.length>1){
                         pregunta= await db.Pregunta.findAll({
                            where:{
                                [Op.or]:[
                                    {
                                        descripcion: {
                                            [Op.like]:`%${intent.queryResult.parameters.fields.any.listValue.values[0].stringValue}%`
                                      }
                                    },
                                    {
                                        descripcion: {
                                        [Op.like]:`%${intent.queryResult.parameters.fields.any.listValue.values[1].stringValue}%`
                                      }
                                    }
                                  ]
                            }
                        });
                    }else{
                         pregunta= await db.Pregunta.findAll({
                            where:{
                                descripcion: {
                                    [Op.like]:`%${intent.queryResult.parameters.fields.any.listValue.values[0].stringValue}%`
                              }
                            }
                        });
                    }
                    
                    if(pregunta!=""){
                        let respuesta =await db.Respuesta.findOne({
                            where:{
                                pregunta:{
                                    [Op.eq]:pregunta[0].id
                                }
                            }
                        });
                        if(respuesta!=null){
                            res.json({'message':`${respuesta.description}`,'status':200});
                        }else{
                            res.json({'message':"La pregunta aun esta en revision",'status':200});
                        }
                    }else if (pregunta=="" && req.headers["x-access-token"]!=undefined){
                        let token:any=req.headers["x-access-token"];
                        let tok:any = jwt.verify(token,"privateKey");
                        let consulta =db.Consulta.build({
                            cliente:tok.id,
                            estado:"EN REVISION"
                        });
                        await consulta.save();
                        db.Pregunta.create({
                            descripcion:texto.text,
                            consulta:consulta.id
                        });
                        res.json({'message':"Consulta almacenada correctamente",'status':200});
                    }else{
                        let intent:any = await connection.detectIntent('chatbot-354104','1234567','sin respuesta','es');
                         res.json({'message':`${intent.queryResult.fulfillmentText}.Registrate por favor, escribe:nombre apellido,correo,codigo o 000000 y reenvia tu consulta`,'status':200});
                    }
                }catch(e){
                    console.log(e);
                    res.json({'message':"Tuvimos un error en tu busqueda",'status':200});
                }
            }else if(intent.queryResult.intent.displayName=="Registro"){
                try{
                    let cliente = db.Persona.build({
                        nombre:intent.queryResult.parameters.fields['given-name'].stringValue,
                        apellido:intent.queryResult.parameters.fields['last-name'].listValue.values[0].stringValue,
                        correo:intent.queryResult.parameters.fields['email'].stringValue,
                        tipo:'CLIENTE'
                    });
                    await cliente.save();
                    db.Cliente.create({
                        id:cliente.id,
                        codigo:intent.queryResult.parameters.fields.codigo.numberValue
                    });
                    var token = jwt.sign({ id: cliente.id }, "privateKey", { expiresIn:84600});
                    res.json({'message':"Registro exitoso proceda a realizar su consulta",'status':200,'token':token});
                }catch(e){
                    console.log(e)
                    res.json({'message':"Esto correo ya fue registrado",'status':200});
                }
            }else if(intent.queryResult.intent.displayName=="leer_nombre"){
                res.json({'message':`${intent.queryResult.fulfillmentText}`,'status':200});
            }
            
        }catch(err){
            console.log(err)
            let intent:any = await connection.detectIntent('chatbot-354104','1234567','sin respuesta','es');
            res.json({'message':`${intent.queryResult.fulfillmentText}`,'status':200});
        }
        
    }
    
}
export const indexController= new IndexController();