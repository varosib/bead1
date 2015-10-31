var Waterline = require('waterline');

module.exports = Waterline.Collection.extend({
    identity: 'recipe',
    connection: 'disk',
    attributes: {
        etel: {
            type: 'string',
            required: true
        },
        hozzavalo: 'string',
        user: {
            model: 'user'
        },
        felhasznalonev: 'string'
    }
});