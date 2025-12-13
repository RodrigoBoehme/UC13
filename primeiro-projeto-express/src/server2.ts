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