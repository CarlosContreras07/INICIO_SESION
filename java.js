document.addEventListener("DOMContentLoaded", () => {
  // --- MANEJO DEL POP-UP DE COOKIES ---
  const cookieOverlay = document.getElementById("cookiePopup");
  const btnAccept = document.getElementById("btnAcceptCookie");
  const btnReject = document.getElementById("btnRejectCookie");

  // Función que cierra el modal al pulsar cualquier botón
  function closeCookies() {
    cookieOverlay.style.display = "none";
  }

  btnAccept.addEventListener("click", closeCookies);
  btnReject.addEventListener("click", closeCookies);

  // --- VALIDACIÓN DEL FORMULARIO DE LOGIN ---
  const loginForm = document.getElementById("loginForm");
  const passwordInput = document.getElementById("password");
  const passError = document.getElementById("passError");

  loginForm.addEventListener("submit", (e) => {
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
      passError.style.display = "block"; // Muestra el mensaje de error
      passwordInput.style.borderColor = "#d93025"; // Pone el borde en rojo
    } else {
      // Si TODO es correcto:
      passError.style.display = "none";
      passwordInput.style.borderColor = "#28a745";
      alert("Acceso correcto. Iniciando sesión...");
    }
  });
});

// 1. Capturamos el formulario por su ID
const formulario = document.getElementById("loginForm");
// 2. "Escuchamos" el momento exacto en el que el usuario hace clic en "Enviar"
formulario.addEventListener("submit", async function (evento) {
  // Evitamos que el navegador recargue la página por defecto
  evento.preventDefault();
  // 3. Capturamos los valores que el usuario ha escrito
  const nombreUsuario = document.getElementById("username").value;
  const emailUsuario = document.getElementById("email").value;
  // 4. Construimos el JSON (El formato de datos que entiende HubSpot)
  // CUIDADO: Los "name" ("firstname" y "email") deben ser exactamente los que pide HubSpot
  const datosHubspot = {
    fields: [
      {
        name: "firstname",
        value: nombreUsuario,
      },
      {
        name: "email",
        value: emailUsuario,
      },
    ],
  };
  // 5. Configura tus credenciales (Reemplaza los valores con los que copiaste en la Fase 1)
  const portalId = "343175141";
  const formGuid = "3077f084-0cf0-491d-992e-0678f8d78b34";
  const urlApi = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`;
  // 6. Enviamos la petición HTTP por detrás (AJAX/Fetch)
  try {
    console.log("Enviando datos al CRM...");
    const respuesta = await fetch(urlApi, {
      method: "POST", // Usamos POST porque estamos enviando información, no pidiendo (GET)
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosHubspot), // Convertimos nuestro objeto a texto JSON
    });
    // 7. Comprobamos si el servidor nos ha dado un "OK"
    if (respuesta.ok) {
      alert("¡Éxito! El contacto se ha guardado en HubSpot.");
      formulario.reset(); // Vaciamos los campos del formulario
    } else {
      console.error("Error del servidor:", respuesta.statusText);
      alert("Hubo un problema al enviar los datos. Revisa la consola.");
    }
  } catch (error) {
    console.error("Error de red o conexión:", error);
  }
});
