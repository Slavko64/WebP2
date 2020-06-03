'use strict'

const productonstockModel = new Productonstock() // eslint-disable-line no-undef

function initAddForm () {
  const form = window.document.querySelector('#productonstock-add-form')
  form.addEventListener('submit', function (e) {
    e.preventDefault()

   const formData = new FormData(e.target)
    const productonstockData = {}
    formData.forEach((value, key) => {
      productonstockData[key] = value
    })

    let hiddenInput = document.getElementById('update-item');
    if(hiddenInput.value) {
      productonstockModel.Update(productonstockData);
        let createButton = document.getElementById('btn-create');
        let updateButton = document.getElementById('btn-update');
        createButton.classList.remove('btn-hidden');
        updateButton.classList.add('btn-hidden');
        let hiddenInput = document.getElementById('update-item');
        hiddenInput.value = '';
    }
    else {
      productonstockModel.Create(productonstockData);
    }

    e.target.reset()
  })
}
let uniqcode = [];
function initList () {
  window.jQuery('#productonstock-list').DataTable({
    data: productonstockModel.Select(),
    columns: [
      { title: 'ID', data: 'id' },
      { title: 'Stock', data: 'stock' },
      { title: 'Product', data: 'product' },
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
            "targets": 3
        }
      ]
  })
}

function initListEvents () {
  document.addEventListener('productonstockListDataChanged', function (e) {
    const dataTable = window.jQuery('#productonstock-list').DataTable()

    dataTable.clear()
    dataTable.rows.add(e.detail)
    dataTable.draw()
  }, false)
}

function deleteItem(e) {
  let row = e.parentNode.parentNode;
  let id = row.getElementsByTagName('td')[0].innerText;
  row.remove();
  productonstockModel.Delete(id);
}
function updateItem(e) {
  
  let row = e.parentNode.parentNode;
  let id = row.getElementsByTagName('td')[0].innerText;
  let obj = productonstockModel.FindById(parseInt(id));
  document.getElementById('stock').value = obj.stock;
  document.getElementById('product').value = obj.product;
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