
import { insertarProducto,actualizarProductos,eliminarProductos,obtainProveedores,obtainVentas,obtainProductos } from "../apiConnection/consumeApi.js";


const formRegistro = document.getElementById("formularioProductos");

formRegistro.addEventListener("submit", async function (e) {
    e.preventDefault();
    let p_id = document.getElementById('i_id_proveedor').value;
    let cantidadProducto = document.getElementById('i_cantidad').value;
    const listaproveedores = await obtainProveedores();

        let proveedorExiste = false;

        for (const proveedor of listaproveedores) {
            if (`${proveedor.p_id_proveedor}` === p_id) {
                proveedorExiste = true;
                break;
            }
        }

        if (!proveedorExiste) {
            Swal.fire({
                icon: 'error',
                title: 'No existe un proveedor con este ID',
                text: 'Verifica tus datos e intenta nuevamente.',
                confirmButtonText: 'Reintentar',
                confirmButtonColor: '#3085d6'
            });
            return;
        }
         if (cantidadProducto <= 0) {    
            Swal.fire({
                icon: 'error',
                title: 'La cantidad debe ser mayor a 0',
                text: 'Verifica tus datos e intenta nuevamente.',
                confirmButtonText: 'Reintentar',
                confirmButtonColor: '#3085d6'
            });
            return;
        }

   //p_id_producto  ,p_color,p_id_proveedor ,p_cantidad,p_talla,p_marca,p_descripcion,p_precio
    const nuevoProducto = {
        p_color: document.getElementById('i_color').value,
        p_id_proveedor:p_id,
        p_cantidad: cantidadProducto,
        p_talla: document.getElementById('i_talla').value,
        p_marca: document.getElementById('i_marca').value,
        p_descripcion: document.getElementById('i_descripcion').value,
        p_precio: document.getElementById('i_precio').value,

    };

    const resultado = await insertarProducto(nuevoProducto);

    if (resultado) {
        Swal.fire({
        icon: 'success',
        title: 'Producto agregado correctamente',
        text: 'El producto ha sido registrado con éxito.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3085d6'
    }).then(() => {
        limpiarFormulario();
        window.location.href = 'index.html?seccion=2';    
    });

    } else {
        Swal.fire({
                icon: 'error',
                title: 'Ocurrio un error',
                text: 'Error al registrar un producto',
                confirmButtonText: 'Reintentar',
                confirmButtonColor: '#3085d6'
            });

    }

    function limpiarFormulario() {
        document.getElementById('i_id_proveedor').value = '';
        document.getElementById('i_color').value = '';
        document.getElementById('i_cantidad').value = '';
        document.getElementById('i_talla').value = '';
        document.getElementById('i_marca').value = '';
        document.getElementById('i_descripcion').value = '';
        document.getElementById('i_precio').value = '';

    }
});

   //p_id_producto  ,p_color,p_id_proveedor ,p_cantidad,p_talla,p_marca,p_descripcion,p_precio

export async function actualizarProducto(idproducto){
    abrirModalProd(); 
    const productos = await obtainProductos();
    for (const producto of productos) {
        if (producto.p_id_producto == idproducto) {
            document.getElementById('Mpr_id').value = producto.p_id_producto;
            document.getElementById('Mpr_color').value = producto.p_color;
            document.getElementById('Mpr_proveedor').value = producto.p_id_proveedor;
            document.getElementById('Mpr_cantidad').value = producto.p_cantidad;
            document.getElementById('Mpr_talla').value = producto.p_talla;
            document.getElementById('Mpr_marca').value = producto.p_marca;
            document.getElementById('Mpr_descripcion').value = producto.p_descripcion;
            document.getElementById('Mpr_precio').value = producto.p_precio;
           
        }
    }

}
export function abrirModalProd() {
  var modal = document.getElementById("modalProducto");
  modal.style.display = "block";
}
export function cerrarModalProd() {
  console.log("Cerrando modal..."); 
  var modal = document.getElementById("modalProducto");
  modal.style.display = "none";
}
const modalActualizarProducto = document.getElementById("modal_actualizar_producto");

modalActualizarProducto.addEventListener("submit", async function (e) {
    e.preventDefault();   
    let idproveedor = document.getElementById('Mpr_proveedor').value;
    const listaproveedores = await obtainProveedores();
        let proveedorExiste = false;
        for (const proveedor of listaproveedores) {
            if (`${proveedor.p_id_proveedor}` == idproveedor) {
                proveedorExiste = true;
                break;
            }
        }

        if (!proveedorExiste) {
            Swal.fire({
                icon: 'error',
                title: 'No existe un proveedor con este ID',
                text: 'Verifica tus datos e intenta nuevamente.',
                confirmButtonText: 'Reintentar',
                confirmButtonColor: '#3085d6'
            });
            return;
        }

    const productoActualizado = {
        p_id_producto: document.getElementById('Mpr_id').value,
        p_color: document.getElementById('Mpr_color').value,
        p_id_proveedor:idproveedor,
        p_cantidad: document.getElementById('Mpr_cantidad').value,
        p_talla: document.getElementById('Mpr_talla').value,
        p_marca: document.getElementById('Mpr_marca').value,
        p_descripcion: document.getElementById('Mpr_descripcion').value,
        p_precio: document.getElementById('Mpr_precio').value,

    };
  //p_id_producto  ,p_color,p_id_proveedor ,p_cantidad,p_talla,p_marca,p_descripcion,p_precio 
    const resultado = await actualizarProductos(productoActualizado);

    if (resultado) {
        Swal.fire({
        icon: 'success',
        title: 'Producto Actualizado',
        text: 'El producto ha sido Actualizado con éxito.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3085d6'
    }).then(() => {
        window.location.href = 'index.html?seccion=2';    
    });

    } else {
        Swal.fire({
                icon: 'error',
                title: 'Ocurrio un error',
                text: 'Error al Actualizar producto',
                confirmButtonText: 'Reintentar',
                confirmButtonColor: '#3085d6'
            });

    }

});
//eliminar proveedor
export async function eliminarProducto(){
    let idproducto= productoaeliminar;

    let encontrado = false;
    const ventas = await obtainVentas();
    for (const venta of ventas) {
        if (venta.v_id_producto == idproducto) {
           encontrado = true;
        }
    }
    if(encontrado == true){
        Swal.fire({
            icon: 'error',
            title: 'No se puede eliminar el producto',
            text: 'El producto tiene ventas asociados.',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#3085d6'
        }).then(() => {
            window.location.href = 'index.html?seccion=2';    
        });

    }else{
        const resultado = await eliminarProductos(idproducto);
        if (resultado) {
                Swal.fire({
                icon: 'success',
                title: 'Producto Eliminado',
                text: 'El producto ha sido eliminado con éxito.',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#3085d6'
            }).then(() => {
                window.location.href = 'index.html?seccion=2';    
            });

        } else {
            Swal.fire({
                    icon: 'error',
                    title: 'Ocurrio un error',
                    text: 'Error al Eliminar el producto',
                    confirmButtonText: 'Reintentar',
                    confirmButtonColor: '#3085d6'
                });

        }
    } 
    

}      let productoaeliminar;;
       export  function abrirModalEliProd(p_id_producto) {
        var modal = document.getElementById("modalEliminarProducto");
        modal.style.display = "block";
        productoaeliminar = p_id_producto;
        }
        export function cerrarModalEliProd() {
        console.log("Cerrando modal..."); // Esto se imprime cuando se hace clic en la "X"
        var modal = document.getElementById("modalEliminarProducto");
        modal.style.display = "none";
        }





