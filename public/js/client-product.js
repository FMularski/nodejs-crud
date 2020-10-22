$(document).ready(() =>{
    refreshTableBody();

    function openForm(mode){    // form can be opened in create or update mode which basically is class added to it
        $('#dark-panel').addClass('active');
        $('#light-panel').addClass('active');
        $('#product-form').addClass(mode);
    }

    function closeForm(){   // remove classes from form to remove its "mode"
        $('#dark-panel').removeClass('active');
        $('#light-panel').removeClass('active');
        $('#product-form').removeClass('create');
        $('#product-form').removeClass('update');

        $('#name').val('');
        $('#description').val('');
    }

    $('#create-btn').on('click', () =>{
        openForm('create');
    })

    $('#close-btn').on('click', () => {
        closeForm();
    })

    /* GET */
    function refreshTableBody(){
        const tbody = $('tbody');
        tbody.html('');
        
        $.ajax({
            url: '/api/products',
            method: 'GET',
            contentType: 'application/json',
            success: request => {
                request.products.forEach(product =>{
                    tbody.append('<tr>\
                                    <th scope="row">' + product.id + '</th>\
                                    <td>' + product.name + '</td>\
                                    <td>' + product.description + '</td>\
                                    <td><button class="btn btn-danger delete-btn nice-btn">Delete</button></td>\
                                    <td><button class="btn btn-info update-btn nice-btn">Update</button></td>\
                                </tr>');
                })
            }
        })
    }

    let updateId;   // stores user id of clicked button in order to pass to put

    $("#product-form").on('submit', function(event) {
        event.preventDefault();
        const nameInput = $('#name');
        const descriptionInput = $('#description');

        /* POST */
        if ($('#product-form').hasClass('create')){
            $.ajax({
                url: '/api/products',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    name: nameInput.val(),
                    description: descriptionInput.val()
                }),
                success: response =>{
                    closeForm();
                    refreshTableBody();
                }
            })
        }
        /* PUT */
        if ($('#product-form').hasClass('update')){
            $.ajax({
                url: '/api/products/' + updateId,
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({
                    name: nameInput.val(),
                    description: descriptionInput.val()
                }),
                success: response => {
                    closeForm();
                    refreshTableBody();
                }
            })
        }
    })

    /* PUT */
    // step1: opening form with inserted values
    $('table').on('click', '.update-btn', function(){
        const row = $(this).parent().parent();
        updateId = row.children()[0].innerHTML;
        const name = row.children()[1].innerHTML;
        const description = row.children()[2].innerHTML;

        
        $('#name').val(name);
        $('#description').val(description);

        openForm('update');
    })

    /* DELETE */
    $('table').on('click', '.delete-btn', function(){
        const row = $(this).parent().parent();
        const id = row.children()[0].innerHTML;
        
        $.ajax({
            url: 'api/products/' + id,
            method: 'DELETE',
            contentType: 'application/json',
            success: request => {
                refreshTableBody();
            }
        })
    });

})

