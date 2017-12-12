// Sistema de login (muy simple)

//var Perfil = {id: 0, nombre:"Nico", clave:"una clave"}; // perfil local de prueba

/*$(document).ready(function() {
   checkCookie(); 
});*/

$(document).ready(function() {
	// Comprobación de login
	var logedUser = getCookie("logedAs");
	var canvas = document.getElementById("canvas-juego");
	var loginbox = document.getElementById("login-box");
	var logedin = document.getElementById("logedin");
	var perfilbox = document.getElementById("cosasdelperfil");
	//var mostraruser = document.getElementById("username");
	//var mostrarclave = document.getElementById("clave");
	//var mostrarpunt = document.getElementById("puntuacionMax");
    if (logedUser == "") {
    	if (canvas != null) {
    		// Estan en la pagina de play
    		canvas.style.display = "none";
    		alert("Debes estar registrado y logeado para jugar");
        	window.location.href = "index.html";
    	} else if (perfilbox != null) {
    		perfilbox.style.display = "none";
    		alert("Debes estar registrado y logeado para ver esta página");
        	window.location.href = "index.html";
    	}
    } else {
    	//alert("Tu id es " + logedUser + "!");
    	if (loginbox != null) {
    		// Estan en la pantalla de login, logeados
    		loginbox.style.display = "none";
    		logedin.style.display = "initial";
    	} else if (perfilbox != null) {
    		// Estan en la pantalla de perfil, logeados
    		$.ajax({
    	        method: 'GET',
    	        url: 'http://localhost:8181/perfil/' + logedUser,
    	        headers: {
    	            "Content-Type": "application/json"
    	        }
    	    }).done(function (datos) {
    	        if (datos != null) {
    	        	 $('#username').append("<b>Username:</b> " + datos.nombre);
    	        	 $('#clave').append("<b>Clave:</b> " + datos.clave);
    	        	 $('#puntuacionMax').append("<b>Puntuación máxima:</b> " + datos.puntuacionMax);
    	        }
    	    });
    	}
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
                window.location.href = "index.html";
            }
            return true;
        } else {
            alert("Incorrect name or password");
            return false;
        }
    });
}
function toPlay() {
	// Comprueba que esta logeado
	var logedUser = getCookie("logedAs");
	if (logedUser != "") {
		window.location.href = "game.html";
	}
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

function logout() {
	var logedUser = getCookie("logedAs");
	if (logedUser != null) {
		delete_cookie("logedAs");
		window.location.href = "index.html";
	}
}