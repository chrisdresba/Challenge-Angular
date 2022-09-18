export class Usuario {
    usuario:string = '';
    contraseña:string ='';

    iniciar(nombre:string,clave:string){
        this.usuario = nombre
        this.contraseña = clave;
    }
}
