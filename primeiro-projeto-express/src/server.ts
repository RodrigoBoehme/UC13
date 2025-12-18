/*//Importar o Express e os tipos request e Responsede ts
//Express: framework que facilita criar servidores HTTP
// Request: representa a requisição que chega do cliente
// Response: representa a resposta que vamos enviar
//
import express, { Request, Response } from "express";

//Cria uma aplicação Express
//A variável app é o nosso servidor

const app = express();

// Define a porta onde o srvidor vai rodar(3000)
const PORT = 3000;
// Middlewere para permitir que o servior leia JSON no corpo das requisiçoes
// Sem isso o req.body não funciona
app.use(express.json());
/*
Criaremos rota GET no camoinho "/"
Quando acessarmos: http:/localhost:3000/
vamos executar a função abaixo:
req=dados enviados pelo cliente
res=objetos usados para responder o cliente

app.get("/", (req: Request, res: Response) => {
  //Envia uma resposta em JSON para quem chamou a rota
  res.json({ mensagem: "Servidor Express em pleno funcionamento! 🚀" });
});

app.get("/sobre", (req: Request, res: Response) => {
  res.json({ curso: "backend", prof: "Dalvana", versao: "1.0" });
});

// Inicia o servidor e coloca ele para escutar a porta definida
app.listen(PORT, () => {
  console.log(`🔥 Servidor rodando em http://localhost:${PORT}`);
});

app.get("/hora",(req: Request, res: Response) => {
  res.json({ "hora":new Date });
});
app.get("/bemvindo/:nome",(req: Request, res: Response) => {
const nome=req.params.nome;//Captura o nome enviado na URL

  res.json({ "Bien venido":nome   });
})

*/
import  express,{Request,Response,NextFunction} from "express";
const app=express();
const PORT=3000

app.use(express.json())
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
    const nome=req.body.nome
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