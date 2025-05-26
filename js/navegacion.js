const botones = document.querySelectorAll('.btn');
const contenido = document.querySelectorAll('.contenido');

botones.forEach(boton => {
  boton.addEventListener('click', (e) => {
    const usuario = localStorage.getItem("Usuario");
    const tipoAcceso = localStorage.getItem("tipoacceso");
    const number = e.target.dataset.number;

    if (!usuario || !tipoAcceso) {
      window.location.href = "/frontend/login.html";
      return;
    }

    search(number);
  });
});

export const search = (value) => {
  contenido.forEach((index) => {
    index.classList.remove('block');
    if (index.dataset.seccion == value) {
      index.classList.add('block');
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  const tipoAcceso = localStorage.getItem("tipoacceso");

  if (tipoAcceso === "Usuario") {
    const botonVentas = document.querySelector('button[data-number="6"]');
    if (botonVentas) botonVentas.remove();
  }

  const params = new URLSearchParams(window.location.search);
  const seccion = params.get('seccion') || "1";
  search(seccion);
});
