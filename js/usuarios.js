import { actualizarUsuarios, eliminarUsuarios, obtainUsuarios } from "../apiConnection/consumeApi.js";


export async function actualizarUsuario(u_id){
    abrirModalusu(); 
    const usuarios = await obtainUsuarios();
    for (const usuario of usuarios) {
        if (usuario.u_id == u_id) {
            document.getElementById('Mid_usu').value = usuario.u_id;
            document.getElementById('MNombre_usu').value = usuario.u_nombre;
            document.getElementById('MApellido_usu').value = usuario.u_apellido;
            document.getElementById('MDireecion_usu').value = usuario.u_direccion;
            document.getElementById('Mcorreo_usu').value = usuario.u_correo;
            document.getElementById('MUsua_usu').value = usuario.u_usuario;
            document.getElementById('Mcontra_usu').value = usuario.u_contraseña;
            document.getElementById('Mtipo_acc').value = usuario.u_tipoAcceso;

        }
    }

}
function abrirModalusu() {
  var modal = document.getElementById("modalUsario");
  modal.style.display = "block";
}
export function cerrarModalUsu() {
  console.log("Cerrando modal..."); 
  var modal = document.getElementById("modalUsario");
  modal.style.display = "none";
}
const modalActualizarUsu = document.getElementById("formEditarUsuario");

modalActualizarUsu.addEventListener("submit", async function (e) {
    e.preventDefault();   
        //u_id , u_nombre,  u_apellido, u_correo,u_direccion,u_usuario,u_contraseña,u_tipoAcceso 
    const usuarioActualizado = {
        u_id: document.getElementById('Mid_usu').value,
        u_nombre: document.getElementById('MNombre_usu').value,
        u_apellido: document.getElementById('MApellido_usu').value,
        u_correo: document.getElementById('MDireecion_usu').value,
        u_direccion: document.getElementById('Mcorreo_usu').value,
        u_usuario: document.getElementById('MUsua_usu').value,
        u_contraseña: document.getElementById('Mcontra_usu').value,
        u_tipoAcceso: document.getElementById('Mtipo_acc').value,

    };

    const resultado = await actualizarUsuarios(usuarioActualizado);

    if (resultado) {
        Swal.fire({
        icon: 'success',
        title: 'Usuario Actualizado',
        text: 'El Usuario ha sido Actualizado con éxito.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3085d6'
    }).then(() => {
        window.location.href = 'index.html?seccion=6';    
    });

    } else {
        Swal.fire({
                icon: 'error',
                title: 'Ocurrio un error',
                text: 'Error al Actualizar Usuario',
                confirmButtonText: 'Reintentar',
                confirmButtonColor: '#3085d6'
            });

    }

});
//eliminar proveedor
export async function eliminarUsu(){
    let idUsu= usuarioEliminar;
    let encontrado = false;
    const usuarios = await obtainUsuarios();
    for (const usuario of usuarios) {
        if (usuario.u_id == idUsu) {
           encontrado = true;
        }
    }
    
        const resultado = await eliminarUsuarios(idUsu);
        if (resultado) {
                Swal.fire({
                icon: 'success',
                title: 'Usuario Eliminado',
                text: 'El Usuario ha sido eliminado con éxito.',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#3085d6'
            }).then(() => {
                window.location.href = 'index.html?seccion=6';    
            });

        } else {
            Swal.fire({
                    icon: 'error',
                    title: 'Ocurrio un error',
                    text: 'Error al Usuario el Cliente',
                    confirmButtonText: 'Reintentar',
                    confirmButtonColor: '#3085d6'
                });

        }
    


}      let usuarioEliminar;
       export  function abrirModalEliUsu(u_id) {
        var modal = document.getElementById("modalEliminarUsuario");
        modal.style.display = "block";
        usuarioEliminar = u_id;
        }
        export function cerrarModalEliUsu() {
        console.log("Cerrando modal..."); 
        var modal = document.getElementById("modalEliminarUsuario");
        modal.style.display = "none";
        }




