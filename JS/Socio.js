var UrlSocios = 'http://52.152.236.67:90/G6_20/controller/socio_negocio.php?op=GetSocios';
var UrlPostSocio = 'http://52.152.236.67:90/G6_20/controller/socio_negocio.php?op=InsertSocio';
var UrlGetSocio = 'http://52.152.236.67:90/G6_20/controller/socio_negocio.php?op=GetSocio';
var UrlPutSocio = 'http://52.152.236.67:90/G6_20/controller/socio_negocio.php?op=UpdateSocio';
var UrlDelSocio = 'http://52.152.236.67:90/G6_20/controller/socio_negocio.php?op=DeleteSocio';

$(document).ready(function(){
CargarSocios();
});
//Funcion para cargar los socios
function CargarSocios(){
    $.ajax({
        url: UrlSocios,
        type: 'GET',
        datatype: 'JSON',
        success: function(response){
            var MiItems = response;
            var Valores='';

            for(i=0; i < MiItems.length; i++){
                Valores += '<tr>'+
                '<td>'+ MiItems[i].ID +'</td>'+
                '<td>'+ MiItems[i].NOMBRE +'</td>'+
                '<td>'+ MiItems[i].RAZON_SOCIAL +'</td>'+
                '<td>'+ MiItems[i].DIRECCION +'</td>'+
                '<td>'+ MiItems[i].TIPO_SOCIO +'</td>'+
                '<td>'+ MiItems[i].CONTACTO +'</td>'+
                '<td>'+ MiItems[i].EMAIL +'</td>'+
                '<td>'+ MiItems[i].FECHA_CREADO +'</td>'+
                '<td>'+ MiItems[i].ESTADO +'</td>'+
                '<td>'+ MiItems[i].TELEFONO +'</td>'+
                '<td>'+
                '<button class="btn btn-info" onclick="CargarSocio('+ MiItems[i].ID +')">Editar</button>'+
                '<button class="btn btn-danger" id="btnEliminar" onclick="EliminarSocios('+ MiItems [i].ID+')">Eliminar</button>'+
                '<td>'+
            '</tr>'; 
            $('.Socios').html(Valores);
            }
        }
    });

}
//Funcion para Agregar Socios
function AgregarSocio(){
    var datossocio = {
        NOMBRE:$('#NOMBRE').val(),
        RAZON_SOCIAL:$('#RAZON_SOCIAL').val(),
        DIRECCION:$('#DIRECCION').val(),
        TIPO_SOCIO:$('#TIPO_SOCIO').val(),
        CONTACTO:$('#CONTACTO').val(),
        EMAIL:$('#EMAIL').val(),
        FECHA_CREADO:$('#FECHA_CREADO').val(),
        ESTADO:$('#ESTADO').val(),
        TELEFONO:$('#TELEFONO').val()
    };
    var datossociojson = JSON.stringify(datossocio);
    $.ajax({
        url: UrlPostSocio,
        type: 'POST',
        data: datossociojson,
        dataType: 'JSON',
        contenttype: 'application/json',
        success: function(response){
            console.log(response);
        },
        error: function(){
            alert('Error al Crear Socio');
        }
    });
    alert('Socio Agregado');
}
// Funcion para extraer un Socio
function CargarSocio(idsocio){
    var datossocio = {
        ID: idsocio
    };
    var datossociojson = JSON.stringify(datossocio);

    $.ajax({
        url: UrlGetSocio,
        type: 'POST',
        data: datossociojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (response) {
            var MiItems = response;
            $('#NOMBRE').val(MiItems[0].NOMBRE);
            $('#RAZON_SOCIAL').val(MiItems[0].RAZON_SOCIAL);
            $('#DIRECCION').val(MiItems[0].DIRECCION);
            $('#TIPO_SOCIO').val(MiItems[0].TIPO_SOCIO);
            $('#CONTACTO').val(MiItems[0].CONTACTO);
            $('#EMAIL').val(MiItems[0].EMAIL);
            $('#FECHA_CREADO').val(MiItems[0].FECHA_CREADO);
            $('#ESTADO').val(MiItems[0].ESTADO);
            $('#TELEFONO').val(MiItems[0].TELEFONO);
            var btnactualizar = '<input type="submit" id="btnActualizar" onclick="ActualizarSocio('+MiItems[0].ID+')" value="Actualizar Socio" class="btn btn-info">';
            $('.btnsocio').html(btnactualizar);
        }
    });
}
// Funcion para actualizar los socios
function ActualizarSocio(idsocio){
    var datossocio = {
        ID: idsocio,
        NOMBRE:$('#NOMBRE').val(),
        RAZON_SOCIAL:$('#RAZON_SOCIAL').val(),
        DIRECCION:$('#DIRECCION').val(),
        TIPO_SOCIO:$('#TIPO_SOCIO').val(),
        CONTACTO:$('#CONTACTO').val(),
        EMAIL:$('#EMAIL').val(),
        FECHA_CREADO:$('#FECHA_CREADO').val(),
        ESTADO:$('#ESTADO').val(),
        TELEFONO:$('#TELEFONO').val()
    };
    var datossociojson = JSON.stringify(datossocio);
    $.ajax({
        url: UrlPutSocio,
        type: 'PUT',
        data: datossociojson,
        dataType: 'JSON',
        contenttype: 'application/json',
        success: function(response){
            console.log(response);
        },
        error: function(){
            alert('Error al Actualizar Socio');
        }
    });
    alert('Socio Actualizado');
}
// Funcion para eliminar socios
function EliminarSocios(idsocio){
    var datossocio = {
        ID: idsocio
    };
    var datossociojson = JSON.stringify(datossocio);
    $.ajax({
        url: UrlDelSocio,
        type: 'DELETE',
        data: datossociojson,
        dataType: 'JSON',
        contenttype: 'application/json',
        success: function(response){
            console.log(response);
        },
    });
    alert('Socio Eliminado');
    CargarSocios();
}