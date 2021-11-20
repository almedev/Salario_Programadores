$(document).ready(function () {
    cargarTablaUsuarios();
    $("#imagen").hide(); //oculta el img, y se muestra al cargar la pagina

   

    $("#btnGuardarUsuario").click(function () {
        var nivel = $("#txt_nivel").val();
        var tipodocumento = $("#txt_tipodocumento").val();
        var numerodocumento = $("#txt_numerodocumento").val();
        var nombres = $("#txt_nombres").val();
        var apellidos = $("#txt_apellidos").val();
        var salario = $("#txt_nivel").val();
        var salariodia = 0;
        var salariomes = 0;


        if (salario == "Junior") {
            salariohora = 12500;
        } else if (salario == "Master") {
            salariohora = 18000;

        } else {
            salariohora = 23000;

        }

        salariodia = (salariohora * 8);
        salariomes = (salariodia * 25);
        salario = salariomes;

        var objData = new FormData();
        objData.append("nivel", nivel);
        objData.append("tipodocumento", tipodocumento);
        objData.append("numerodocumento", numerodocumento);
        objData.append("nombres", nombres);
        objData.append("apellidos", apellidos);
        objData.append("salario", salario);

        $.ajax({
            url: "control/usuariosControl.php",
            type: "post",
            dataType: "json",
            data: objData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {
                alert(respuesta);
                cargarTablaUsuarios();
            },
        });
    });

    function cargarTablaUsuarios() {
        var cargarDatos = "ok";
        var objData = new FormData();
        objData.append("cargarDatos", cargarDatos);
        $.ajax({
            url: "control/usuariosControl.php",
            type: "post",
            dataType: "json",
            data: objData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {
                var interface = "";
                var contadorUsuarios = 0;
                respuesta.forEach(cargarCuerpoTabla);

                function cargarCuerpoTabla(item, index) {
                    var objBotones = "";
                    objBotones += '<div class="btn-group">';
                    objBotones +=
                        '<button id="btn-editar" data-toggle="modal" data-target="#ventanaEditarUsuarios" idusuario="' +
                        item.idusuario +
                        '" nivel="' +
                        item.nivel +
                        '" tipodocumento="' +
                        item.tipodocumento +
                        '" numerodocumento="' +
                        item.numerodocumento +
                        '" nombres="' +
                        item.nombres +
                        '" apellidos="' +
                        item.apellidos +
                        
                        '"  title="editar" type="button" class="btn btn-warning"><span class="glyphicon glyphicon-pencil"></span></button>';
                    objBotones +=
                        '<button id="btn-eliminar" idUsuario="' +
                        item.idusuario +
                        '"  title="eliminar" type="button" class="btn btn-danger"><span class="glyphicon glyphicon-remove"></span></button>';
                    objBotones += "</div>";

                    contadorUsuarios += 1;
                    interface += "<tr>";
                    interface += "<td>" + contadorUsuarios + "</td>";
                    interface += "<td>" + item.nivel + "</td>";
                    interface += "<td>" + item.tipodocumento + "</td>";
                    interface += "<td>" + item.numerodocumento + "</td>";
                    interface += "<td>" + item.nombres + "</td>";
                    interface += "<td>" + item.apellidos + "</td>";
                    interface += "<td>" + item.salario + "</td>";
                    interface += "<td>" + objBotones + "</td>";
                    interface += "</tr>";
                }

                $("#cuerpoTablaUsuarios").html(interface);
            },
        });
    }

    $("#tablaListaUsuarios").on("click", "#btn-editar", function () {
        var idUsuario = $(this).attr("idusuario");
        var nivel = $(this).attr("nivel");
        var tipodocumento = $(this).attr("tipodocumento");
        var numerodocumento = $(this).attr("numerodocumento");
        var nombres = $(this).attr("nombres");
        var apellidos = $(this).attr("apellidos");
       

        $("#txt_editnivel").val(nivel);
        $("#txt_edittipodocumento").val(tipodocumento);
        $("#txt_editnumerodocumento").val(numerodocumento);
        $("#txt_editnombres").val(nombres);
        $("#txt_editapellidos").val(apellidos);
       
        $("#btnEditarUsuario").attr("idusuario", idUsuario);
    });

    $("#tablaListaUsuarios").on("click", "#btn-eliminar", function () {
        var idUsuario = $(this).attr("idUsuario");

        swal({
            title: "¡Advertencia!",
            text: "¿Esta seguro de eliminar este registro?",
            icon: "warning",
            buttons: {
                cancel: "Cancelar",
                defeat: "Aceptar",
            },
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                var objData = new FormData();
                objData.append("elim_idUsuario", idUsuario);
                $.ajax({
                    url: "control/usuariosControl.php",
                    type: "post",
                    dataType: "json",
                    data: objData,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (respuesta) {
                        swal(respuesta, {
                            icon: "success",
                        });

                        cargarTablaUsuarios();
                    },
                });
            } else {
                swal("Esta acción ha sido cancelada");
            }
        });
    });

    $("#btnEditarUsuario").click(function () {
        var idUsuario = $(this).attr("idusuario");
        var nivel = $("#txt_editnivel").val();
        var tipodocumento = $("#txt_edittipodocumento").val();
        var numerodocumento = $("#txt_editnumerodocumento").val();
        var nombres = $("#txt_editnombres").val();
        var apellidos = $("#txt_editapellidos").val();
        var salario = $("#txt_editnivel").val();

        var salariodia = 0;
        var salariomes = 0;
       

        if (salario == "Junior") {
            salariohora = 12500;
        } else if (salario == "Master") {
            salariohora = 18000;

        } else {
            salariohora = 23000;

        }

        salariodia = (salariohora * 8);
        salariomes = (salariodia * 25);
        salario = salariomes;

        var objData = new FormData();
        objData.append("edit_nivel", nivel);
        objData.append("edit_tipodocumento", tipodocumento);
        objData.append("edit_numerodocumento", numerodocumento);
        objData.append("edit_nombres", nombres);
        objData.append("edit_apellidos", apellidos);
        objData.append("salario", salario);
        objData.append("edit_idUsuario", idUsuario);

        $.ajax({
            url: "control/usuariosControl.php",
            type: "post",
            dataType: "json",
            data: objData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {
                $("#ventanaEditarUsuarios").modal("toggle");
                alert(respuesta);
                cargarTablaUsuarios();
            },
        });
    });


    $("#txt_img").change(function() {
        //cuando detecta un cambio en la clase txt_img
        $("#imagen").show(); //muestra el archivo cuando se cargue (change)
        const seleccionArchivo = document.querySelector("#txt_img");
        const imagenPrevisualizacion = document.querySelector("#imagen");
        const archivo = seleccionArchivo.files;

        if (!archivo || !archivo.length) {
            imagenPrevisualizacion.src = "";
            return;
        } else {
            const objUrl = URL.createObjectURL(archivo[0]);
            imagenPrevisualizacion.src = objUrl;
        }
    });

    $("#btnGuardarUsuario").click(function() { //OJOJOJOJOJOJOJOJOJOJOJOJOJ
        var imagen = document.getElementById("txt_img").files[0];
        var objData = new FormData();
        objData.append("imagen", imagen);

        $.ajax({
            url: "control/imagenControl.php",
            method: "POST",
            data: objData,
            cache: false,
            contentType: false,
            processData: false,
            dataType: "json",
            success: function(respuesta) {
                alert(respuesta);

            },
        });

    });

});
