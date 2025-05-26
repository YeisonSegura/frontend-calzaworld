import { insertarUsuario } from "../apiConnection/consumeApi.js";
import { obtainUsuarios } from "../apiConnection/consumeApi.js";

const formRegistro = document.getElementById("registroForm");

formRegistro.addEventListener("submit", async function (e) {
    e.preventDefault();

    let r_contraseña1 = document.getElementById('r-contraseña1').value;
    let r_contraseña2 = document.getElementById('r-contraseña2').value;

    if (r_contraseña1 !== r_contraseña2) {
    Swal.fire({
        icon: 'error',
        title: 'Contraseñas no coinciden',
        text: 'Las contraseñas ingresadas deben ser iguales.',
        confirmButtonText: 'Intentar de nuevo',
        confirmButtonColor: '#d33'
    });
    return;
}

    let r_id = Number(document.getElementById('r-id').value);
    let r_usuario = document.getElementById('r-usuario').value;

    const listaUsuarios = await obtainUsuarios();

    for (const usuario of listaUsuarios) {
    if (usuario.u_id == r_id) {
        Swal.fire({
            icon: 'warning',
            title: 'ID duplicado',
            text: 'Ya existe un usuario registrado con este ID.',
            confirmButtonText: 'Verificar',
            confirmButtonColor: '#f39c12'
        });
        return;
    }
    }

    for (const usuario of listaUsuarios) {
        if (usuario.u_usuario == r_usuario) {
            Swal.fire({
                icon: 'warning',
                title: 'Usuario ya registrado',
                text: 'El nombre de usuario ya está en uso. Elige uno diferente.',
                confirmButtonText: 'Cambiar usuario',
                confirmButtonColor: '#f39c12'
            });
            return;
        }
    }

    const nuevoUsuario = {
        u_id: r_id,
        u_nombre: document.getElementById('r-nombre').value,
        u_apellido: document.getElementById('r-apellido').value,
        u_correo: document.getElementById('r-correo').value,
        u_direccion: document.getElementById('r-direccion').value,
        u_usuario: r_usuario,
        u_contraseña: r_contraseña1,
        u_tipoAcceso: "restringido"
    };

    const resultado = await insertarUsuario(nuevoUsuario);

        if (resultado) {
        Swal.fire({
            icon: 'success',
            title: '¡Registro exitoso!',
            text: 'El usuario ha sido registrado correctamente.',
            confirmButtonText: 'Continuar',
            confirmButtonColor: '#3085d6'
        }).then(() => {
            limpiarFormulario();
            setTimeout(() => {
                window.location.href = "login.html";
            }, 500);
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error al registrar',
            text: 'Hubo un problema al registrar el usuario. Inténtalo nuevamente.',
            confirmButtonText: 'Reintentar',
            confirmButtonColor: '#d33'
        });
    }


    function limpiarFormulario() {
        document.getElementById('r-id').value = '';
        document.getElementById('r-nombre').value = '';
        document.getElementById('r-apellido').value = '';
        document.getElementById('r-correo').value = '';
        document.getElementById('r-direccion').value = '';
        document.getElementById('r-usuario').value = '';
        document.getElementById('r-contraseña1').value = '';
        document.getElementById('r-contraseña2').value = '';
    }
});
