import express, {json} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import {dirname, join} from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import authRouter from './apis/v1/routes/authRoutes.js'
import caseRouter from './apis/v1/routes/caseFilesRoutes.js'
import {readFile} from 'fs/promises';
import basicAuth from 'express-basic-auth';


dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express()

const corsOptions = ['localhost:3000', process.env.ALLOWED_URL, ]
const host = '0.0.0.0';

// const server =  http.createServer(app);

// const io = new Server(server, {
//     cors: {
//         // origin: "http://localhost:3000"
//         origin: ["http://localhost:3000", "http://localhost:4000"]

//     }
    
// });



const newSwag = JSON.parse(
    await readFile(new URL('./swagger-output.json', import.meta.url))
)


app.use(cors(corsOptions));
app.use(json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', express.static(join(__dirname, 'public')))

app.use('/api/auth', authRouter);
app.use('/api/cases', caseRouter);
// app.use('/docs', swaggerUi.serve, swaggerUi.setup(newSwag, {explorer:true}));

app.use('/docs', basicAuth({
    users: {'deevairlopar': '%Q6%"7/#?4PuwX#3'},
    challenge: true
}), swaggerUi.serve, swaggerUi.setup(newSwag, {explorer:true}))


app.get('/home', (req, res)=>{
    res.send("Hello World")
})


server.listen(process.env.PORT,host || 8080, (err)=>{
    if (err) {
        console.log("ERROR OCCURED".err)
    }
    console.log(`Server is choking on port ${process.env.PORT}`)
})