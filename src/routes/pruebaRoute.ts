import { Router } from "express";
import { indexController } from "../controllers/chatbotController";
class IndexRoutes{
    public router : Router = Router();
    constructor(){
        this.config();
    }
    config():void{
        this.router.post('/',indexController.index);
    }
}
const indexRoutes = new IndexRoutes();
export default indexRoutes.router;