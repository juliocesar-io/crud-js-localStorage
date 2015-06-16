// Definan las variables globales
var dbPerritos = localStorage.getItem("dbPerritos");
dbPerritos = JSON.parse(dbPerritos);
if (dbPerritos === null)
    dbPerritos = [];

function agregarPerrito() {
    var datoCliente = JSON.stringify({
        nombre: $("#nombre").val(),
        genero: $("input[name='genero']:checked", "#perritos-form").val(),
        fecha_nacimiento: $("#fecha_nacimiento").val(),
        color: $("#color").val(),
        raza: $("#raza").val(),
        codigo: $("#codigo").val()
    });

    dbPerritos.push(datoCliente);
    localStorage.setItem("dbPerritos", JSON.stringify(dbPerritos));
    alert("Se guardo tu perrito con exito");
    return true;
}


// Esperamos por el evento
$("#perritos-form").submit(function () {
    agregarPerrito();
});
