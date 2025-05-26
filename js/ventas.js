
import { insertarVentas,actualizarVentas,eliminarVentas,actualizarProductos, obtainVentas,obtainClientes, obtainProductos } from "../apiConnection/consumeApi.js";

  
const formRegistroVenta = document.getElementById("formularioVentas");

formRegistroVenta.addEventListener("submit", async function (e) {
    e.preventDefault();
    let producto_id = document.getElementById('v_idzapato').value;
    let cliente_id = document.getElementById('v_idcliente').value;
    let ciudad =  document.getElementById('v_ciudad').value;
    let cantidadProducto = document.getElementById('v_cantidad').value;

 
    const listaClientes = await obtainClientes();

        let clienteExiste = false;
        //c_id_cliente,c_nombre_cliente,c_apellido_cliente,c_direccion,c_telefono,c_correo
        for (const cliente of listaClientes) {
            if (`${cliente.c_id_cliente}` == cliente_id) {
                clienteExiste = true;
                break;
            }
        }

        if (!clienteExiste) {
            Swal.fire({
                icon: 'error',
                title: 'No existe un cliente con este ID',
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
     const listaproductos = await obtainProductos();

        let productoExiste = false;
           //p_id_producto  ,p_color,p_id_proveedor ,p_cantidad,p_talla,p_marca,p_descripcion,p_precio
        for (const producto of listaproductos) {
            if (`${producto.p_id_producto}` == producto_id) {
                productoExiste = true;
                break;
            }
        }

        if (!productoExiste) {
            Swal.fire({
                icon: 'error',
                title: 'No existe un producto con este ID',
                text: 'Verifica tus datos e intenta nuevamente.',
                confirmButtonText: 'Reintentar',
                confirmButtonColor: '#3085d6'
            });
            return;
        }

        let precioenvio;
        const ciudadLower = ciudad.toLowerCase();
        if(["giron", "bucaramanga", "floridablanca", "barrancabermeja"].includes(ciudadLower)){
             precioenvio = 10000;
        }else{
             precioenvio = 60000;

        }
        let total ;
        let precioProducto = 0;
        let cantidadProductoreal = 0;
        for (const producto of listaproductos) {
            if (`${producto.p_id_producto}` == producto_id) {
                 precioProducto = producto.p_precio;
                 cantidadProductoreal = producto.p_cantidad;
                break;
            }
        }
        if(parseInt(cantidadProducto) > parseInt(cantidadProductoreal)){
            Swal.fire({
                icon: 'error',
                title: 'No hay suficiente cantidad de producto',
                text: 'Verifica tus datos e intenta nuevamente.',
                confirmButtonText: 'Reintentar',
                confirmButtonColor: '#3085d6'
            });
            return;
        }
        total = (parseInt(precioProducto) * parseInt(cantidadProducto)) + parseInt(precioenvio);
        let operacion = "actualizar";
        actualizarProductoAntiguo(producto_id,cantidadProducto,operacion);
        

   //p_id_producto  ,p_color,p_id_proveedor ,p_cantidad,p_talla,p_marca,p_descripcion,p_precio
   //v_id_venta , v_id_producto,  v_id_cliente , v_estado_pago,v_cantidad,v_precio_u,v_ciudad_envio,v_direccion_envio,v_Total,v_correo,v_estado_despacho
    const nuevaVenta = {
        v_id_producto:producto_id,
        v_id_cliente: cliente_id,
        v_estado_pago: document.getElementById('v_Estado_Pago').value,
        v_cantidad: cantidadProducto,
        v_precio_u:precioProducto,
        v_ciudad_envio: ciudad,
        v_direccion_envio: document.getElementById('v_direccion').value,
        v_Total: total ,
        v_correo: document.getElementById('v_correo').value,
        v_estado_despacho: document.getElementById('v_Estado_Despacho').value,

    };

    const resultado = await insertarVentas(nuevaVenta);

    if (resultado) {
        Swal.fire({
        icon: 'success',
        title: 'Venta agregada correctamente',
        text: 'La venta ha sido registrado con éxito.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3085d6'
    }).then(() => {
        limpiarFormulario();
        window.location.href = 'index.html?seccion=5';    
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
        document.getElementById('v_idzapato').value = '';
        document.getElementById('v_idcliente').value = '';
        document.getElementById('v_Estado_Pago').value = '';
        document.getElementById('v_cantidad').value = '';
        document.getElementById('v_ciudad').value = '';
        document.getElementById('v_direccion').value = '';
        document.getElementById('v_correo').value = '';
        document.getElementById('v_Estado_Despacho').value = '';

    }
});

async function actualizarProductoAntiguo(producto_id, cantidadProducto, operacion) {
    const listaproductos = await obtainProductos();
    let productoActual = null;

    for (const producto of listaproductos) {
        if (`${producto.p_id_producto}` == producto_id) {
            productoActual = producto;
            break;
        }
    }

    if (!productoActual) {
        console.error("Producto no encontrado");
        return;
    }

    let totalproducto;
    if (operacion === "actualizar") {
        totalproducto = parseInt(productoActual.p_cantidad) - parseInt(cantidadProducto);
    } else if (operacion === "eliminar") {
        totalproducto = parseInt(productoActual.p_cantidad) + parseInt(cantidadProducto);
    }

    const nuevoProducto = {
        p_id_producto: producto_id,
        p_color: productoActual.p_color,
        p_id_proveedor: productoActual.p_id_proveedor,
        p_cantidad: totalproducto,
        p_talla: productoActual.p_talla,
        p_marca: productoActual.p_marca,
        p_descripcion: productoActual.p_descripcion,
        p_precio: productoActual.p_precio
    };

    const resultado = await actualizarProductos(nuevoProducto);

    if (!resultado) {
        Swal.fire({
            icon: 'error',
            title: 'Ocurrió un error',
            text: 'Error al actualizar el producto',
            confirmButtonText: 'Reintentar',
            confirmButtonColor: '#3085d6'
        });
    }
}


//v_id_venta , v_id_producto,  v_id_cliente , v_estado_pago,v_cantidad,v_precio_u,v_ciudad_envio,v_direccion_envio,v_Total,v_correo,v_estado_despacho
export async function actualizarVenta(idventa){
    abrirModalVenta(); 
    const ventas = await obtainVentas();
    for (const venta of ventas) {
        if (venta.v_id_venta == idventa) {
            document.getElementById('Mid_venta').value = venta.v_id_venta;
            document.getElementById('Mid_zapato').value = venta.v_id_producto;
            document.getElementById('Mpid_cliente').value = venta.v_id_cliente;
            document.getElementById('MEstadoP').value = venta.v_estado_pago;
            document.getElementById('MpCantidad').value = venta.v_cantidad;
            document.getElementById('MventaP').value = venta.v_precio_u;
            document.getElementById('Mventa_ciudad').value = venta.v_ciudad_envio;
            document.getElementById('Mventa_direc').value = venta.v_direccion_envio;
            document.getElementById('MestadoD').value = venta.v_estado_despacho;
            document.getElementById('Mtotal').value = venta.v_Total;
            document.getElementById('Mventa_correo').value = venta.v_correo;

            
        }
    }

}
export function abrirModalVenta() {
  var modal = document.getElementById("modalventa");
  modal.style.display = "block";
}
export function cerrarModalVenta() {
  console.log("Cerrando modal..."); 
  var modal = document.getElementById("modalventa");
  modal.style.display = "none";
}
//c_id_cliente,c_nombre_cliente,c_apellido_cliente,c_direccion,c_telefono,c_correo 
const modalActualizarVenta = document.getElementById("modal_actualizar_venta");

modalActualizarVenta.addEventListener("submit", async function (e) {
    e.preventDefault();   
    let idcliente = document.getElementById('Mpid_cliente').value;
    let idproducto = document.getElementById('Mid_zapato').value;
    let nuevaCantidad = document.getElementById('MpCantidad').value;
    let ciudad =  document.getElementById('Mventa_ciudad').value;
    let idventa = document.getElementById('Mid_venta').value;
    const listaClientes = await obtainClientes();
    const listaproductos = await obtainProductos();

    let clienteExiste = false;
        for (const cliente of listaClientes) {
            if (`${cliente.c_id_cliente}` == idcliente) {
                clienteExiste = true;
                break;
            }
        }
        let cantidadRealVenta;
        const listaVentas = await obtainVentas();
         for (const venta of listaVentas) {
            if (`${venta.v_id_venta}` == idventa) {
                cantidadRealVenta = venta.v_cantidad;
                break;
            }
        }

        if (!clienteExiste) {
            Swal.fire({
                icon: 'error',
                title: 'No existe un cliente con este ID',
                text: 'Verifica tus datos e intenta nuevamente.',
                confirmButtonText: 'Reintentar',
                confirmButtonColor: '#3085d6'
            });
            return;
        }
        let total ;
        let precioProducto = 0;
        let cantidadProductoreal = 0;

           for (const producto of listaproductos) {
            if (`${producto.p_id_producto}` == idproducto) {
                 precioProducto = producto.p_precio;
                 cantidadProductoreal = producto.p_cantidad;
                break;
            }
        }
        let diferencia = parseInt(nuevaCantidad) - parseInt(cantidadRealVenta);
        if (nuevaCantidad <= 0) {    
            Swal.fire({
                icon: 'error',
                title: 'La cantidad debe ser mayor a 0',
                text: 'Verifica tus datos e intenta nuevamente.',
                confirmButtonText: 'Reintentar',
                confirmButtonColor: '#3085d6'
            });
            return;
        }
        if (diferencia > 0 && diferencia > parseInt(cantidadProductoreal)) {
            Swal.fire({
                icon: 'error',
                title: 'No hay suficiente cantidad de producto',
                text: 'Verifica tus datos e intenta nuevamente.',
                confirmButtonText: 'Reintentar',
                confirmButtonColor: '#3085d6'
            });
            return;
        }
        let precioenvio;
        const ciudadLower = ciudad.toLowerCase();
        if(["giron", "bucaramanga", "floridablanca", "barrancabermeja"].includes(ciudadLower)){
             precioenvio = 10000;
        }else{
             precioenvio = 60000;

        }
        
        total = (parseInt(precioProducto) * parseInt(nuevaCantidad)) + parseInt(precioenvio);

        if (diferencia !== 0) {
            let operacion = diferencia > 0 ? "actualizar" : "eliminar";
            await actualizarProductoAntiguo(idproducto, Math.abs(diferencia), operacion);
        }


    const ventaActulizada = {
        v_id_venta: idventa,
        v_id_producto:idproducto,
        v_id_cliente: idcliente,
        v_estado_pago: document.getElementById('MEstadoP').value,
        v_cantidad: nuevaCantidad,
        v_precio_u:precioProducto,
        v_ciudad_envio: ciudad,
        v_direccion_envio: document.getElementById('Mventa_direc').value,
        v_Total: total ,
        v_correo: document.getElementById('Mventa_correo').value,
        v_estado_despacho: document.getElementById('MestadoD').value,

    };
    const resultado = await actualizarVentas(ventaActulizada);

    if (resultado) {
        Swal.fire({
        icon: 'success',
        title: 'Producto Actualizado',
        text: 'El producto ha sido Actualizado con éxito.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3085d6'
    }).then(() => {
        window.location.href = 'index.html?seccion=5';    
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
//eliminar venta
export async function eliminarVenta(){
    let idVenta= ventaaeliminar;
    let producto_id;
    let cantidadventa =0;
    let operacion;
    const ventas = await obtainVentas();
    for (const venta of ventas) {
        if (venta.v_id_venta == idVenta) {
            producto_id = venta.v_id_producto;
            cantidadventa = venta.v_cantidad;
            operacion = "eliminar";
        }
    }
     let actualizarproducto = await actualizarProductoAntiguo(producto_id,cantidadventa,operacion);
    if(!actualizarproducto){
        Swal.fire({
                icon: 'success',
                title: 'Surgio un error',
                text: 'Se produjo un error al restaurar la cantidad del producto.',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#3085d6'
            })
    }
        const resultado = await eliminarVentas(idVenta);
        if (resultado) {
                Swal.fire({
                icon: 'success',
                title: 'Producto Eliminado',
                text: 'El producto ha sido eliminado con éxito.',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#3085d6'
            }).then(() => {
                window.location.href = 'index.html?seccion=5';    
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
    
    

}      let ventaaeliminar;;
       export  function abrirModalEliVenta(v_id_venta) {
        var modal = document.getElementById("modalEliminarVenta");
        modal.style.display = "block";
        ventaaeliminar = v_id_venta;
        }
        export function cerrarModalEliVenta() {
        console.log("Cerrando modal..."); // Esto se imprime cuando se hace clic en la "X"
        var modal = document.getElementById("modalEliminarVenta");
        modal.style.display = "none";
        }




