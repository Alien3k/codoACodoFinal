const nav = document.querySelector('#nav');
const abrir = document.querySelector('#abrir');

abrir.addEventListener('click', () => {
    if (nav.classList.contains('visible')) {
        nav.classList.remove('visible');
    }else{
        nav.classList.add('visible');
    }
    
})

const API_URL = 'https://api.themoviedb.org/3'
const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODMzNjgxYjMwOTE2ZTk1OTY0NGNlMmI1N2Y1NjkzYSIsInN1YiI6IjY2NTMzYTdiMDQwYTAwNmVkY2Q3NDE2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.V2fbudi_0NoV-vI86P1Yku-ViZdYOIH_z8mKFha08ZY'
let currnetPage = 1;

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODMzNjgxYjMwOTE2ZTk1OTY0NGNlMmI1N2Y1NjkzYSIsInN1YiI6IjY2NTMzYTdiMDQwYTAwNmVkY2Q3NDE2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.V2fbudi_0NoV-vI86P1Yku-ViZdYOIH_z8mKFha08ZY'
    }
};

function llamarAPI(page) {
    fetch(`${API_URL}/movie/popular?page=${page}`, {
        headers: {
            Authorization: `Bearer ${API_KEY}`,
        },
    })
        .then(response => response.json())
        .then(data => dibujarDatos(data));
}


function dibujarDatos(json) {
    const filas = json.results.map(obj => Peli(obj));
    document.querySelector('.peliculasTendencia .peliculas').innerHTML = filas.join('');
}

/* ------------------------------------------------- */

function Peli(obj) {
    return ` 
    <a href="#">
    <div class="card">
        <div class="box">
            <div class="imgBox">
                <img class="imgTendencia" src="https://image.tmdb.org/t/p/w500/${obj.poster_path}" alt="${obj.title}"
                    loading="lazy">
            </div>
            <div class="contentBox">
                <div>
                    <h1>${obj.title}</h1>
                    <br>
                    <p>${'Puntuación : ' + obj.vote_average}</p>
                    <br>
                    <p>${'Estreno : ' + obj.release_date}</p>
                </div>
            </div>
        </div>
    </div>
</a>
`
        ;
}
/* ------------------------------------ */
function cargarPaginaSiguiente(){
    currnetPage++;
    llamarAPI(currnetPage);
}
function cargarPaginaAnterior(){
    if (currnetPage>1) {
        currnetPage--;
    llamarAPI(currnetPage);
    }
}
document.querySelector('.anterior').addEventListener('click', cargarPaginaAnterior);
document.querySelector('.siguiente').addEventListener('click', cargarPaginaSiguiente);


llamarAPI(currnetPage)
/* ------------------------------------ */
/* ------------------------------------ */
/* ------------------------------------ */
function llamarAPIPeli() {
  fetch('/proyectoCodoACodo/peliculas')
    .then(response => response.json())
    .then(data => dibujarDatosPelis(data));
}

/* ------------------------------------ */
function Pelicula(pelicula) {
  return `
      <a href="#">
    <div class="card">
        <div class="box">
            <div class="imgBox">
                <img class="imgTendencia" src="${pelicula.imagen}" alt="${pelicula.titulo}"
                    loading="lazy">
            </div>
            <div class="contentBox">
                <div>
                    <h1>${pelicula.titulo}</h1>
                    <br>
                    <p>${'Idioma : ' + pelicula.lenguaje}</p>
                    <br>
                    <p>${'Sinopsis : ' + pelicula.sinopsis}</p>
                </div>
            </div>
        </div>
    </div>
</a>
    `;
}
/* ------------------------------------ */
function dibujarDatosPelis(json) {
  const filas = json.map(obj => Pelicula(obj));
  document.querySelector('#peliculas').innerHTML = filas.join('');
}


function buscarPelicula(busqueda) {
  return fetch('/proyectoCodoACodo/peliculas')
    .then(response => response.json())
    .then(peliculas => { 
      return peliculas.filter(pelicula =>
        pelicula.titulo.toLowerCase().includes(busqueda.toLowerCase())
      );
    });
}
//filter crea un nuevo array con todos los elementos que pasen una función de prueba especificada.
//includes determina si un array contiene un elemento específico

function PeliculaResultado(pelicula) {
  return `
  <li class="list-group-item">
  <div class="d-flex">
  <img src="${pelicula.imagen}" class="img-fluid rounded" alt="${pelicula.titulo}" style="width: 100px; height: 150px; object-fit: cover;">
  <div class="ms-3">
  <h5 class="mb-1">${pelicula.titulo}</h5>
  <p class="mb-1">${pelicula.sinopsis}</p>
  <small class="text-muted">Lenguaje: ${pelicula.lenguaje}</small>
  </div>
  </div>
  </li>
  `;
}

/* ------------------------------------ */
function mostrarResultadosEnModal(resultados) {
  if (resultados.length === 0) {
    document.getElementById('resultadosModalBody').innerHTML = '<li class="list-group-item">No se encontraron resultados.</li>';
  } else {
    const modalContent = resultados.map(pelicula => PeliculaResultado(pelicula)).join('');
    document.getElementById('resultadosModalBody').innerHTML = modalContent;
  }
  
  const resultadosModal = new bootstrap.Modal(document.getElementById('resultadosModal'));
  resultadosModal.show();
}

/* ------------------------------------ */
function realizarBusqueda() {
  const terminoBusqueda = document.getElementById('inputBuscar').value;
  buscarPelicula(terminoBusqueda)
    .then(resultados => {
      mostrarResultadosEnModal(resultados);
    });
}

// Agregar event listener al botón de búsqueda
document.getElementById('searchButton').addEventListener('click', realizarBusqueda);

// Agregar event listener para la tecla "Enter" en el campo de búsqueda
document.getElementById('inputBuscar').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    realizarBusqueda();
  }
});
llamarAPIPeli();