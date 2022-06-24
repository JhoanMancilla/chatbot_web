import { Router } from "express";
import { loginController } from "../controllers/loginController";
class LoginRoutes{
    public router : Router = Router();
    constructor(){
        this.config();
    }
    config():void{
        this.router.get('/',loginController.index);
        this.router.get('/recuperar',loginController.recuperar);
        this.router.post('/validar',loginController.validar);
    }
    
        
    
}
const loginRoutes = new LoginRoutes();
export default loginRoutes.router;