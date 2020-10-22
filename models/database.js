const database = {
    users: [
        {id: 1, login:'admin', email: 'admin@admin.admin', password: 'admin'},
        {id: 2, login:'filip', email: 'filip@mail.com', password: '123456'},
        {id: 3, login:'john', email: 'john@mail.com', password: 'secret'},
        {id: 4, login:'andy', email: 'andy@mail.com', password: 'ilikehotdogs'}
    ],
    products: [
        {id: 1, name:'laptop', description: 'electronic device'},
        {id: 2, name:'ssd disk', description: 'you can store your data on it'},
        {id: 3, name:'game controller', description: 'for playing cool games'}
    ]
}

module.exports = database;