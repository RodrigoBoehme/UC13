/*
import express,{Request,Response}from "express";

//criando a aplicação 
const app= express()
const PORT=3000

//Middlewere responsavel por permitir que o express leia JSON no corpo da requisição
app.use(express.json())

//GET -> Buscar/Consultar
app.get("/usuarios/:id",(req:Request,res:Response)=>{
    //req.params contém os valores que vêm da URL
    //Pegamos o "id" do usuario
    const id=req.params.id
    //Retorna uma mensagem usando o ID recebido
    res.json({mensagem:`Buscando usuário ID${id}`})
})

/////////////////////////
//Post
/////////////////////////

//Metodo para criar um usuario
app.post("/usuarios",(req:Request,res:Response)=>{
    const dados=req.body //JSON enviado pelo cliente
    res.json({
        mensage:"Usuario criado com sucesso!",
        dados_revebidos:dados
    })
})

app.put("/usuarios/:id",(req:Request,res:Response)=>{
  const id=req.params.id
  const novosDados=req.body
  res.json({
    mensagem:`Usuarios ${id} atualizado por PUT`,
    novos_dados:novosDados
  })
})

/////////////////////////
// Patch-> Atualiza APENAS ALGUNS CMAPOS (Parcial)
/////////////////////////
  app.patch("usuarios/:id",(req:Request,res:Response)=>{
    const id=req.params.id
    const dadosParcias=req.body

    res.json({
        mensagem:`Usuatio ${id} atualizado parcialmente (PATCH)`,
        alteracoes:dadosParcias
    })
})
////////////////////////////////////////////////
// Delete remove um registro
////////////////////////////////////////////////

app.delete("/usuarios/:id",(req:Request,res:Response)=>{
  const id= req.params.id
  res.json({
    mensagem:`Usuario ${id} removido com sucesso!`
  })
})

////////////////////////////////////////////////
//Iniciar o Servidor
////////////////////////////////////////////////
app.listen(PORT,()=>{
    console.log(`Servidor rodando em https://localhost:${PORT}`)
})
*/

// Importando o framework Express
import express, {
  Request,//Tipo Que representa  a resposta do servidor
  Response,//
  NextFunction//Tipo usado em middlewares para liberar a execução

} from "express";
// Criação do server
//a variavel app representa o servidor
const app=express()
//Porta onde o servidor ira rodar
const PORT=3000

//Middleware nativo do Express
//Permite que o servidor enta JSON enviado no corpo da requisição(sem esse cara o req.body seria undefined)
app.use(express.json())

//cria uma array de strings
//simula um banco de dados em memoria

const usuario:string[]=[]

//Função middleware personalizada
//Ela sera executada ANTES das rotas
function logMiddleware(
  req:Request,//Dados da requisição
  res:Response,//Resposta do servidor
  next:NextFunction//Função que livera o fluxo
){
  //Exibe no terminal o método HTTP e a rota acessada
  console.log(`${req.method} ${req.url}`)
  //Libera a requisição para continuar o fluxo
}