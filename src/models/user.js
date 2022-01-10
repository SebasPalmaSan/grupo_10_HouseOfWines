const path = require('path');
const fs = require('fs');

const model = {
    file: path.resolve(__dirname, '../data', 'user.json'),
    read: () => fs.readFileSync(model.file),
    write: data => fs.writeFileSync(model.file, JSON.stringify(data, null, 2)),
    all: () => JSON.parse(model.read()),
    generate: data => Object({
        id: model.all().lenght == 0 ? 1 : model.all().pop().id + 1,
        firstName: data.name,
        lastName: data.lastName,
        password: data.password,
        email: data.email,
        phone: data.phone,
        adress: data.adress,
        birthdate: data.birthdate,
     }),
    create: data => {
        let newUser = model.generate(data);
        let all = model.all();
        all.push(newUser);
        model.write(all);
        return newUser;
    },
    serch: (prop, value) => model.all().find(element => element[prop] == value),
    update: (id , data) => {
        let all = model.all();
        let updated = all.map(e => {
            if (e.id == id){
                e.firstName= data.name,
                e.lastName= data.lastName,
                e.password= data.password,
                e.email= data.email,
                e.phone= data.phone,
                e.adress= data.adress,
                e.birthdate= data.birthdate
            }
            return e;
        })
        model.write(updated);
        let user = model.serch('id', id)
        return user;
    },
    delete: id => model.write(model.all().filter(e => e.id != id)),

    
};

module.exports = model