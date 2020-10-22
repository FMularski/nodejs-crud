$(document).ready(() =>{
    refreshTableBody();

    function openForm(mode){    // form can be opened in create or update mode which basically is class added to it
        $('#dark-panel').addClass('active');
        $('#light-panel').addClass('active');
        $('#user-form').addClass(mode);
    }

    function closeForm(){   // remove classes from form to remove its "mode"
        $('#dark-panel').removeClass('active');
        $('#light-panel').removeClass('active');
        $('#user-form').removeClass('create');
        $('#user-form').removeClass('update');

        const loginInput = $('#login').val('');
        const emailInput = $('#email').val('');
        const passwordInput = $('#password').val('');
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
            url: '/api/users',
            method: 'GET',
            contentType: 'application/json',
            success: request => {
                request.users.forEach(user =>{
                    tbody.append('<tr>\
                                    <th scope="row">' + user.id + '</th>\
                                    <td>' + user.login + '</td>\
                                    <td>' + user.email + '</td>\
                                    <td>' + user.password + '</td>\
                                    <td><button class="btn btn-danger delete-btn nice-btn">Delete</button></td>\
                                    <td><button class="btn btn-info update-btn nice-btn">Update</button></td>\
                                </tr>');
                })
            }
        })
    }

    let updateId;   // stores user id of clicked button in order to pass to put

    $("#user-form").on('submit', function(event) {
        event.preventDefault();
        const loginInput = $('#login');
        const emailInput = $('#email');
        const passwordInput = $('#password');

        /* POST */
        if ($('#user-form').hasClass('create')){
            $.ajax({
                url: '/api/users',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    login: loginInput.val(),
                    email: emailInput.val(),
                    password: passwordInput.val()
                }),
                success: response =>{
                    closeForm();
                    refreshTableBody();
                }
            })
        }
        /* PUT */
        if ($('#user-form').hasClass('update')){
            $.ajax({
                url: '/api/users/' + updateId,
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({
                    login: loginInput.val(),
                    email: emailInput.val(),
                    password: passwordInput.val()
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
        const login = row.children()[1].innerHTML;
        const email = row.children()[2].innerHTML;
        const password = row.children()[3].innerHTML;

        
        $('#login').val(login);
        $('#email').val(email);
        $('#password').val(password);

        openForm('update');
    })

    /* DELETE */
    $('table').on('click', '.delete-btn', function(){
        const row = $(this).parent().parent();
        const id = row.children()[0].innerHTML;
        
        $.ajax({
            url: 'api/users/' + id,
            method: 'DELETE',
            contentType: 'application/json',
            success: request => {
                refreshTableBody();
            }
        })
    });

})

