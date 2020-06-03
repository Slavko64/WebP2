'use strict'

const stockModel = new Stock() // eslint-disable-line no-undef

function initAddForm () {
  const form = window.document.querySelector('#stock-add-form')
  form.addEventListener('submit', function (e) {
    e.preventDefault()

   const formData = new FormData(e.target)
    const stockData = {}
    formData.forEach((value, key) => {
      stockData[key] = value
    })

    let hiddenInput = document.getElementById('update-item');
    if(hiddenInput.value) {
        stockModel.Update(stockData);
        let createButton = document.getElementById('btn-create');
        let updateButton = document.getElementById('btn-update');
        createButton.classList.remove('btn-hidden');
        updateButton.classList.add('btn-hidden');
        let hiddenInput = document.getElementById('update-item');
        hiddenInput.value = '';
    }
    else {
      stockModel.Create(stockData);
    }

    e.target.reset()
  })
}

function initList () {
  window.jQuery('#stock-list').DataTable({
    data: stockModel.Select(),
    columns: [
      { title: 'ID', data: 'id' },
      { title: 'Number', data: 'number' },
      { title: 'Name', data: 'name' },
      { title: 'Capacity', data: 'capacity' },
      { title: 'Action', data: '' }
    ],
    columnDefs: [
        {
            "render": function(data, type, row) {
                return ''
                    + '<button type="button" value="delete" onclick="deleteItem(this)">Delete</button>'
                    + "\n"
                    + '<button type="button" value="update" onclick="updateItem(this)">Update</button>';
                    
            },
            "targets": 4
        }
      ]
  })
}

function initListEvents () {
  document.addEventListener('stocksListDataChanged', function (e) {
    const dataTable = window.jQuery('#stock-list').DataTable()

    dataTable.clear()
    dataTable.rows.add(e.detail)
    dataTable.draw()
  }, false)
}

function deleteItem(e) {
  let row = e.parentNode.parentNode;
  let id = row.getElementsByTagName('td')[0].innerText;
  row.remove();
  stockModel.Delete(id);
}
function updateItem(e) {
  
  let row = e.parentNode.parentNode;
  let id = row.getElementsByTagName('td')[0].innerText;
  let obj = stockModel.FindById(parseInt(id));
  document.getElementById('number').value = obj.number;
  document.getElementById('name').value = obj.name;
  document.getElementById('capacity').value = obj.capacity;
  let createButton = document.getElementById('btn-create');
  let updateButton = document.getElementById('btn-update');
  createButton.classList.add('btn-hidden');
  updateButton.classList.remove('btn-hidden');
  let hiddenInput = document.getElementById('update-item');
  hiddenInput.value = obj.id;
  
}

window.addEventListener('DOMContentLoaded', e => {
  initAddForm()
  initList()
  initListEvents()
})