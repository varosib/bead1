var Waterline = require('waterline');

module.exports = Waterline.Collection.extend({
    identity: 'recipe',
    migrate: 'safe',
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