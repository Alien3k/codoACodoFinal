document.addEventListener('DOMContentLoaded', () => {
    const registro = document.querySelector('form[action="/proyectoCodoACodo/LoginServlet"]');

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

    registro.querySelectorAll('input').forEach(input => {
        input.addEventListener('change', () => {
            const valor = input.value.trim();
            if (valor !== '') {
                eliminarError(input);
            }
        });
    });

    const validateLogin = () => {
        let validate = true;
        validate = validateEmail('email', 'El email no es válido') && validate;
        validate = validateCampo('password', 'La contraseña es obligatoria') && validate;
        return validate;
    }

    registro.addEventListener('submit', event => {
        if (!validateLogin()) {
            event.preventDefault();
            console.log('El formulario no es válido');
        } else {
            console.log('Formulario enviado');
            // Remover event.preventDefault() para permitir el envío del formulario
        }
    });
});

