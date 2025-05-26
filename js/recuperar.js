import { obtainUsuarios, actualizarUsuarios } from "../apiConnection/consumeApi.js";

const form = document.getElementById("recuperarForm");

form.addEventListener("submit", async function(event) {
  event.preventDefault();

  const usuarios = await obtainUsuarios();
  const usuarioInput = document.getElementById("usuario").value.trim();

  const usuarioEncontrado = usuarios.find(u => u.u_id == usuarioInput);

  if (!usuarioEncontrado) {
    Swal.fire({
      icon: 'error',
      title: 'Usuario no encontrado',
      text: 'Verifica el nombre de usuario.',
      confirmButtonText: 'Reintentar'
    });
    return;
  }

  const usuarioActualizado = {
    u_id: usuarioEncontrado.u_id,
    u_nombre: usuarioEncontrado.u_nombre,
    u_apellido: usuarioEncontrado.u_apellido,
    u_correo: usuarioEncontrado.u_correo,
    u_direccion: usuarioEncontrado.u_direccion,
    u_usuario: usuarioEncontrado.u_usuario,
    u_contraseña: "recuperar",
    u_tipoAcceso: usuarioEncontrado.u_tipoAcceso
  };

  const resultado = await actualizarUsuarios(usuarioActualizado);

  if (resultado) {
    Swal.fire({
      icon: 'success',
      title: 'Solicitud enviada',
      text: 'En un plazo de 72 horas se enviará una nueva contraseña a su correo.',
      confirmButtonText: 'Volver al login'
    }).then(() => {
      window.location.href = "login.html";
    });
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo actualizar la contraseña.',
      confirmButtonText: 'Cerrar'
    });
  }
});

