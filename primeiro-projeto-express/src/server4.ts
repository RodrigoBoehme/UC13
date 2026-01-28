//Import o framework Express (que é o responsavel pelas rotas mais simplificadas)
import express, { Request, Response, NextFunction } from "express";

//Cria a aplicação Express
const app = express();

//Middleware nativo do Express para ler o JSON
app.use(express.json());

// Tipagem do objeto Tarefa

type Tarefa = {
  id: number;
  titulo: string;
  concluida: boolean;
};
//"""Banco de dados """ em memoria(array)para fins didaticos
const tarefas: Tarefa[] = [
  { id: 1, titulo: "Procurar professor de inglês", concluida: false },
  { id: 2, titulo: "Estudar Express", concluida: true },
];
//Middleware global de LOG (ele registra informações sobre cada requisição)
app.use((req: Request, rs: Response, next: NextFunction) => {
  //Mostra no terminal o metodo e a URL acessada
  console.log(`[LOG] ${req.method} ${req.url}`)

  //Libera o fluxo para o proximo middleware/rota
  next()

});
//Middleware de validação (quando trabalharmos com o POST)
function validarTitulo(req:Request,res:Response,next:NextFunction){
    //Pega o Titulo enviado pelo cliente no corpo da requisição
    const {titulo}=req.body
    //Se o titulo não existir ou se estiver vazio é erro do cliente
    if(!titulo||String(titulo).trim()===""){
          //Retorna 400 (Bad request) e encerra a requisição com return
          return res.status(400).json({erro: "O campo 'Titulo' é obrigatório"})
    }
    //Se tudo está certo, libera para a rota continuar
    next()
}
//GET /taregas (com query de filtro)
app.get("/tarefas",(req:Request,res:Response)=>{
    // Pega a query concluida (que pode vir como "true" ou "false")
    const {concluida}=req.query
    //Se o cluente NÂO mandou query, devolvemos todas as tarefas
    if(concluida===undefined){
        //200 = OK (consulta bem sucedida)
        return res.status(200).json(tarefas)

    }
    // Converte a string "true" / "false" em boolean real
    const concluidaBool =String(concluida)==="true"
    //Filtra as tarefas conforme o boolean
    const filtradas=tarefas.filter((t)=> t.concluida===concluidaBool)

    //Retorna 200 com a lista filtrada
    return res.status(200).json(filtradas)
})
//GET /tarefas/:id (com params)
app.get("/tarefas/:id",(req:Request,res:Response)=>{
    //Pega o id que veio na URL: /tarefa/10 -> id= params
    const {id}=req.params

    //Converte o id para número
    const idNumero=Number(id)

    //Procura a tarefa no "array"
    const tarefa=tarefas.find((t)=>t.id===idNumero)    
    //Se não encontrou, retorna 404
    if(!tarefa){
        return res.status(404).json({erro: "Tarefa não encontrada"})

    }
    //Se encontrou, retorna 200, com a tarefa
    return res.status(200).json(tarefa)
})
//POST /tarefas (com body) + validação via middleware
app.post("/tarefas",(req:Request,res:Response)=>{
    //Pega o titulo do body (ja foi validado pelo middleware)
    const {titulo}=req.body

    //Cria um novo id vaseado no tamanho do array
    const novoId=tarefas.length>0?tarefas[tarefas.length-1].id+1:1
    /* Se a condição for verdadeira -> usa o valor após ? Se for falsa -> usa o valor após : */
    
    //Monta o objeto da nova tarefa
    const novaTarefa:Tarefa={
        id: novoId,
        titulo: String(titulo),
        concluida:false
    }
    //Insere a tarefa no Array (lando muito distantemente INSERT no banco)
    tarefas.push(novaTarefa)
  
    //Retorna 201 (Created) com o objeto criado
    return res.status(201).json(novaTarefa)
})
