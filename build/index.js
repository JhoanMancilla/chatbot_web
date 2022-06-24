"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const express_session_1 = __importDefault(require("express-session"));
//DB
const models_1 = __importDefault(require("./models"));
//Routes
const indexRoute_1 = __importDefault(require("./routes/indexRoute"));
const loginRoute_1 = __importDefault(require("./routes/loginRoute"));
const panelRoute_1 = __importDefault(require("./routes/panelRoute"));
const pruebaRoute_1 = __importDefault(require("./routes/pruebaRoute"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(express_1.default.json());
        this.app.set('view engine', 'pug');
        this.app.set('views', './resource/views');
        this.app.use(express_1.default.static(path_1.default.join(__dirname, '/../public')));
        this.app.use((0, morgan_1.default)('dev'));
        this.app.disable('etag');
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, express_session_1.default)({
            secret: "987f4bd6d4315c20b2ec70a46ae846d19d0ce563450c02c5b1bc71d5d580060b",
            saveUninitialized: false,
            resave: false,
        }));
    }
    routes() {
        this.app.use("/", indexRoute_1.default);
        this.app.use("/login", loginRoute_1.default);
        this.app.use("/panel", panelRoute_1.default);
        this.app.use("/api/bot", pruebaRoute_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log("Estoy en el puerto " + this.app.get('port'));
        });
    }
}
models_1.default.sequelize.sync().then(() => {
    const server = new Server();
    server.start();
});
