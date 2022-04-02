var UrlMateriales = ' http://52.152.236.67:90/G6_20/controller/materiales.php?op=Getmateriales';
var UrlPostMaterial = ' http://52.152.236.67:90/G6_20/controller/materiales.php?op=Insertmaterial';
var UrlGetMaterial = ' http://52.152.236.67:90/G6_20/controller/materiales.php?op=Getmaterial';
var UrlPutMaterial = ' http://52.152.236.67:90/G6_20/controller/materiales.php?op=Updatematerial';
var UrlDelMaterial = ' http://52.152.236.67:90/G6_20/controller/materiales.php?op=Deletematerial';
$(document).ready(function(){
CargarMateriales();
});

function CargarMateriales(){
    $.ajax({
        url: UrlMateriales,
        type: 'GET',
        datatype: 'JSON',
        success: function(reponse){
            var MiItems = reponse;
            var Valores='';

            for( i=0; i < MiItems.length; i++){
                Valores += '<tr>'+
                '<td>'+ MiItems[i].ID +'</td>'+
                '<td>'+ MiItems[i].DESCRIPCION +'</td>'+
                '<td>'+ MiItems[i].UNIDAD +'</td>'+
                '<td>'+ MiItems[i].COSTO +'</td>'+
                '<td>'+ MiItems[i].PRECIO +'</td>'+
                '<td>'+ MiItems[i].APLICA_ISV +'</td>'+
                '<td>'+ MiItems[i].PORCENTAJE_ISV +'</td>'+
                '<td>'+ MiItems[i].ESTADO +'</td>'+
                '<td>'+ MiItems[i].ID_SOCIO +'</td>'+
                '<td>'+
                    '<button class="btn btn-success" onclick="CargarMaterial('+ MiItems[i].ID+')">Editar</button>'+
                    '<button class="btn btn-danger" onclick="EliminarMaterial('+ MiItems[i].ID+')">Eliminar</button>'+
                '</td>'+
            '</tr>'; 
            $('.Materiales').html(Valores);  
            }
           

        }
    });

}

function AgregarMaterial(){
    var datosmaterial={
        DESCRIPCION:$('#DESCRIPCION').val(),
        UNIDAD:$('#UNIDAD').val(),
        COSTO:$('#COSTO').val(),
        PRECIO:$('#PRECIO').val(),
        APLICA_ISV:$('#APLICA_ISV').val(),
        PORCENTAJE_ISV:$('#PORCENTAJE_ISV').val(),
        ESTADO:$('#ESTADO').val(),
        ID_SOCIO:$('#ID_SOCIO').val()
    };
    var datosmaterialjson = JSON.stringify(datosmaterial);
    $.ajax({
        url: UrlPostMaterial,
        type: 'POST',
        data: datosmaterialjson,
        dataType: 'JSON',
        contenttype:'application/json',
        success: function(response){
            console.log(response);
        },
        error: function(){
            alert('Error al Insertar Material');
        }
    });
    alert ('Material Agregado Correctamente');
}


function CargarMaterial(IDMaterial){
    var datosmateriales={
        ID:IDMaterial
    };
    var datosmaterialesjson = JSON.stringify(datosmateriales);
    $.ajax({
        url: UrlGetMaterial,
        type: 'POST',
        data: datosmaterialesjson,
        dataType: 'JSON',
        contenttype:'application/json',
        success: function(response){
            var MiItems = response;
            $('#DESCRIPCION').val(MiItems[0].DESCRIPCION);
            $('#UNIDAD').val(MiItems[0].UNIDAD);
            $('#COSTO').val(MiItems[0].COSTO);
            $('#PRECIO').val(MiItems[0].PRECIO);
            $('#APLICA_ISV').val(MiItems[0].APLICA_ISV);
            $('#PORCENTAJE_ISV').val(MiItems[0].PORCENTAJE_ISV);
            $('#ESTADO').val(MiItems[0].ESTADO);
            $('#ID_SOCIO').val(MiItems[0].ID_SOCIO);
            var btnactualizar ='<input type="submit" id="btn_actualizar" onclick="ActualizarMaterial('+MiItems[0].ID+')"'+
            'value="Actualizar Material" class="btn btn-warning"></input>';
            $('.btnmaterial').html(btnactualizar);
        }
    });
}

function ActualizarMaterial(IDMaterial){
    var datosmateriales={
        ID:IDMaterial,
        DESCRIPCION:$('#DESCRIPCION').val(),
        UNIDAD:$('#UNIDAD').val(),
        COSTO:$('#COSTO').val(),
        PRECIO:$('#PRECIO').val(),
        APLICA_ISV:$('#APLICA_ISV').val(),
        PORCENTAJE_ISV:$('#PORCENTAJE_ISV').val(),
        ESTADO:$('#ESTADO').val(),
        ID_SOCIO:$('#ID_SOCIO').val()
    };
    var datosmaterialjson = JSON.stringify(datosmateriales);
    $.ajax({
        url: UrlPutMaterial,
        type: 'PUT',
        data: datosmaterialjson,
        dataType: 'JSON',
        contenttype:'application/json',
        success: function(response){
            console.log(response);
        }
    });
    alert("Material Actualizado Correctamente");
}

function EliminarMaterial(IDMaterial){
    var datosmateriales={
        ID:IDMaterial
    };
    var datosmaterialjson = JSON.stringify(datosmateriales);
    $.ajax({
        url: UrlDelMaterial,
        type: 'DELETE',
        data: datosmaterialjson,
        dataType: 'JSON',
        contenttype:'application/json',
        success: function(response){
            console.log(response);
        }
    });
    alert("Material Eliminado Correctamente");
    CargarMateriales(); 
}
