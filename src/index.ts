import express,{Application} from 'express';
import morgan from 'morgan';
import path from 'path';
import session from 'express-session';
//DB
import db from './models';
//Routes
import indexRoute from './routes/indexRoute';
import loginRoute from './routes/loginRoute';
import panelRoute from './routes/panelRoute';
import pruebaRoute from './routes/pruebaRoute';

class Server {
    public app: Application;
    constructor(){
        this.app=express();
        this.config();
        this.routes();
    }
    config():void{
        this.app.set('port',process.env.PORT || 3000);
        this.app.use(express.json());
        this.app.set('view engine','pug');
        this.app.set('views','./resource/views');
        this.app.use(express.static(path.join(__dirname, '/../public')));
        this.app.use(morgan('dev'));
        this.app.disable('etag');
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(session({
            secret: "987f4bd6d4315c20b2ec70a46ae846d19d0ce563450c02c5b1bc71d5d580060b",
            saveUninitialized: false,
            resave: false,
          }));
          
    }
    routes():void{
        this.app.use("/", indexRoute);
        this.app.use("/login", loginRoute);
        this.app.use("/panel", panelRoute);
        this.app.use("/api/bot",pruebaRoute);
    }
    start():void{
        this.app.listen(this.app.get('port'), ()=>{
            console.log("Estoy en el puerto " + this.app.get('port'));
        })
    }
}
db.sequelize.sync().then(()=>{
    const server= new Server();
    server.start();
})