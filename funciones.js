
var dbVacas = localStorage.getItem("dbVacas"); //Obtener datos de localStorage
var operacion = "A"; //"A"=agregar; "E"=edtidar
dbVacas = JSON.parse(dbVacas); // Covertir a objeto
if (dbVacas === null) // Si no existe, creamos un array vacio.
    dbVacas = [];


function Mensaje(t){
        switch (t) {
            case 1: //
                $(".mensaje-alerta").append(
                    "<div class='alert alert-success' role='alert'>Se agrego con exito la vaca</div>"
                );
                break;
            case 2: //
                $(".mensaje-alerta").append(
                    "<div class='alert alert-danger' role='alert'>Se elimino la vaca</div>"
                );
                break;
            default:

        }
    }


function AgregarVaca () {
    // Seleccionamos los datos de los inputs de formulario
    var datos_cliente = JSON.stringify({
        Nombre : $("#nombre").val(),
        Correo : $("#correo").val(),
        Peso : $("#peso").val(),
        Fecha_nacimiento : $("#fecha_nacimiento").val(),
    });

    dbVacas.push(datos_cliente); // Guardar datos en el array definido globalmente
    localStorage.setItem("dbVacas", JSON.stringify(dbVacas));



    ListarVacas();


    return Mensaje(1);
}



function ListarVacas (){
    $("#dbVacas-list").html(
            "<thead>" +
                "<tr>" +
                    "<th> ID </th>" +

                    "<th> Nombre </th>" +
                    "<th> Correo </th>" +
                    "<th> Peso </th>" +
                    "<th> fecha_nacimiento </th>" +
                    "<th> </th>" +
                    "<th>  </th>" +
                "</tr>" +
            "</thead>" +
            "<tbody>" +
            "</tbody>"
    );

    for (var i in dbVacas) {
        var d = JSON.parse(dbVacas[i]);
        $("#dbVacas-list").append(
                        "<tr>" +
                            "<td>" + i + "</td>" +
                            "<td>" + d.Nombre + "</td>" +
                            "<td>" + d.Correo + "</td>" +
                            "<td>" + d.Peso + "</td>" +
                            "<td>" + d.Fecha_nacimiento + "</td>" +
                            "<td> <a id='"+ i +"' class='btnEditar' href='#'> <span class='glyphicon glyphicon-pencil'> </span>  </a> </td>" +
                            "<td> <a id='" + i + "' class='btnEliminar' href='#'> <span class='glyphicon glyphicon-trash'> </span> </a> </td>" +
                        "</tr>"
                           );
    }

}


if (dbVacas.length !== 0) {
    ListarVacas();
} else {
    $("#dbVacas-list").append("<h2> No tienes vacas </h2>");
}

function contarVacas(){
    var vacas = dbVacas;
    nVacas = vacas.length;

    $("#numeroVacas").append(
        "<a>Tienes actualmente" + "<br>" + "<span class='badge'>" + nVacas + "</span></a> Vacas"
    );
    return nVacas;
}

function Eliminar(e){
    dbVacas.splice(e, 1); // Args (posición en el array, numero de items a eliminar)
    localStorage.setItem("dbVacas", JSON.stringify(dbVacas));
    return Mensaje(2);
}

function Editar() {
    dbVacas[indice_selecionado] = JSON.stringify({
        Nombre : $("#nombre").val(),
        Correo : $("#correo").val(),
        Peso : $("#peso").val(),
        Fecha_nacimiento : $("#fecha_nacimiento").val(),
    });
    localStorage.setItem("dbVacas", JSON.stringify(dbVacas));
    operacion = "A"; //Regresamos la valor original
    return true;

}

$(".btnEliminar").bind("click", function(){
    alert("¿ Me quieres eliminar ?");
    indice_selecionado = $(this).attr("id"); // "this" contiene el elemento clikeado en el contexto actual
    console.log(indice_selecionado);
    console.log(this);
    Eliminar(indice_selecionado); // Eliminamos el elemento llamando la funcion de eliminar
    ListarVacas();
});

$(".btnEditar").bind("click", function() {
    alert("¿ Me quieres editar ?");
    // Cambiamos el modo
    $(".modo").html("<span class='glyphicon glyphicon-pencil'> </span> Modo edición");
    operacion = "E";
    indice_selecionado = $(this).attr("id");
    console.log(indice_selecionado);
    console.log(this);
    // Llemanos el formulario con los datos actuales de la vaca a editar
    var vacaItem = JSON.parse(dbVacas[indice_selecionado]);
    $("#nombre").val(vacaItem.Nombre);
    $("#correo").val(vacaItem.Correo);
    $("#peso").val(vacaItem.Peso);
    $("#fecha_nacimiento").val(vacaItem.Fecha_nacimiento);
    $("#nombre").focus();
});


contarVacas();
// Esperar el evento de envio del formulario !!
$("#vacas-form").bind("submit", function() {
    debugger;
    if (operacion == "A")
        return AgregarVaca();
    else {
        return Editar();
    }
});
