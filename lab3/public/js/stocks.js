$(document).ready(function() {
    fillTable();
    $(`#createStocksButton`).on(`click`, createStocks);
    $(`#stocksList tbody`).on('click', 'tr button.btn-danger', deleteStocks);
    $(`#stocksList tbody`).on('click', 'tr', showStocksInfo);
    $(`#stocksList tbody`).on('click', 'tr button.btn-edit', editStocks);
    $(`#findStocksButton`).on('click', findStocks);
});

function fillTable() {
    $(`#stocksInfoId`).text('');
    $(`#stocksInfoNumber`).text('');
    $(`#stocksInfoShop`).text('');
    $(`#stocksInfoCapacity`).text('');
    let tableContent = '';
    $.getJSON('/service/stocks', function(data) {
        $.each(data, function() {
            tableContent += `<tr id="${this.id}">`;
            tableContent += `<td>${this.id}</td>`;
            tableContent += `<td>${this.number}</td>`;
            tableContent += `<td>${this.shop}</td>`;
            tableContent += `<td>${this.capacity}</td>`;
            tableContent += `<td><button type="button" class="btn btn-danger">Видалити</button></td>`
            tableContent += `<td><button type="button" class="btn btn-edit">Редагувати</button></td>`
            tableContent += `</tr>`;
        });
        $(`#stocksList tbody`).html(tableContent);
    });
}

function createStocks(event) {
    event.preventDefault();
    let id = $(`#inputId`).val();
    let number = $(`#inputNumber`).val();
    let shop = $(`#inputShop`).val();
    let capacity = $(`#inputCapacity`).val();
    if (!id.trim().length || !number.trim().length || !shop.trim().length || !capacity.trim().length) {
        alert(`Будь ласка,заповніть всі поля`);
        return;
    }
    $.ajax({
        url: `/service/stocks`,
        type: `POST`,
        data: {id: id, number: number, shop: shop, capacity: capacity},
        success: function(result) {
            alert(result);
            fillTable();
        }
    });
}

function showStocksInfo(event) {
    event.preventDefault();
    let stocksId = $(this).attr("id");
    $.getJSON(`/service/stocks/${stocksId}`, function(data) {
        $(`#stocksInfoId`).text(data.id);
        $(`#stocksInfoNumber`).text(data.number);
        $(`#stocksInfoShop`).text(data.shop);
        $(`#stocksInfoCapacity`).text(data.capacity);
    });
}

function deleteStocks(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    let data = $(this).parent().parent();
    let id = $(data).find(`td:nth-child(1)`).text();
    $.ajax({
        url: `/service/stocks/${id}`,
        type: `DELETE`,
        success: function(result) {
            alert(result);
            fillTable();
        }
    });
}
function findStocks(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    let data = $(this).parent().parent();
    let id = $(data).find(`td:nth-child(1)`).text();
    let id1 = $(`#inputWhatToFind`).val();
    $.ajax({
        url: `/service/stocks/${id1}`,
        type: `GET`,
        data: {id: id1},
        success: function(result) {
            alert(result);
            fillTable();
        }
    });
}

function editStocks(event) {
    event.preventDefault();
    let data = $(this).parent().parent();
    let id = $(data).find(`td:nth-child(1)`).text();
    let number = $(`#inputNumber`).val();
    let shop = $(`#inputShop`).val();
    let capacity = $(`#inputCapacity`).val();
    // if ( !name.trim().length || !mass.trim().length || !capacity.trim().length) {
    //     alert(`Please, fill in all of the fields`);
    //     return;
    // }

    $.ajax({
        url: `/service/stocks/${id}`,
        type: `POST`,
        data: {id: id, number: number, shop: shop, capacity: capacity},
        success: function (result) {
            alert(result);
            fillTable();
        }
    });
}
