document.addEventListener('DOMContentLoaded', () => {

    // --- MANEJO DEL POP-UP DE COOKIES ---
    const cookieOverlay = document.getElementById('cookiePopup');
    const btnAccept = document.getElementById('btnAcceptCookie');
    const btnReject = document.getElementById('btnRejectCookie');

    // Función que cierra el modal al pulsar cualquier botón
    function closeCookies() {
        cookieOverlay.style.display = 'none';
    }

    btnAccept.addEventListener('click', closeCookies);
    btnReject.addEventListener('click', closeCookies);


    // --- VALIDACIÓN DEL FORMULARIO DE LOGIN ---
    const loginForm = document.getElementById('loginForm');
    const passwordInput = document.getElementById('password');
    const passError = document.getElementById('passError');

    loginForm.addEventListener('submit', (e) => {
        const passValue = passwordInput.value;

        /* EXPLICACIÓN DE LA EXPRESIÓN REGULAR (RegEx):
           - (?=.*[A-Z])       : Debe contener al menos una MAYÚSCULA.
           - (?=.*[!@#$%^&*])   : Debe contener al menos un CARÁCTER ESPECIAL.
           - .{8,}              : Debe tener un MÍNIMO DE 8 caracteres de longitud.
        */
        const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*.,_-]).{8,}$/;

        if (!regex.test(passValue)) {
            // Si NO cumple los requisitos:
            e.preventDefault(); // Evita que el formulario se envíe
            passError.style.display = 'block'; // Muestra el mensaje de error
            passwordInput.style.borderColor = '#d93025'; // Pone el borde en rojo
        } else {
            // Si TODO es correcto:
            passError.style.display = 'none';
            passwordInput.style.borderColor = '#28a745';
            alert("Acceso correcto. Iniciando sesión...");
        }
    });
});