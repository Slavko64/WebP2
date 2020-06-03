'use strict'

const productModel = new Product() // eslint-disable-line no-undef

function initAddForm () {
  const form = window.document.querySelector('#product-add-form')
  form.addEventListener('submit', function (e) {
    e.preventDefault()

   const formData = new FormData(e.target)
    const productData = {}
    formData.forEach((value, key) => {
      productData[key] = value
    })

    let hiddenInput = document.getElementById('update-item');
    if(hiddenInput.value) {
        productModel.Update(productData);
        let createButton = document.getElementById('btn-create');
        let updateButton = document.getElementById('btn-update');
        createButton.classList.remove('btn-hidden');
        updateButton.classList.add('btn-hidden');
        let hiddenInput = document.getElementById('update-item');
        hiddenInput.value = '';
    }
    else {
      productModel.Create(productData);
    }

    e.target.reset()
  })
}
let uniqcode = [];
function initList () {
  window.jQuery('#product-list').DataTable({
    data: productModel.Select(),
    columns: [
      { title: 'ID', data: 'id' },
      { title: 'Code', data: 'code' },
      { title: 'Name', data: 'name' },
      { title: 'Counry', data: 'country' },
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
  document.addEventListener('productsListDataChanged', function (e) {
    const dataTable = window.jQuery('#product-list').DataTable()

    dataTable.clear()
    dataTable.rows.add(e.detail)
    dataTable.draw()
  }, false)
}

function deleteItem(e) {
  let row = e.parentNode.parentNode;
  let id = row.getElementsByTagName('td')[0].innerText;
  row.remove();
  productModel.Delete(id);
}
function updateItem(e) {
  
  let row = e.parentNode.parentNode;
  let id = row.getElementsByTagName('td')[0].innerText;
  let obj = productModel.FindById(parseInt(id));
  document.getElementById('name').value = obj.name;
  document.getElementById('address').value = obj.address;
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