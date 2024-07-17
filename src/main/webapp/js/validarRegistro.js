document.addEventListener('DOMContentLoaded', () => {
    const registro = document.querySelector('form[action="/proyectoCodoACodo/registro"]');

    const showError = (input, msg) => {
        const divContainer = input.parentNode;
        const errorText = divContainer.querySelector('.error-text');
        divContainer.classList.add('error');
        errorText.innerText = msg;
    };

    const eliminarError = input => {
        const divContainer = input.parentNode;
        divContainer.classList.remove('error');
        const errorText = divContainer.querySelector('.error-text');
        errorText.innerText = '';
    };

    registro.querySelectorAll('input').forEach(input => {
        input.addEventListener('change', () => {
            const valor = input.value.trim();
            if (valor !== '') {
                eliminarError(input);
            }
        });
    });

    function isEmail(email) {
        const expresionRegular = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;
        return expresionRegular.test(email);
    }

    function validateEmail(campoId, msg) {
        const campo = document.getElementById(campoId);
        const email = campo.value.trim();
        if (email === '') {
            showError(campo, 'El email es obligatorio');
            return false;
        } else if (!isEmail(email)) {
            showError(campo, msg);
            return false;
        } else {
            eliminarError(campo);
            return true;
        }
    }

    function validateFirstName(campoId, msg) {
        const campo = document.getElementById(campoId);
        const userName = campo.value.trim();
        if (userName === '') {
            showError(campo, msg);
            return false;
        } else {
            eliminarError(campo);
            return true;
        }
    }

    function validateLastName(campoId, msg) {
        const campo = document.getElementById(campoId);
        const userName = campo.value.trim();
        if (userName === '') {
            showError(campo, msg);
            return false;
        } else {
            eliminarError(campo);
            return true;
        }
    }

    function validateCampo(campoId, msg) {
        const campo = document.getElementById(campoId);
        const value = campo.value.trim();
        if (value === '') {
            showError(campo, msg);
            return false;
        } else {
            eliminarError(campo);
            return true;
        }
    }

    function validateDate(campoId, msg) {
        const campo = document.getElementById(campoId);
        const value = campo.value.trim();
        if (value === '') {
            showError(campo, msg);
            return false;
        } else {
            eliminarError(campo);
            return true;
        }
    }

    function validatePais(campoId, msg) {
        const campo = document.getElementById(campoId);
        const value = campo.value.trim();
        if (value === '') {
            showError(campo, msg);
            return false;
        } else {
            eliminarError(campo);
            return true;
        }
    }

    const validateForm = () => {
        let validate = true;
        validate = validateFirstName('nombre', 'El nombre es obligatorio') && validate;
        validate = validateLastName('apellido', 'El apellido es obligatorio') && validate;
        validate = validateEmail('email', 'El email no es valido') && validate;
        validate = validateCampo('password', 'La contraseña es obligatoria') && validate;
        validate = validateDate('fechaNacimiento', 'Ingrese una fecha de nacimiento') && validate;
        validate = validatePais('pais', 'Seleccione un país') && validate;
        return validate;
    };

    registro.addEventListener('submit', event => {
        if (!validateForm()) {
            event.preventDefault();
            console.log('El formulario no es valido');
        } else {
            console.log('Formulario enviado');
        }
    });
});
