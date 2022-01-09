const path = require('path');
const fs = require('fs');

const model = {
    file: path.resolve(__dirname, '../data', 'user.json'),
    read: () => fs.readFileSync(model.file),
    write: data => fs.writeFileSync(model.file, JSON.stringify(data, null, 2)),
    all: () => JSON.parse(model.read()),
    generate: data => Object({
        id: model.all().lenght == 0 ? 1 : model.all().pop().id + 1,
        firstName: data.firstName,
        lastName: data.lastName,
        userName: data.userName,
        password: data.password,
        email: data.email,
        phoneNumber: parseInt(data.phoneNumber),
        country: data.country,
        birthdate: data.birthdate,
        adress: data.adress
    }),
    create: data => {
        let newProduct = model.generate(data);
        let all = model.all();
        all.push(newProduct);
        model.write(all);
        return newProduct;
    }
};

module.exports = model