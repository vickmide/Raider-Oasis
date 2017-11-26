// Guardar y leer cookies para mantener abierta la sesion

function setCookie(cname,cvalue) {
	
	// No vamos a editar su fecha de borrado (se borra al cerrar el navegador)
    /*var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();*/
	
	// Creamos la cookie (al poner path=/ es accesible desde todas las paginas del dominio)
    document.cookie = cname + "=" + cvalue + ";" + "path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

/*function checkCookie() {
    var user=getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
       user = prompt("Please enter your name:","");
       if (user != "" && user != null) {
           setCookie("username", user);
       }
    }
}*/