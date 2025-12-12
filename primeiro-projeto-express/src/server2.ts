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
