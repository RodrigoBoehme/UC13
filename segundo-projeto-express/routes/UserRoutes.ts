//Importa o router do express
import {Router} from "express"

//Importa o controller
import { UserController } from "../controllers/UserController"

//Cria o objeto de rotas
const router=Router()

//Instancia o controller
const controller=new UserController()

//Rota para listar ou pegar os usuarios
router.get("/users",controller.listAllUsers)

//Rota para atualizar o usuario
router.put("/users/:id",controller.updateUser)

//Rota para criar usuario
router.post("users",controller.createUser)

//Rota para deletar usuario pelo id
router.delete("/users/:id",controller.deleteUser)
export default router