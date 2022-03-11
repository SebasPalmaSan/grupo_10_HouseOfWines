const path = require('path');
const fs = require('fs');

const model = {
    file: path.resolve(__dirname, '../data', 'cart.json'),
    read: () => fs.readFileSync(model.file),
    write: data => fs.writeFileSync(model.file, JSON.stringify(data, null, 2)),
    all: () => JSON.parse(model.read()),
    generate: data => Object({
        id: model.all().lenght == 0 ? 1 : model.all().pop().id + 1,
        name: data.name,
        category: data.category,
        description: data.description,
        discount: parseInt(data.discount),
        oldPrice: parseInt(data.oldPrice),
        newPrice: parseInt(data.discount) > 0 ? parseInt(data.oldPrice) - parseInt(data.oldPrice) * (parseInt(data.discount) / 100) : parseInt(data.newPrice)
    }),
    create: data => {
        let newProduct = model.generate(data);
        let all = model.all();
        all.push(newProduct);
        model.write(all);
        return newProduct;
    },
    search: (prop, value) => model.all().find(element => element[prop] == value),
    update: (id , data) => {
        let all = model.all();
        let updated = all.map(e => {
            if (e.id == id){
                e.name = data.name;
                e.category = data.category;
                e.description = data.description;
                e.discount = data.discount;
                e.oldPrice = data.oldPrice;
                e.newPrice = data.newPrice;
                return e;
            }
            return e;
        })
        model.write(updated);
        let product = model.search('id', id)
        return product;
    },
    delete: id => model.write(model.all().filter(e => e.id != id)),

    
};

module.exports = model