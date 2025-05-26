/*const url ="http://localhost:5000/api/usuarios";
fetch(url)
.then(respuesta=>{
    console.log(respuesta);
    console.log(respuesta.url);
    console.log(respuesta.status); 
    return respuesta.json()
})
.then(data=>{
    console.log(data);
   
})
function showUteistas(developeruts){
    const container = document.querySelector('tbody');
    developeruts.forEach((developer)=>{
        const {u_id,u_nombre,u_apellido,u_correo,u_direccion,u_usuario,u_contraseña, u_tipoAcceso} = developer;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
        ${u_id}
        </td>
        `;
        container.appendChild(row)
    })

.then(data=>{
    console.log(data);
    showUteistas();
})

}*/