class Usuario {
  private id: number = -1;
  private username: String;
  private admin: boolean = false;

  public constructor(id: number, nome: string) {
    this.id = id;
    this.username = nome;
  }
  private getAdm(): boolean {
    return this.admin;
  }

  private checkUser(user: Usuario): string {
    if (this.admin) {
      return user.toString();
    } else {
      return "Experia003";
    }
  }
  toString(): string {
    return `id: ${this.id}, nome:  ${this.username}, admin: ${this.admin}`;
  }
}
