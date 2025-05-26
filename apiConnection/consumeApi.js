//import { application } from "express";

const url = "https://calzaworld-rybh.onrender.com/api/productos"
const urlventas = "https://calzaworld-rybh.onrender.com/api/ventas"
const urlproveedores = "https://calzaworld-rybh.onrender.com/api/proveedores"
const urlclientes = "https://calzaworld-rybh.onrender.com/clientes"
const urlusuarios = "https://calzaworld-rybh.onrender.com/api/usuarios"


export const obtainProductos = async()=>{
    try {
        const resultado= await fetch(url);//then
        const productos = await resultado.json();
        return productos
    } catch (error) {
        console.error("Error");
    }
}
export const obtainVentas = async()=>{
    try {
        const resultadoventas= await fetch(urlventas);//then
        const ventas = await resultadoventas.json();
        return ventas
    } catch (error) {
        console.error("Error");
    }
}

export const obtainProveedores = async()=>{
    try {
        const resultaProveedores= await fetch(urlproveedores);//then
        const proveedores = await resultaProveedores.json();
        return proveedores
    } catch (error) {
        console.error("Error");
    }
}
export const obtainClientes = async()=>{
    try {
        const resultaClientes= await fetch(urlclientes);//then
        const clientes = await resultaClientes.json();
        return clientes
    } catch (error) {
        console.error("Error");
    }
}
export const obtainUsuarios = async()=>{
    try {
        const resultaUsuarios= await fetch(urlusuarios);//then
        const usuarios = await resultaUsuarios.json();
        return usuarios
    } catch (error) {
        console.error("Error");
    }
}
//usuarios
export const insertarUsuario = async (nuevoUsuario) => {
    try {
        const respuesta = await fetch("https://calzaworld-rybh.onrender.com/api/usuarios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevoUsuario)
        });

        const resultado = await respuesta.json();
        return resultado;
    } catch (error) {
        console.error("Error al insertar usuario", error);
    }
};


export const actualizarUsuarios = async (usuarioActualizado) => {
    try {
        const respuesta = await fetch(`https://calzaworld-rybh.onrender.com/api/usuarios/${usuarioActualizado.u_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuarioActualizado)
        });

        const resultado = await respuesta.json();
        return resultado;
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
    }
};
export const eliminarUsuarios = async (idusuario) => {
    try {
        const respuesta = await fetch(`https://calzaworld-rybh.onrender.com/usuarios/${idusuario}`, {
            method: "DELETE"
        });

        const resultado = await respuesta.json();
        return resultado;
    } catch (error) {
        console.error("Error al eliminar proveedor:", error);
    }
};

//proveedores
export const insertarProveedores = async (nuevoProveedor) => {
    try {
        const respuesta = await fetch("https://calzaworld-rybh.onrender.com/api/proveedores", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevoProveedor)
        });

        const resultado = await respuesta.json();
        return resultado;
    } catch (error) {
        console.error("Error al insertar proveedor", error);
    }
};

export const actualizarProveedores = async (proveedorActualizado) => {
    try {
        const respuesta = await fetch(`https://calzaworld-rybh.onrender.com/api/proveedores/${proveedorActualizado.p_id_proveedor}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(proveedorActualizado)
        });

        const resultado = await respuesta.json();
        return resultado;
    } catch (error) {
        console.error("Error al actualizar proveedor:", error);
    }
};
export const eliminarProveedor = async (idproducto) => {
    try {
        const respuesta = await fetch(`https://calzaworld-rybh.onrender.com/api/proveedores/${idproducto}`, {
            method: "DELETE"
        });

        const resultado = await respuesta.json();
        return resultado;
    } catch (error) {
        console.error("Error al eliminar proveedor:", error);
    }
};

//clientes
export const insertarClientes = async (nuevoCliente) => {
    try {
        const respuesta = await fetch("https://calzaworld-rybh.onrender.com/api/clientes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevoCliente)
        });

        const resultado = await respuesta.json();
        return resultado;
    } catch (error) {
        console.error("Error al insertar cliente", error);
    }
};

export const actualizarClientes = async (clienteActualizado) => {
    try {
        const respuesta = await fetch(`https://calzaworld-rybh.onrender.com/api/clientes/${clienteActualizado.c_id_cliente}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(clienteActualizado)
        });

        const resultado = await respuesta.json();
        return resultado;
    } catch (error) {
        console.error("Error al actualizar cliente:", error);
    }
};
export const eliminarClientes = async (idCliente) => {
    try {
        const respuesta = await fetch(`https://calzaworld-rybh.onrender.com/api/clientes/${idCliente}`, {
            method: "DELETE"
        });

        const resultado = await respuesta.json();
        return resultado;
    } catch (error) {
        console.error("Error al eliminar cliente:", error);
    }
};


//ventas
export const insertarVentas = async (nuevoVenta) => {
    try {
        const respuesta = await fetch("https://calzaworld-rybh.onrender.com/api/ventas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevoVenta)
        });

        const resultado = await respuesta.json();
        return resultado;
    } catch (error) {
        console.error("Error al insertar Venta", error);
    }
};
//v_id_venta , v_id_producto,  v_id_cliente , v_estado_pago,v_cantidad,v_precio_u,v_ciudad_envio,v_direccion_envio,v_Total,v_correo,v_estado_despacho 
export const actualizarVentas = async (ventaActualizada) => {
    try {
        const respuesta = await fetch(`https://calzaworld-rybh.onrender.com/api/ventas/${ventaActualizada.v_id_venta}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ventaActualizada)
        });

        const resultado = await respuesta.json();
        return resultado;
    } catch (error) {
        console.error("Error al actualizar Venta:", error);
    }
};
export const eliminarVentas = async (idVenta) => {
    try {
        const respuesta = await fetch(`http://localhost:5000/api/ventas/${idVenta}`, {
            method: "DELETE"
        });

        const resultado = await respuesta.json();
        return resultado;
    } catch (error) {
        console.error("Error al eliminar venta:", error);
    }
};

//productos

export const insertarProducto = async (nuevoProducto) => {
    try {
        const respuesta = await fetch("https://calzaworld-rybh.onrender.com/api/productos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevoProducto)
        });

        const resultado = await respuesta.json();
        return resultado;
    } catch (error) {
        console.error("Error al insertar Producto", error);
    }
};

export const actualizarProductos = async (productoActualizado) => {
    try {
        const respuesta = await fetch(`https://calzaworld-rybh.onrender.com/api/productos/${productoActualizado.p_id_producto}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productoActualizado)
        });

        const resultado = await respuesta.json();
        return resultado;
    } catch (error) {
        console.error("Error al actualizar prodcucto:", error);
    }
};
export const eliminarProductos = async (idProducto) => {
    try {
        const respuesta = await fetch(`https://calzaworld-rybh.onrender.com/api/productos/${idProducto}`, {
            method: "DELETE"
        });

        const resultado = await respuesta.json();
        return resultado;
    } catch (error) {
        console.error("Error al eliminar producto:", error);
    }
};






