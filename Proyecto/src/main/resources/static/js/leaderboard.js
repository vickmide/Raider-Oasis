$(document).ready(function() {
	$.ajax({
        method: "GET",
        url: 'http://localhost:8181/perfil/leaderboard'
    }).done(function (perfiles) {
        console.log(JSON.stringify(perfiles));
            $('#tablebod').append(
            '<tr class="active"><td>Name</td><td>Score</td></tr>')
    });
});