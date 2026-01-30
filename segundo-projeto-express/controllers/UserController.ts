import { Request, Response } from "express";

//Importa o Model User e a array
import { User, usuarios } from "../models/User";

//Controller responsavel pelas regras de negocio

export class UserController {
  //Metodo para criar um usuario
  createUser(req: Request, res: Response): Response {
    //Desestrutura os dados vindos do corpo da requisição
    const { id, nome, email } = req.body;

    //Validação simples de dados
    if (!id || !nome || !email) {
      return res
        .status(400)
        .json({ mensagem: "Id , Nome, email precisam ser informados" });
    }
    //Cria um novo usuario usando o model
    const usuario = new User(id, nome, email);
    //Adiciona o usuario no array
    usuarios.push(usuario);
    //retorna a resposta de sucesso
    return res
      .status(201)
      .json({ mensagem: "Usuário criado com sucesso! ", usuario: usuario });
  }
  //Metodo paara listar todos os usuarios
  listAllUsers(req: Request, res: Response): Response {
    //retorna o array de usuarios
    return res.status(200).json({
      users: usuarios,
    });
  }
  //Metodo para atualizar um usuario
  updateUser(req: Request, res: Response): Response {
    //Obtem o id da url e converte em number
    const id: number = Number(req.params.id);
    //Dados que serão atualizados
    const { nome, email } = req.params;
    //Validação dos campo obrigatorios
    if (!nome || !email) {
      return res.status(400).json({
        mensage: "Nome e e-mail sçao obrigatórios!",
      });
    }
    //Procura o usuario pelo Id
    let usuario = usuarios.find((user) => user.id === id);
    //se não encontrar, retorna erro
    if (!usuario) {
      return res.status(404).json({ 
        mensagem: "Usuario não encontrado!" 
    });
    }

    //atualiza os dados
    usuario.nome=String(nome);
    usuario.email=String(email);

    //retorna 
    return res.status(200).json({
        mensagem:"Usuario atualizado com sucesso!",
        usuario_atualizado:usuario
    })

  }
  //Metodo para deletar um usuario
  deleteUser(req:Request,res:Response){
    const id:number=Number(req.params.id)
    let index:number=usuarios.findIndex(user=>user.id==id)
    if(index===-1){
        return res.status(404).json({mensagem:""})
    }
  }
}
