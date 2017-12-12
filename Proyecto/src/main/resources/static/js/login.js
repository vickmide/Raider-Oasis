// Sistema de login (muy simple)

//var Perfil = {id: 0, nombre:"Nico", clave:"una clave"}; // perfil local de prueba

/*$(document).ready(function() {
   checkCookie(); 
});*/

$(document).ready(function() {
	// Comprobación de login
	var logedUser = getCookie("logedAs");
	var canvas = document.getElementById("canvas-juego");
    if (logedUser == "") {
    	if (canvas != null) {
    		alert("Debes estar registrado y logeado para jugar");
        	window.location.href = "index.html";
    	}
    } else {
    	//alert("Tu id es " + logedUser + "!");
    }
});

function validateLogin() {
    // Primero hay que recibir los datos
    var username = document.forms["loginForm"]["username"].value;
    var pwd = document.forms["loginForm"]["pwd"].value;

    // Se comprueba si no se ha dejado ningún campo en blanco (no tendría sentido enviar al servidor un perfil incompleto)
    if (username == "") {
        alert("Name must be filled out");
        return false;
    } else if (pwd == "") {
        alert("Password must be filled out");
        return false;
    } else {
        // Si ambos campos tienen contenido, se le envía al servidor
        serverLogin(username,pwd);
    }
}

function serverLogin(username,pwd) {

    // Codigo de testeo que validaba el perfil segun uno local
    /*if ((username == Perfil.nombre) && (pwd == Perfil.clave)) {
        return true;
    } else {
        return false;
    }*/
	
	// Creamos el perfil a validar con los datos del formulario
    var perfilAValidar = {nombre: username, clave: pwd};

    // Lo mandamos al servidor
    $.ajax({
        method: 'POST',
        url: 'http://localhost:8181/perfil/validate',
        data: JSON.stringify(perfilAValidar),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (int) {
        if (int != -1) {
            alert("Logged in!");
            if (int != null) {
                setCookie("logedAs", int);
            }
            var logedUser = getCookie("logedAs");
            if (logedUser != "") {
                alert("¡Tu id de jugador es " + logedUser + "!");
            }
            return true;
        } else {
            alert("Incorrect name or password");
            return false;
        }
    });
}

function register() {
    var username = document.forms["loginForm"]["username"].value;
    var pwd = document.forms["loginForm"]["pwd"].value;

    var perfilARegistrar = {nombre: username, clave: pwd};
    $.ajax({
        method: "POST",
        url: 'http://localhost:8181/perfil',
        data: JSON.stringify(perfilARegistrar),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (perfil) {
        console.log("Perfil creado: " + JSON.stringify(perfil));
    });
    alert("Registration success!");
    document.forms["loginForm"].reset();
}