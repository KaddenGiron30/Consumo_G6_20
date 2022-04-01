var UrlFacturas = 'http://52.152.236.67:90/G6_20/controller/Facturas_Cliente.php?op=GetFacturas';
var UrlPostFactura = 'http://52.152.236.67:90/G6_20/controller/Facturas_Cliente.php?op=InsertFactura';
var UrlGetFactura = 'http://52.152.236.67:90/G6_20/controller/Facturas_Cliente.php?op=GetFactura';
var UrlPutFactura = 'http://52.152.236.67:90/G6_20/controller/Facturas_Cliente.php?op=UpdateFactura';
var UrlDelFactura = 'http://52.152.236.67:90/G6_20/controller/Facturas_Cliente.php?op=DeleteFactura';
$(document).ready(function(){
CargarFacturas();
});
//funcion para cargar los datos
function CargarFacturas(){
    $.ajax({
        url: UrlFacturas,
        type: 'GET',
        datatype: 'JSON',
        success: function (response){
            var MiItems=response;
            var Valores='';

            for(i=0; i < MiItems.length; i++){
                Valores += '<tr>' +
                '<td>'+ MiItems[i].ID +'</td>'+
                '<td>'+ MiItems[i].NUMERO_FACTURA +'</td>'+
                '<td>'+ MiItems[i].ID_SOCIO +'</td>'+
                '<td>'+ MiItems[i].FECHA_FACTURA +'</td>'+
                '<td>'+ MiItems[i].DETALLE +'</td>'+
                '<td>'+ MiItems[i].SUB_TOTAL +'</td>'+
                '<td>'+ MiItems[i].TOTAL_ISV +'</td>'+
                '<td>'+ MiItems[i].TOTAL +'</td>'+
                '<td>'+ MiItems[i].FECHA_VENCIMIENTO+'</td>'+
                '<td>'+ MiItems[i].ESTADO +'</td>'+
                '<td>'+
                    '<button class="btn btn-success" onclick="CargarFactura('+ MiItems[i].ID+')">Editar</button>'+
                    '<button class="btn btn-danger" onclick="EliminarFactura('+ MiItems[i].ID+')">Eliminar</button>'+
                '</td>'+
            '</tr>';
            $('.Facturas').html(Valores);
            }
        }
    });
}
//funcion para insertar datos
function AgregarFactura(){
    var datosfactura={
        NUMERO_FACTURA:$('#NUMERO_FACTURA').val(),
        ID_SOCIO:$('#ID_SOCIO').val(),
        FECHA_FACTURA:$('#FECHA_FACTURA').val(),
        DETALLE:$('#DETALLE').val(),
        SUB_TOTAL:$('#SUB_TOTAL').val(),
        TOTAL_ISV:$('#TOTAL_ISV').val(),
        TOTAL:$('#TOTAL').val(),
        FECHA_VENCIMIENTO:$('#FECHA_VENCIMIENTO').val(),
        ESTADO:$('#ESTADO').val()
    };
    var datosfacturajson = JSON.stringify(datosfactura);
    $.ajax({
        url: UrlPostFactura,
        type: 'POST',
        data: datosfacturajson,
        dataType: 'JSON',
        contenttype:'application/json',
        success: function(response){
            console.log(response);
        },
        error: function(){
            alert('Error al Insertar Factura');
        }
    });
    alert ("Factura Agregada Correctamente");
}
//funcion para obtener datos especifico segun el parametro ID
function CargarFactura(IDFactura){
    var datosfacturas={
        ID:IDFactura
    };
    var datosfacturasjson = JSON.stringify(datosfacturas);
    $.ajax({
        url: UrlGetFactura,
        type: 'POST',
        data: datosfacturasjson,
        dataType: 'JSON',
        contenttype:'application/json',
        success: function(response){
            var MiItems = response;
            $('#NUMERO_FACTURA').val(MiItems[0].NUMERO_FACTURA);
            $('#ID_SOCIO').val(MiItems[0].ID_SOCIO);
            $('#FECHA_FACTURA').val(MiItems[0].FECHA_FACTURA);
            $('#DETALLE').val(MiItems[0].DETALLE);
            $('#SUB_TOTAL').val(MiItems[0].SUB_TOTAL);
            $('#TOTAL_ISV').val(MiItems[0].TOTAL_ISV);
            $('#TOTAL').val(MiItems[0].TOTAL);
            $('#FECHA_VENCIMIENTO').val(MiItems[0].FECHA_VENCIMIENTO);
            $('#ESTADO').val(MiItems[0].ESTADO);
            var btnactualizar ='<input type="submit" id="btn_actualizar" onclick="ActualizarFactura('+MiItems[0].ID+')"'+
            'value="Actualizar Factura" class="btn btn-warning"></input>';
            $('.btnfactura').html(btnactualizar);
        }
    });
}
//función para actualizar los datos de las facturas cliente
function ActualizarFactura(IDFactura){
    var datosfacturas={
        ID:IDFactura,
        NUMERO_FACTURA:$('#NUMERO_FACTURA').val(),
        ID_SOCIO:$('#ID_SOCIO').val(),
        FECHA_FACTURA:$('#FECHA_FACTURA').val(),
        DETALLE:$('#DETALLE').val(),
        SUB_TOTAL:$('#SUB_TOTAL').val(),
        TOTAL_ISV:$('#TOTAL_ISV').val(),
        TOTAL:$('#TOTAL').val(),
        FECHA_VENCIMIENTO:$('#FECHA_VENCIMIENTO').val(),
        ESTADO:$('#ESTADO').val()
    };
    var datosfacturajson = JSON.stringify(datosfacturas);
    $.ajax({
        url: UrlPutFactura,
        type: 'PUT',
        data: datosfacturajson,
        dataType: 'JSON',
        contenttype:'application/json',
        success: function(response){
            console.log(response);
        }
    });
    alert("Factura Actualizada Correctamente");
    CargarFacturas();
}
//funcion para eliminar facturas
function EliminarFactura(IDFactura){
    var datosfacturas={
        ID:IDFactura
    };
    var datosfacturajson = JSON.stringify(datosfacturas);
    $.ajax({
        url: UrlDelFactura,
        type: 'DELETE',
        data: datosfacturajson,
        dataType: 'JSON',
        contenttype:'application/json',
        success: function(response){
            console.log(response);
        }
    });
    alert("Factura Eliminada Correctamente");
    CargarFacturas(); // para volver a cargar los datos
}