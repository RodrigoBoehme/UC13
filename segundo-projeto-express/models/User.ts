//Define a estrutura de um usuário (Model)
export class User{
    //Identificador único
    public id:number;
    //Nome do usuario
    public nome:string;
    //email do usuario
    public email:string;

    //Construtor: executa quando criamos um novo User
    constructor(id:number,nome:string,email:string){
        this.id=id;
        this.nome=nome;
        this.email=email;
    }


}
//Array que simula un banco de dados em memoria
export let usuarios:User[]=[]
