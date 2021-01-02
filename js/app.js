const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const btnVaciarCarrito = document.querySelector('#vaciar-carrito');
// Arreglo vacío Carrito de Compras
let articulosCarrito = [];

registrarEventListeners();

function registrarEventListeners() {
    // Agregar curso presionando "Agregar al Carrito"
    listaCursos.addEventListener('click', agregarCurso);

    // Elimina un curso del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Vaciar carrito
    btnVaciarCarrito.addEventListener('click', _=> {
        articulosCarrito = []; // Vaciamos el arreglo del carrito
        limpiarHTML(); // Limpiamos el carrito en el DOM
    });
}

// Funciones
function agregarCurso(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement
        leerDatosCurso(cursoSeleccionado);
    }
}

function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');
        
        // Elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);
        
        carritoHTML(); // Iterar sobre el carrito y mostrar HTML
    }
}

function leerDatosCurso(curso) {

    // Nuevo objeto con el curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1 
    }

    // Comprobar si ya existe el artículo en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);

    if(existe) {
        // Actualizamos la cantidad si el curso ya está en el carrito
        const cursos = articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; // Retorna objeto actualizado
            }else {
                return curso; // Retorna el objeto inicial no modificado
            }
        });
    } else {
        // Agrega elementos al arreglo del Carrito de compras
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    console.log(articulosCarrito);
    carritoHTML();
}

// Muestra el Carrito de compras en el HTML
function carritoHTML() {

    // Limpiar el HTML
    limpiarHTML();

    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach( curso => {
        const { imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>
                <strong>${titulo}</strong>
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}">X</a>
            </td>
        `;
        // Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });
}

function limpiarHTML() {
    // Forma lenta
    // contenedorCarrito.innerHTML = '';

    // Mientras el contenedor tenga un hijo td, se ejecuta
    // LImpia los hijos para evitar duplicidad por appendChild
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}