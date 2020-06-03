$(document).ready(function() {
    fillTable();
    $(`#createShopsButton`).on(`click`, createShops);
    $(`#shopsList tbody`).on('click', 'tr button.btn-danger', deleteShops);
    $(`#shopsList tbody`).on('click', 'tr', showShopsInfo);
    $(`#shopsList tbody`).on('click', 'tr button.btn-edit', editShops);
    $(`#findShopsButton`).on('click', findShops);
});

function fillTable() {
    $(`#ShopsInfoId`).text('');
    $(`#ShopsInfoName`).text('');
    $(`#ShopsInfoAddress`).text('');
    $(`#ShopsInfoCapacity`).text('');
    let tableContent = '';
    $.getJSON('/service/shops', function(data) {
        $.each(data, function() {
            tableContent += `<tr id="${this.id}">`;
            tableContent += `<td>${this.id}</td>`;
            tableContent += `<td>${this.name}</td>`;
            tableContent += `<td>${this.address}</td>`;
            tableContent += `<td>${this.capacity}</td>`;
            tableContent += `<td><button type="button" class="btn btn-danger">Delete</button></td>`
            tableContent += `<td><button type="button" class="btn btn-edit">Edit</button></td>`
            tableContent += `</tr>`;
        });
        $(`#shopsList tbody`).html(tableContent);
    });
}

function createShops(event) {
    event.preventDefault();
    let id = $(`#inputId`).val();
    let name = $(`#inputName`).val();
    let address = $(`#inputAddress`).val();
    let capacity = $(`#inputCapacity`).val();
    if (!id.trim().length || !name.trim().length || !address.trim().length || !capacity.trim().length) {
        alert(`Заповніть всі поля`);
        return;
    }
    $.ajax({
        url: `/service/shops`,
        type: `POST`,
        data: {id: id, name: name, address: address, capacity: capacity},
        success: function(result) {
            alert(result);
            fillTable();
        }
    });
}

function showShopsInfo(event) {
    event.preventDefault();
    let Shops = $(this).attr("id");
    $.getJSON(`/service/shops/${Shops}`, function(data) {
        $(`#ShopsInfoId`).text(data.id);
        $(`#ShopsInfoName`).text(data.name);
        $(`#ShopsInfoAddress`).text(data.address);
        $(`#ShopsInfoCapacity`).text(data.capacity);
    });
}

function deleteShops(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    let data = $(this).parent().parent();
    let id = $(data).find(`td:nth-child(1)`).text();
    $.ajax({
        url: `/service/shops/${id}`,
        type: `DELETE`,
        success: function(result) {
            alert(result);
            fillTable();
        }
    });
}



function findShops(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    let data = $(this).parent().parent();
    let id = $(data).find(`td:nth-child(1)`).text();
    let id1 = $(`#inputWhatToFind`).val();
    console.log(id1);
        $.ajax({
            url: `/service/shops/${id1}`,
            type: `GET`,
            data: {id: id1},
            success: function(result) {
                alert(result);
                fillTable();
            }
        });
}

function editShops(event) {
    event.preventDefault();
    let data = $(this).parent().parent();
    let id = $(data).find(`td:nth-child(1)`).text();
    let name = $(`#inputName`).val();
    let address = $(`#inputAddress`).val();
    let capacity = $(`#inputCapacity`).val();
    // if ( !name.trim().length || !mass.trim().length || !capacity.trim().length) {
    //     alert(`Please, fill in all of the fields`);
    //     return;
    // }

    $.ajax({
        url: `/service/shops/${id}`,
        type: `POST`,
        data: {id: id, name:name,address:address, capacity: capacity},
        success: function (result) {
            alert(result);
            fillTable();
        }
    });
}
