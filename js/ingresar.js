import { obtainUsuarios } from "../apiConnection/consumeApi.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", async function(event) {
    event.preventDefault();

    const usuariosObtained = await obtainUsuarios();
    const usuario = document.getElementById('usuario').value;
    const contraseña = document.getElementById('contraseña').value;
    
    let usuarioEncontrado = null;

    for (const usuarios of usuariosObtained) {
      const { u_usuario, u_contraseña } = usuarios;
      if (u_usuario === usuario && u_contraseña === contraseña) {
        usuarioEncontrado = usuarios;
        break;
      }
    }

    if (!usuarioEncontrado) {
      window.Swal.fire({
        icon: 'error',
        title: 'Usuario o contraseña incorrectos',
        text: 'Verifica tus datos e intenta nuevamente.',
        confirmButtonText: 'Reintentar',
        confirmButtonColor: '#3085d6'
      });
      return;
    }

    if (usuarioEncontrado.u_tipoAcceso === "Restringido") {
      window.Swal.fire({
        icon: 'warning',
        title: 'Acceso restringido',
        text: 'No tienes permiso para acceder al sistema.',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#3085d6'
      });
      return;
    }

    localStorage.setItem("Usuario", usuarioEncontrado.u_usuario);
    localStorage.setItem("tipoacceso", usuarioEncontrado.u_tipoAcceso);
    window.location.href = "index.html";
  });
});
