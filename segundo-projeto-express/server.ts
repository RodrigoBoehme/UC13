//Importa o express e o tipo de  application
import express,{Application} from "express"

//Importa as rotas de usuarios
import userRouter from "./routes/UserRoutes"

//Cria a aplicação express
const app: Application=express()
