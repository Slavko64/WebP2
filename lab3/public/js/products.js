$(document).ready(function() {
    fillTable();
    $(`#createProductButton`).on(`click`, createProduct);
    $(`#productsList tbody`).on('click', 'tr button.btn-danger', deleteProduct);
    $(`#productsList tbody`).on('click', 'tr button.btn-edit', editProduct);
    $(`#findProductButton`).on('click', findProduct);
    $(`#productsList tbody`).on('click', 'tr', showProductInfo);
});

function fillTable() {
    $(`#productsInfoId`).text('');
    $(`#productsInfoCode`).text('');
    $(`#productsInfoName`).text('');
    $(`#productsInfoCountry`).text('');
    let tableContent = '';
    $.getJSON('/service/products', function(data) {
        $.each(data, function() {
            tableContent += `<tr id="${this.id}">`;
            tableContent += `<td>${this.id}</td>`;
            tableContent += `<td>${this.code}</td>`;
            tableContent += `<td>${this.name}</td>`;
            tableContent += `<td>${this.country}</td>`;
            tableContent += `<td><button type="button" class="btn btn-danger">Видалити</button></td>`
            tableContent += `<td><button type="button" class="btn btn-edit">Редагувати</button></td>`
            tableContent += `</tr>`;
        });
        $(`#productsList tbody`).html(tableContent);
    });
}


function createProduct(event) {
    event.preventDefault();
    let id = $(`#inputId`).val();
    let code = $('#inputCode').val();
    let name = $(`#inputName`).val();
    let country = $(`#inputCountry`).val();
    if (!id.trim().length || !code.trim().length || !name.trim().length || !country.trim().length ) {
        alert(`Будь ласка,заповніть всі поля`);
        return;
    }
    $.ajax({
        url: `/service/products`,
        type: `POST`,
        data: {id: id, code:code, name: name, country: country},
        success: function(result) {
            alert(result);
            fillTable();
        }
    });
}

function showProductInfo(event) {
    event.preventDefault();
    let productId = $(this).attr("id");
    $.getJSON(`/service/products/${productId}`, function(data) {
        $(`#productsInfoId`).text(data.id);
        $(`#productsInfoCode`).text(data.code);
        $(`#productsInfoName`).text(data.name);
        $(`#productsInfoMass`).text(data.country);
    });
}

function deleteProduct(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    let data = $(this).parent().parent();
    let id = $(data).find(`td:nth-child(1)`).text();
    $.ajax({
        url: `/service/products/${id}`,
        type: `DELETE`,
        success: function(result) {
            alert(result);
            fillTable();
        }
    });
    
}

function findProduct(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    let data = $(this).parent().parent();
    let id = $(data).find(`td:nth-child(1)`).text();
    let id1 = $(`#inputWhatToFind`).val();
        $.ajax({
            url: `/service/products/${id1}`,
            type: `GET`,
            data: {id: id1},
            success: function(result) {
                alert(result);
                fillTable();
            }
        });
}

function editProduct(event) {
    event.preventDefault();
    let data = $(this).parent().parent();
    let id = $(data).find(`td:nth-child(1)`).text();
    let code = $(`#inputCode`).val();
    let name = $(`#inputName`).val();
    let country = $(`#inputCountry`).val();
    // if ( !name.trim().length || !mass.trim().length || !capacity.trim().length) {
    //     alert(`Please, fill in all of the fields`);
    //     return;
    // }
    $.ajax({
        url: `/service/products/${id}`,
        type: `POST`,
        data: {id: id, code:code, name: name, country: country},
        success: function(result) {
            alert(result);
            fillTable();
        }
    });
}