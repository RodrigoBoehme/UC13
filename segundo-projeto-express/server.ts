//Importa o express e o tipo de  application
import express,{Application} from "express"

//Importa as rotas de usuarios
import userRouter from "./routes/UserRoutes"

//Cria a aplicação express
const app: Application=express()

//Define a porta do servidor
const PORT:number=3000

//Middleware que permite trabalhar com JSON
app.use(express.json())
//Informa que a aplicação usara as rotas criadas
app.use(userRouter)

//Inicializa o servidor
app.listen(PORT,()=>{
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})