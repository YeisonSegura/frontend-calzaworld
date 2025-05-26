import { insertarClientes,actualizarClientes,eliminarClientes,obtainClientes,obtainVentas } from "../apiConnection/consumeApi.js";
//import { obtainProveedores,obtainProductos } from "../apiConnection/consumeApi.js";


const formularioClientes = document.getElementById("formularioClientes");

formularioClientes.addEventListener("submit", async function (e) {
    e.preventDefault();
    let c_id = document.getElementById('c_id').value;

    const listaclientes = await obtainClientes();

    for (const cliente of listaclientes) {
        if (cliente.c_id_cliente == c_id) {
            Swal.fire({
                icon: 'error',
                title: 'Ya existe un cliente con este ID',
                text: 'Verifica tus datos e intenta nuevamente.',
                confirmButtonText: 'Reintentar',
                confirmButtonColor: '#3085d6'
            });
            return;
        }
    }
   //c_id_cliente,c_nombre_cliente,c_apellido_cliente,c_direccion,c_telefono,c_correo
    const nuevoCliente = {
        c_id_cliente: c_id,
        c_nombre_cliente: document.getElementById('c_nombre').value,
        c_apellido_cliente: document.getElementById('c_apellido').value,
        c_direccion: document.getElementById('c_direccion').value,
        c_telefono: document.getElementById('c_telefono').value,
        c_correo: document.getElementById('c_correo').value,

    };

    const resultado = await insertarClientes(nuevoCliente);

    if (resultado) {
        Swal.fire({
        icon: 'success',
        title: 'Cliente agregado correctamente',
        text: 'El cliente ha sido registrado con éxito.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3085d6'
    }).then(() => {
        limpiarFormulario();
        window.location.href = 'index.html?seccion=4';    
    });

    } else {
        Swal.fire({
                icon: 'error',
                title: 'Ocurrio un error',
                text: 'Error al registrar cliente',
                confirmButtonText: 'Reintentar',
                confirmButtonColor: '#3085d6'
            });

    }

    function limpiarFormulario() {
        document.getElementById('c_id').value = '';
        document.getElementById('c_nombre').value = '';
        document.getElementById('c_apellido').value = '';
        document.getElementById('c_direccion').value = '';
        document.getElementById('c_telefono').value = '';
        document.getElementById('c_correo').value = '';
    }
});


export async function actualizarClient(idcliente){
    abrirModalCli(); 
    const clientes = await obtainClientes();
    for (const cliente of clientes) {
        //c_id_cliente,c_nombre_cliente,c_apellido_cliente,c_direccion,c_telefono,c_correo 
        if (cliente.c_id_cliente == idcliente) {
            document.getElementById('Mcl_id').value = cliente.c_id_cliente;
            document.getElementById('Mcl_nombre').value = cliente.c_nombre_cliente;
            document.getElementById('Mcl_apellido').value = cliente.c_apellido_cliente;
            document.getElementById('Mcl_direccion').value = cliente.c_direccion;
            document.getElementById('Mcl_telefono').value = cliente.c_telefono;
            document.getElementById('Mcl_correo').value = cliente.c_correo;
           
        }
    }

}
function abrirModalCli() {
  var modal = document.getElementById("modalCliente");
  modal.style.display = "block";
}
export function cerrarModalcli() {
  console.log("Cerrando modal..."); 
  var modal = document.getElementById("modalCliente");
  modal.style.display = "none";
}
const modalActualizarCliente = document.getElementById("modal_actualizar_cliente");

modalActualizarCliente.addEventListener("submit", async function (e) {
    e.preventDefault();   
            //c_id_cliente,c_nombre_cliente,c_apellido_cliente,c_direccion,c_telefono,c_correo 
    const clienteActualizado = {
        c_id_cliente: document.getElementById('Mcl_id').value,
        c_nombre_cliente: document.getElementById('Mcl_nombre').value,
        c_apellido_cliente: document.getElementById('Mcl_apellido').value,
        c_direccion: document.getElementById('Mcl_direccion').value,
        c_telefono: document.getElementById('Mcl_telefono').value,
        c_correo: document.getElementById('Mcl_correo').value,

    };

    const resultado = await actualizarClientes(clienteActualizado);

    if (resultado) {
        Swal.fire({
        icon: 'success',
        title: 'Cliente Actualizado',
        text: 'El Cliente ha sido Actualizado con éxito.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3085d6'
    }).then(() => {
        window.location.href = 'index.html?seccion=4';    
    });

    } else {
        Swal.fire({
                icon: 'error',
                title: 'Ocurrio un error',
                text: 'Error al Actualizar Cliente',
                confirmButtonText: 'Reintentar',
                confirmButtonColor: '#3085d6'
            });

    }

});
//eliminar proveedor
export async function eliminarClien(){
    let idcliente= clienteaeliminar;
    let encontrado = false;
    const ventas = await obtainVentas();
    for (const venta of ventas) {
        if (venta.v_id_cliente == idcliente) {
           encontrado = true;
        }
    }
    if(encontrado == true){
        Swal.fire({
            icon: 'error',
            title: 'No se puede eliminar el cliente',
            text: 'El  cliente tiene productos asociados.',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#3085d6'
        }).then(() => {
            window.location.href = 'index.html?seccion=4';    
        });

    }else{
        const resultado = await eliminarClientes(idcliente);
        if (resultado) {
                Swal.fire({
                icon: 'success',
                title: 'Cliente Eliminado',
                text: 'El cliente ha sido eliminado con éxito.',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#3085d6'
            }).then(() => {
                window.location.href = 'index.html?seccion=4';    
            });

        } else {
            Swal.fire({
                    icon: 'error',
                    title: 'Ocurrio un error',
                    text: 'Error al Eliminar el Cliente',
                    confirmButtonText: 'Reintentar',
                    confirmButtonColor: '#3085d6'
                });

        }
    } 


}      let clienteaeliminar;
       export  function abrirModalEliClie(c_id_cliente) {
        var modal = document.getElementById("modalEliminarCliente");
        modal.style.display = "block";
        clienteaeliminar = c_id_cliente;
        }
        export function cerrarModalEliClie() {
        console.log("Cerrando modal..."); // Esto se imprime cuando se hace clic en la "X"
        var modal = document.getElementById("modalEliminarCliente");
        modal.style.display = "none";
        }





