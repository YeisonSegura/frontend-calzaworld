import { obtainProductos,obtainVentas,obtainProveedores,obtainClientes, obtainUsuarios } from "../apiConnection/consumeApi.js";
import {actualizarProveedor,  abrirModalEliProv } from '../js/proveedores.js';
import {actualizarClient,abrirModalEliClie} from '../js/clientes.js';
import {actualizarProducto,abrirModalEliProd} from '../js/productos.js';
import {actualizarVenta,abrirModalEliVenta} from '../js/ventas.js';
import {actualizarUsuario,abrirModalEliUsu} from '../js/usuarios.js';

async function mostrarAlertasAdmin() {
  const usuarios = await obtainUsuarios();

  const recuperarOiniciar = usuarios.filter(u =>
    ["recuperar", "iniciar"].includes(u.u_contraseña?.trim().toLowerCase())
  );

  const restringidos = usuarios.filter(u =>
    u.u_tipoAcceso?.trim().toLowerCase() === "restringido"
  );

  let mensajes = [];

  if (recuperarOiniciar.length > 0) {
    const listado = recuperarOiniciar.map(u => `🛠 ${u.u_usuario}`).join('\n');
    mensajes.push(`<strong>${recuperarOiniciar.length} con contraseña temporal:</strong><br><pre>${listado}</pre>`);
  }

  if (restringidos.length > 0) {
    const listado = restringidos.map(u => `🔒 ${u.u_usuario}`).join('\n');
    mensajes.push(`<strong>${restringidos.length} con acceso restringido:</strong><br><pre>${listado}</pre>`);
  }

  if (mensajes.length > 0) {
    await Swal.fire({
      icon: 'info',
      title: '⚠ Usuarios en revisión',
      html: mensajes.join('<hr>'),
      confirmButtonText: 'Entendido',
      confirmButtonColor: '#3085d6'
    });
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const usuario = localStorage.getItem("Usuario");
  const tipoAcceso = localStorage.getItem("tipoacceso");

  if (!usuario || !["Admin", "Usuario"].includes(tipoAcceso)) {
    window.location.href = "../login.html";
    return;
  }

  if (tipoAcceso === "Admin") {
    const yaMostro = sessionStorage.getItem("alertaAdminMostrada");

    if (!yaMostro) {
      await Swal.fire({
        icon: 'success',
        title: `¡Bienvenido, administrador ${usuario}!`,
        text: 'Tienes acceso total al sistema.',
        confirmButtonText: 'Continuar',
        confirmButtonColor: '#3085d6'
      });

      await mostrarAlertasAdmin();
      sessionStorage.setItem("alertaAdminMostrada", "true");
    }
  }

  if (tipoAcceso === "Usuario") {
    const botonVentas = document.querySelector('button[data-number="6"]');
    if (botonVentas) botonVentas.remove();
  }

  getProductos();
  getVentas();
  getProveedores();
  getClientes();
  cargarProveedores();
  getUsuarios();
});


async function getProductos(){
    const ProductosObatined = await obtainProductos();
    
    const container = document.querySelector('#tabla_productos tbody')
    ProductosObatined.forEach((productos)=>{
        const {p_id_producto ,p_color,p_id_proveedor,p_cantidad,p_talla,p_marca,p_descripcion,p_precio} = productos
        const row = document.createElement('tr');
        const precioFormateado = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0 
        }).format(p_precio);

        row.innerHTML=`
            <td>
            ${p_id_producto }
            </td>
            <td>
            ${p_color}
            </td>
            <td>
            ${p_id_proveedor}
            </td>
             <td>
            ${p_cantidad}
            </td>
             <td>
            ${p_talla}
            </td>
             <td>
            ${p_marca }
            </td>
            <td>
            ${p_descripcion}
            </td>
            <td>
            ${precioFormateado}
            </td>
            <td>
                <button class="edit-btn" data-id="${p_id_producto}">Actualizar</button>
                <button class="delete-btn" data-id="${p_id_producto}">Eliminar</button>
            </td>
           
            `;
            container.appendChild(row);
        row.querySelector('.edit-btn').addEventListener('click', function() {
            actualizarProducto(p_id_producto);
        });
        row.querySelector('.delete-btn').addEventListener('click', function() {
            abrirModalEliProd(p_id_producto);
        });
    })
} 

export async function getVentas(){
    const ventasObtained = await obtainVentas();
    const container = document.querySelector('#tabla_ventas tbody')
    ventasObtained.forEach((ventas)=>{
        const {v_id_venta  ,v_id_producto ,v_id_cliente ,v_estado_pago,v_precio_u,v_cantidad,v_ciudad_envio,v_direccion_envio,v_Total,v_correo,v_estado_despacho} = ventas
        const row = document.createElement('tr');
        const precioproducFor = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0 
        }).format(v_precio_u);
        const precioTotalFor = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0 
        }).format(v_Total);
        row.innerHTML=`
            <td>
            ${v_id_venta  }
            </td>
            <td>
            ${v_id_producto }
            </td>
            <td>
            ${v_id_cliente}
            </td>
            <td>
            ${v_estado_pago}
            </td>
            <td>
            ${v_cantidad}
            </td>
             <td>
            ${precioproducFor}
            </td>
             <td>
            ${v_ciudad_envio }
            </td>
            <td>
            ${v_direccion_envio }
            </td>
             <td>
            ${precioTotalFor}
            </td>
            <td>
            ${v_correo}
            </td>
            <td>
            ${v_estado_despacho}
            </td>
            <td>
            <div class="card-actions" style="gap: 5px;">
                    <button class="edit-btn me-5" data-id="${v_id_venta}" >Editar</button>
                    <button class="delete-btn " data-id="${v_id_venta}">Eliminar</button>
                </div>
            </td>
            `;
            container.appendChild(row)
        row.querySelector('.edit-btn').addEventListener('click', function() {
            actualizarVenta(v_id_venta);
        });
        row.querySelector('.delete-btn').addEventListener('click', function() {
            abrirModalEliVenta(v_id_venta);
        });
    })
}  
export async function getProveedores(){
    const proveedoresObtained = await obtainProveedores();
    const container = document.querySelector('#contentCard')
    proveedoresObtained.forEach((provee)=>{
        const {p_id_proveedor   ,p_nombre_proveedor ,p_apellido_proveedor ,p_empresa,p_telefono,p_correo} = provee
        const proveeHTML = document.createElement('p');
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
           
            <div class="card-content">
                <h3>ID: ${p_id_proveedor}</h3>
                <ul class="card-details">
                    <li><span>Nombre:</span> ${p_nombre_proveedor}</li>
                    <li><span>Apellido:</span> ${p_apellido_proveedor}</li>
                    <li><span>Empresa:</span> ${p_empresa}</li>
                    <li><span>Teléfono:</span> ${p_telefono}</li>
                    <li><span>Correo:</span> ${p_correo}</li>
                </ul>
                <div class="card-actions">
                    <button class="edit-btn" data-id="${p_id_proveedor}" >Editar</button>
                    <button class="delete-btn" data-id="${p_id_proveedor}">Eliminar</button>
                </div>
            </div>
        `;
        container.appendChild(card);
        card.querySelector('.edit-btn').addEventListener('click', function() {
            actualizarProveedor(p_id_proveedor);
        });
        card.querySelector('.delete-btn').addEventListener('click', function() {
            abrirModalEliProv(p_id_proveedor);
        });
    });
}
async function getClientes(){
    const clientesObtained = await obtainClientes();
    const container = document.querySelector('#contentCardc')
    clientesObtained.forEach((cliente)=>{
        const {c_id_cliente ,c_nombre_cliente ,c_apellido_cliente ,c_direccion,c_telefono,c_correo} = cliente
        const clienteHTML = document.createElement('p');
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            
            <div class="card-content">
                <h3>ID: ${c_id_cliente }</h3>
                <ul class="card-details">
                    <li><span>Nombre:</span> ${c_nombre_cliente}</li>
                    <li><span>Apellido:</span> ${c_apellido_cliente}</li>
                    <li><span>Direccion:</span> ${c_direccion}</li>
                    <li><span>Teléfono:</span> ${c_telefono}</li>
                    <li><span>Correo:</span> ${c_correo}</li>
                </ul>
                <div class="card-actions">
                    <button class="edit-btn" data-id="${c_id_cliente}">Editar</button>
                    <button class="delete-btn" data-id="${c_id_cliente}">Eliminar</button>
                </div>
            </div>
        `;
        container.appendChild(card);
        card.querySelector('.edit-btn').addEventListener('click', function() {
            actualizarClient(c_id_cliente);
        });
        card.querySelector('.delete-btn').addEventListener('click', function() {
            abrirModalEliClie(c_id_cliente);
        });
    });
}
async function getUsuarios() {
  const usariosObtained = await obtainUsuarios();
  const container = document.querySelector('#contentCardU');
  container.innerHTML = ""; 

  usariosObtained.forEach((usuario) => {
    const {u_id,u_nombre, u_apellido,u_correo,u_direccion,u_usuario,u_contraseña,u_tipoAcceso} = usuario;

    const isAlerta = u_contraseña?.trim().toLowerCase() === "recuperar" &&
                     u_tipoAcceso?.trim().toLowerCase() === "restringido";

    const estiloRojo = 'style="color: red; font-weight: bold;"';

    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
      <div class="card-content">
        <h3>ID: ${u_id}</h3>
        <ul class="card-details">
          <li><span>Nombre:</span> ${u_nombre}</li>
          <li><span>Apellido:</span> ${u_apellido}</li>
          <li><span>Direccion:</span> ${u_direccion}</li>
          <li><span>Correo:</span> ${u_correo}</li>
          <li><span>Usuario:</span> ${u_usuario}</li>
          <li><span>Contraseña:</span> <span ${isAlerta ? estiloRojo : ""}>${u_contraseña}</span></li>
          <li><span>Tipo acceso:</span> <span ${isAlerta ? estiloRojo : ""}>${u_tipoAcceso}</span></li>
        </ul>
        <div class="card-actions">
          <button class="edit-btn" data-id="${u_id}">Editar</button>
          <button class="delete-btn" data-id="${u_id}">Eliminar</button>
        </div>
      </div>
    `;

    container.appendChild(card);

    card.querySelector('.edit-btn').addEventListener('click', function () {
      actualizarUsuario(u_id);
    });

    card.querySelector('.delete-btn').addEventListener('click', function () {
      abrirModalEliUsu(u_id);
    });
  });
}




let listaProveedores = [];


async function cargarProveedores() {
    listaProveedores = await obtainProveedores(); 
    const datalist = document.getElementById('lista_proveedores');
    datalist.innerHTML = '';

    listaProveedores.forEach(proveedor => {
        const option = document.createElement('option');
        option.value = `${proveedor.p_id_proveedor} - ${proveedor.p_nombre_proveedor}`;
        datalist.appendChild(option);
    });
}
document.getElementById('i_id_proveedor').addEventListener('change', () => {
    const input = document.getElementById('i_id_proveedor');
    const valorIngresado = input.value;
    const proveedorEncontrado = listaProveedores.find(p => 
        `${p.p_id_proveedor} - ${p.p_nombre_proveedor}` === valorIngresado
    );

    if (proveedorEncontrado) {
        input.value = proveedorEncontrado.p_id_proveedor;
    }
});



