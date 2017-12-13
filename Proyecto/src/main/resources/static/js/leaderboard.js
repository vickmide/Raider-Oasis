$(document).ready(function() {
    var d = "";
	$.ajax({
        url: 'http://localhost:8181/perfil/leaderboard'
    }).done(function (datos) {
        for (var i = 0; i < datos.length; i++) {
             
            d += '<tr>'+
            '<td>'+datos[i].nombre+'</td>'+
            '<td>'+datos[i].puntuacionMax+'</td>'+
            '</tr>';
            }
            //console.log(JSON.stringify(datos));
            //console.log(d);
            $('#tablebod').append(d);
    });
});