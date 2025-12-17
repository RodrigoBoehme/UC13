import  express,{Request,Response,NextFunction} from "express";
const app=express();
const PORT=3000

app.use(express.json)
const jooj:string[]=[]

function logMiddleware(req:Request,res:Response,next:NextFunction){
    console.log(`${req.method}  ${req.url}`);
    next();

}
app.use(logMiddleware)

app.get("/Dream",(req:Request,res:Response)=>{
    res.json({total:jooj.length,time:jooj})
})

app.post("/Dream",(req:Request,res:Response)=>{
    const nome=req.body.name
    if(!nome||nome.trim()===""){
        return res.status(400).json({
            erro:"Nome é obrigatorio"
        })
    }
    jooj.push(nome)
    res.json({
        mensagem:"Jogador adicionado ao time",
        time:jooj
    })
})
app.put("/Dream/:id",(req:Request,res:Response)=>{
  const id=Number(req.params.id)
  const novoNome=req.body.nome
  if(!jooj[id]){
    return res.status(404).json({
        erro:"Jogador nao encontrado"
    })
  }
  jooj[id]=novoNome
  res.json({
    mensagem:"Jogador atualizado com sucesso",
    time:jooj
  })
})

app.delete("/Dream/:id",(req:Request,res:Response)=>{
    const id=Number(req.params.id)
    if(!jooj[id]){
        return res.status(404).json({
            erro:"Usuario Nao encontrado"
        })
    }
    jooj.splice(id,1)
    res.json({
        mensagem:"Usuario removido com sucesso!",
        time:jooj
    })
})

app.listen(PORT,()=>{
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})