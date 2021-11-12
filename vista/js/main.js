$(document).ready(function() {
    cargarTablaUsuarios();



    // //
    // $("#txt_tipodocumento").change(function(){
    //     var tipoUsuario = $(this).val();
    //     var salarioHora = 0;
    //     var salarioDia = 0;
    //     var salarioMes = 0;
    //     var nombreTipoUsuario = "";

    //     if (tipoUsuario == "1"){
    //         salarioHora = 12500;
    //         nombreTipoUsuario = "junior";
    //     } else if (tipoUsuario == "2"){
    //         salarioHora = 18000;
    //         nombreTipoUsuario = "master";
    //     }else{
    //         salarioHora = 23000;
    //         nombreTipoUsuario = "senior";
    //     }

    //     salarioDia = salarioHora * 8;
    //     salario = salarioDia * 25;

    // })
    //


    $("#btnGuardarUsuario").click(function() {
        var nivel = $("#txt_nivel").val();
        var tipodocumento = $("#txt_tipodocumento").val();
        var numerodocumento = $("#txt_numerodocumento").val();
        var nombres = $("#txt_nombres").val();
        var apellidos = $("#txt_apellidos").val();
        var salario = $("#txt_salario").val();
        
        

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
            success: function(respuesta) {
                alert(respuesta);
                cargarTablaUsuarios();
            }
        })
    })


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
            success: function(respuesta) {
                var interface = '';
                var contadorUsuarios = 0;
                respuesta.forEach(cargarCuerpoTabla);

                function cargarCuerpoTabla(item, index) {
                    var objBotones = '';
                    objBotones += '<div class="btn-group">';
                    objBotones += '<button id="btn-editar" data-toggle="modal" data-target="#ventanaEditarUsuarios" idusuario="' + item.idusuario + '" nombres="' + item.nombres + '" apellidos="' + item.apellidos + '" direccion="' + item.direccion + '" telefono="' + item.telefono + '"  title="editar" type="button" class="btn btn-warning"><span class="glyphicon glyphicon-pencil"></span></button>';
                    objBotones += '<button id="btn-eliminar" idUsuario="' + item.idusuario + '"  title="eliminar" type="button" class="btn btn-danger"><span class="glyphicon glyphicon-remove"></span></button>';
                    objBotones += '</div>';


                    contadorUsuarios += 1;
                    interface += '<tr>';
                    interface += '<td>' + contadorUsuarios + '</td>';
                    interface += '<td>' + item.nivel + '</td>';
                    interface += '<td>' + item.tipodocumento + '</td>';
                    interface += '<td>' + item.numerodocumento + '</td>';
                    interface += '<td>' + item.nombres + '</td>';
                    interface += '<td>' + item.apellidos + '</td>';
                    interface += '<td>' + item.salario + '</td>';
                    interface += '<td>' + objBotones + '</td>';
                    interface += '</tr>';
                }

                $("#cuerpoTablaUsuarios").html(interface);
            }
        })
    }




    // $("#tablaListaUsuarios").on("click", "#btn-editar", function() {
    //     var idUsuario = $(this).attr("idusuario");
    //     var nombres = $(this).attr("nombres");
    //     var apellidos = $(this).attr("apellidos");
    //     var direccion = $(this).attr("direccion");
    //     var telefono = $(this).attr("telefono");

    //     $("#txt_editnombres").val(nombres);
    //     $("#txt_editapellidos").val(apellidos);
    //     $("#txt_editdireccion").val(direccion);
    //     $("#txt_edittelefono").val(telefono);
    //     $("#btnEditarUsuario").attr("idusuario", idUsuario);
    // })

    $("#tablaListaUsuarios").on("click", "#btn-eliminar", function() {
        var idUsuario = $(this).attr("idUsuario");

        swal({
                title: "¡Advertencia!",
                text: "¿Esta seguro de eliminar este registro?",
                icon: "warning",
                buttons: {
                    cancel: "Cancelar",
                    defeat: "Aceptar"
                },
                dangerMode: true,
            })
            .then((willDelete) => {
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
                        success: function(respuesta) {
                            swal(respuesta, {
                                icon: "success",
                            });

                            cargarTablaUsuarios();
                        }
                    })
                } else {
                    swal("Esta acción ha sido cancelada");
                }
            });

    })








    // $("#btnEditarUsuario").click(function() {
    //     var idUsuario = $(this).attr("idusuario");
    //     var nombres = $("#txt_editnombres").val();
    //     var apellidos = $("#txt_editapellidos").val();
    //     var telefono = $("#txt_edittelefono").val();
    //     var direccion = $("#txt_editdireccion").val();

    //     var objData = new FormData();
    //     objData.append("edit_nombres", nombres);
    //     objData.append("edit_apellidos", apellidos);
    //     objData.append("edit_telefono", telefono);
    //     objData.append("edit_direccion", direccion);
    //     objData.append("edit_idUsuario", idUsuario);

    //     $.ajax({
    //         url: "control/usuariosControl.php",
    //         type: "post",
    //         dataType: "json",
    //         data: objData,
    //         cache: false,
    //         contentType: false,
    //         processData: false,
    //         success: function(respuesta) {
    //             $("#ventanaEditarUsuarios").modal('toggle');
    //             alert(respuesta);
    //             cargarTablaUsuarios();
    //         }
    //     })


    // })





})