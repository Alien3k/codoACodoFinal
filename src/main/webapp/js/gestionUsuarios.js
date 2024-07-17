document.addEventListener('DOMContentLoaded', cargarUsuarios);
let modificarModal;

document.addEventListener('DOMContentLoaded', function() {
    modificarModal = new bootstrap.Modal(document.getElementById('modificarModal'));
    cargarUsuarios();
});
/* ----------------------------------------- */
function cargarUsuarios() {

    fetch('/proyectoCodoACodo/GestionUsuariosServlet')
        .then(response => response.json())
        .then(usuarios => {
            console.log(usuarios)
            const tbody = document.querySelector('#usuariosTable tbody');
            tbody.innerHTML = '';
            usuarios.forEach(usuario => {
                const fechaFormateada = new Date(usuario.fechaNacimiento).toISOString().split('T')[0];
                let x=""
                if(usuario.adm){x="Admin"}else{x="Usuario"}
                tbody.innerHTML += `
                    <tr>
                        <td>${usuario.id}</td>
                        <td>${usuario.nombre}</td>
                        <td>${usuario.apellido}</td>
                        <td>${usuario.email}</td>
                        <td>${usuario.password}</td>
                        <td>${fechaFormateada}</td>
                        <!-- <td>${usuario.fechaNacimiento}</td> -->
                        <td>${usuario.pais}</td>
                        <td>${x}</td>
                        <td>
                            <button class="btn btn-primary btn-sm" onclick="mostrarModificarModal(${usuario.id})">Modificar</button>
                            <button class="btn btn-danger btn-sm" onclick="eliminarUsuario(${usuario.id})">Eliminar</button>
                        </td>
                    </tr>
                `;
            });
        })
}

function mostrarModificarModal(id) {
    fetch(`/proyectoCodoACodo/GestionUsuariosServlet?id=${id}`)
        .then(response => response.json())
        .then(usuario => {
            document.getElementById('userId').value = usuario.id;
            document.getElementById('nombre').value = usuario.nombre;
            document.getElementById('apellido').value = usuario.apellido;
            document.getElementById('email').value = usuario.email;
            document.getElementById('password').value = usuario.password;
            document.getElementById('fechaNacimiento').value = new Date(usuario.fechaNacimiento).toISOString().split('T')[0];
            document.getElementById('pais').value = usuario.pais;
            document.getElementById('adm').checked = usuario.adm;
            modificarModal.show();
        })
        .catch(error => console.error('Error:', error));
}

function guardarModificacion() {
    const usuario = {
        id: document.getElementById('userId').value,
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        fechaNacimiento: document.getElementById('fechaNacimiento').value,
        pais: document.getElementById('pais').value,
        adm: document.getElementById('adm').checked
    };

    fetch('/proyectoCodoACodo/GestionUsuariosServlet', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.exito)
        if (data.exito) {
            modificarModal.hide();
            cargarUsuarios();
        } else {
            alert('Error al modificar el usuario');
        }
    })
    .catch(error => console.error('Error:', error));
}

/* ------------------------------------------------ */
function eliminarUsuario(id) {
    if (confirm('¿Está seguro de que desea eliminar este usuario?')) {
        fetch(`/proyectoCodoACodo/GestionUsuariosServlet?id=${id}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(data => {
                console.log(data.exito)
                if (data.exito) {
                    cargarUsuarios();
                } else {
                    alert('Error al eliminar el usuario');
                }
            })
            .catch(error => console.error('Error:', error));
    }
}
