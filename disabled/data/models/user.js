const path = require('path');
const fs = require('fs');
const bcryptjs = require('bcryptjs')

const model = {
    file: path.resolve(__dirname, '../data', 'users.json'),
    read: () => fs.readFileSync(model.file, 'utf8'),
    write: data => fs.writeFileSync(model.file, data),
    get: () => JSON.parse(model.read()),
    save: data => model.write(JSON.stringify(data, null, 2)),
    search: (prop, value) => model.get().find(user => user[prop] === value),
    generate: data => Object({
        id: model.get().length > 0 ? model.get().sort((a,b) => a.id - b.id).pop().id + 1 : 1,
        firstName: data.firstName,
        lastName: data.lastName,
        password: bcryptjs.hashSync(data.password,10),
        email: data.email,
        phone: data.phone,
        adress: data.adress,
        birthdate: data.birthdate,
        avatar: data.avatar ? data.avatar : null,
        admin: data.email.includes('@how')? true : false,
     }),
    create: data => {
        const users = model.get();
        const user = model.generate(data);
        users.push(user);
        model.save(users);
        return user;
    },
    
    /* update: (id , data) => {
        let all = model.get();
        let updated = all.map(e => {
            if (e.id == id){
                e.firstName= data.firstName,
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
    }, */
    update: (id,data) => {
        const users = model.get();
        const updates = users.map(user => user.id === id ? {...user, ...data} : user);
        model.save(updates);
        return updates.find(user => user.id === id);
    },

    delete: id => model.write(model.get().filter(e => e.id != id)
    ),

    
};

module.exports = model;