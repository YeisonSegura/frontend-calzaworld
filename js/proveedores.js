
import { insertarProveedores,actualizarProveedores,eliminarProveedor,obtainProveedores,obtainProductos } from "../apiConnection/consumeApi.js";


const formRegistro = document.getElementById("formularioProveedores");

formRegistro.addEventListener("submit", async function (e) {
    e.preventDefault();
    let p_id = document.getElementById('po_id').value;

    const listaproveedores = await obtainProveedores();

    for (const proveedor of listaproveedores) {
        if (proveedor.p_id_proveedor == p_id) {
            Swal.fire({
                icon: 'error',
                title: 'Ya existe un proveedor con este ID',
                text: 'Verifica tus datos e intenta nuevamente.',
                confirmButtonText: 'Reintentar',
                confirmButtonColor: '#3085d6'
            });
            return;
        }
    }
   
    const nuevoProveedor = {
        p_id_proveedor: p_id,
        p_nombre_proveedor: document.getElementById('po_nombre').value,
        p_apellido_proveedor: document.getElementById('po_apellido').value,
        p_empresa: document.getElementById('po_empresa').value,
        p_telefono: document.getElementById('po_telefono').value,
        p_correo: document.getElementById('po_correo').value,

    };

    const resultado = await insertarProveedores(nuevoProveedor);

    if (resultado) {
        Swal.fire({
        icon: 'success',
        title: 'Proveedor agregado correctamente',
        text: 'El proveedor ha sido registrado con éxito.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3085d6'
    }).then(() => {
        limpiarFormulario();
        window.location.href = 'index.html?seccion=3';    
    });

    } else {
        Swal.fire({
                icon: 'error',
                title: 'Ocurrio un error',
                text: 'Error al registrar proveedor',
                confirmButtonText: 'Reintentar',
                confirmButtonColor: '#3085d6'
            });

    }

    function limpiarFormulario() {
        document.getElementById('po_id').value = '';
        document.getElementById('po_nombre').value = '';
        document.getElementById('po_apellido').value = '';
        document.getElementById('po_empresa').value = '';
        document.getElementById('po_telefono').value = '';
        document.getElementById('po_correo').value = '';
    }
});


export async function actualizarProveedor(idproveedor){
    abrirModal(); 
    const proveedores = await obtainProveedores();
    for (const proveedor of proveedores) {
        if (proveedor.p_id_proveedor == idproveedor) {
            document.getElementById('ac_po_id').value = proveedor.p_id_proveedor;
            document.getElementById('ac_po_nombre').value = proveedor.p_nombre_proveedor;
            document.getElementById('ac_po_apellido').value = proveedor.p_apellido_proveedor;
            document.getElementById('ac_po_empresa').value = proveedor.p_empresa;
            document.getElementById('ac_po_telefono').value = proveedor.p_telefono;
            document.getElementById('ac_po_correo').value = proveedor.p_correo;
           
        }
    }

}
function abrirModal() {
  var modal = document.getElementById("modalProveedor");
  modal.style.display = "block";
}
export function cerrarModal() {
  console.log("Cerrando modal..."); 
  var modal = document.getElementById("modalProveedor");
  modal.style.display = "none";
}
const modalActualizarProveedor = document.getElementById("modal_actualizar_proveedor");

modalActualizarProveedor.addEventListener("submit", async function (e) {
    e.preventDefault();   
    const proveedorActualizado = {
        p_id_proveedor: document.getElementById('ac_po_id').value,
        p_nombre_proveedor: document.getElementById('ac_po_nombre').value,
        p_apellido_proveedor: document.getElementById('ac_po_apellido').value,
        p_empresa: document.getElementById('ac_po_empresa').value,
        p_telefono: document.getElementById('ac_po_telefono').value,
        p_correo: document.getElementById('ac_po_correo').value,

    };

    const resultado = await actualizarProveedores(proveedorActualizado);

    if (resultado) {
        Swal.fire({
        icon: 'success',
        title: 'Proveedor Actualizado',
        text: 'El proveedor ha sido Actualizado con éxito.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3085d6'
    }).then(() => {
        window.location.href = 'index.html?seccion=3';    
    });

    } else {
        Swal.fire({
                icon: 'error',
                title: 'Ocurrio un error',
                text: 'Error al Actualizar proveeddor',
                confirmButtonText: 'Reintentar',
                confirmButtonColor: '#3085d6'
            });

    }

});
//eliminar proveedor
export async function eliminarProvee(){
    let idproveedor= proveedoraeliminar;
    let encontrado = false;
    const productos = await obtainProductos();
    for (const producto of productos) {
        if (producto.p_id_proveedor == idproveedor) {
           encontrado = true;
        }
    }
    if(encontrado == true){
        Swal.fire({
            icon: 'error',
            title: 'No se puede eliminar el proveedor',
            text: 'El proveedor tiene productos asociados.',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#3085d6'
        }).then(() => {
            window.location.href = 'index.html?seccion=3';    
        });

    }else{
        const resultado = await eliminarProveedor(idproveedor);
        if (resultado) {
                Swal.fire({
                icon: 'success',
                title: 'Proveedor Eliminado',
                text: 'El proveedor ha sido eliminado con éxito.',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#3085d6'
            }).then(() => {
                window.location.href = 'index.html?seccion=3';    
            });

        } else {
            Swal.fire({
                    icon: 'error',
                    title: 'Ocurrio un error',
                    text: 'Error al Eliminar el proveeddor',
                    confirmButtonText: 'Reintentar',
                    confirmButtonColor: '#3085d6'
                });

        }
    } 
    

}      let proveedoraeliminar;
       export  function abrirModalEliProv(p_id_proveedor) {
        var modal = document.getElementById("modalEliminarProveedor");
        modal.style.display = "block";
        proveedoraeliminar = p_id_proveedor;
        }
        export function cerrarModalEliProv() {
        console.log("Cerrando modal..."); 
        var modal = document.getElementById("modalEliminarProveedor");
        modal.style.display = "none";
        }





