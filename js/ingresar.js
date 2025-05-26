import { obtainUsuarios } from "../apiConnection/consumeApi.js";


document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", async function(event) {
    event.preventDefault();

    const usuariosObtained = await obtainUsuarios();
    const usuario = document.getElementById('usuario').value;
    const contraseña = document.getElementById('contraseña').value;
    let encontrado = false;
    let accesoRestringido = false;

    for (const usuarios of usuariosObtained) {
      const { u_usuario, u_contraseña, u_tipoAcceso } = usuarios;

      if (u_usuario === usuario && u_contraseña === contraseña) {
        encontrado = true;

        if (u_tipoAcceso === "Restringido") {
          accesoRestringido = true;
        }

        break;
      }
    }

    if (!encontrado) {
      Swal.fire({
        icon: 'error',
        title: 'Usuario o contraseña incorrectos',
        text: 'Verifica tus datos e intenta nuevamente.',
        confirmButtonText: 'Reintentar',
        confirmButtonColor: '#3085d6'
      });
    } else if (accesoRestringido) {
      Swal.fire({
        icon: 'warning',
        title: 'Acceso restringido',
        text: 'No tienes permiso para acceder al sistema.',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#3085d6'
      });
    } else {
      localStorage.setItem("Usuario", usuario);
      localStorage.setItem("tipoacceso", usuariosObtained.find(u => u.u_usuario === usuario).u_tipoAcceso);
      window.location.href = "index.html";
    }
  });
});
