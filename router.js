var express = require('express');
var router = new express.Router;
var passport = require('passport');

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    req.flash('info', 'A kért tartalom megjelenítéséhez bejelentkezés szükséges');
    res.redirect('/auth/login');
}

router.route('/auth/login')
    .get(function (req, res) {
        res.render('auth/login');
    })
    .post(passport.authenticate('local-login', {
        successRedirect:    '/add',
        failureRedirect:    '/auth/login',
        failureFlash:       true,
        badRequestMessage:  'Hiányzó adatok'
    }));

router.route('/auth/signup')
    .get(function (req, res) {
        res.render('auth/signup');
    })
    .post(passport.authenticate('local-signup', {
        successRedirect:    '/add',
        failureRedirect:    '/auth/signup',
        failureFlash:       true,
        badRequestMessage:  'Hiányzó adatok'
    }));

router.use('/auth/logout', function (req, res) {
    req.logout();
    res.redirect('/auth/login');
});

// Itt kellene megoldani a végpontokat
router.get('/', function (req, res) {
    res.render('info', {
       title: 'My App'
    });
});

router.route('/list')
    .get(function (req, res) {
        var result;
        if (req.query.query) {
            result = req.app.Models.recipe.find({
                 etel: req.query.query
            });
        } else {
            result = req.app.Models.recipe.find({
            });
        }
        result
            // Ha nem volt hiba fusson le ez
            .then(function (data) {
                res.render('list', {
                    title: 'My App',
                    data: data,
                    query: req.query.query,
                    uzenetek: req.flash()
                });
            })
            // Ha volt hiba fusson le ez
            .catch(function () {
                console.log('Hiba!!');
                throw 'error';
            });
    });
    
router.route('/list/:id')
    .get(ensureAuthenticated, function (req, res) {
        req.app.Models.recipe.find({ id: req.params.id })
        .then(function (data) {
            res.render('list', {
                title: 'My App',
                data: data,
                uzenetek: req.flash()
            });  
        })
        .catch(function () {
            console.log('Hiba!!');
            throw 'error';
        });
    });
router.route('/add')
    .get(ensureAuthenticated, function (req, res) {
        res.render('add', {
            title: 'My App',
            uzenetek: req.flash()
        });
    })
    .post(ensureAuthenticated, function (req, res) {
        req.checkBody('etel', 'Étel név megadás kötelező')
            .notEmpty();
        req.checkBody('hozzavalo', 'Adjon meg hozzávalót!')
            .notEmpty();
        
        if (req.validationErrors()) {
            req.validationErrors().forEach(function (error) {
                req.flash('error', error.msg);
            });
            res.redirect('/add');
        } else {
            req.app.Models.recipe.create({
                etel: req.body.etel,
                hozzavalo: req.body.hozzavalo,
                user: req.user.id,
                felhasznalonev: req.user.surname + " " + req.user.forename
            })
            .then(function () {
                req.flash('success', 'Recept felvéve');
                res.redirect('/add');
            })
            .catch(function () {
                req.flash('error', 'Recept felvétele sikertelen!');
                res.redirect('/add');
            });
        }
    });

var melyik;
router.route('/edit')
    .get(ensureAuthenticated, function (req, res) {
        req.app.Models.recipe.find({ id: melyik })
        .then(function (data) {
            var etel;
            var hozzavalo;
            Object.keys(data).forEach(function (key) {
                var obj = data[key];
                etel = obj['etel'];
                hozzavalo = obj['hozzavalo'];
            });
            //console.log(etel);
            //console.log(hozzavalo);
            res.render('edit', {
                title: 'My App',
                uzenetek: req.flash(),
                nev: etel,
                hozzavalo: hozzavalo
            });  
        })
        .catch(function () {
            console.log('Hiba!!');
            throw 'error';
        });
    })
    .post(ensureAuthenticated, function (req, res) {
        req.checkBody('etel', 'Étel név megadás kötelező')
            .notEmpty();
        req.checkBody('hozzavalo', 'Adjon meg hozzávalót!')
            .notEmpty();
        
        if (req.validationErrors()) {
            req.validationErrors().forEach(function (error) {
                req.flash('error', error.msg);
            });
            res.redirect('/edit');
        } else {
            req.app.Models.recipe.destroy({ id: melyik })
            .then(function () {
                req.flash('success', 'Recept törölve');
                res.redirect('/list'); 
            })
            .catch(function () {
                req.flash('error', 'Recept törlése sikertelen');
                res.redirect('/list');
            });;
            
            req.app.Models.recipe.create({
                id: melyik,
                etel: req.body.etel,
                hozzavalo: req.body.hozzavalo,
                user: req.user.id,
                felhasznalonev: req.user.surname + " " + req.user.forename
            })
            .then(function () {
                req.flash('success', 'Recept felvéve');
                res.redirect('/list');
            })
            .catch(function () {
                req.flash('error', 'Recept felvétele sikertelen!');
                res.redirect('/list');
            });
        }
    });
router.use('/edit/:id', ensureAuthenticated, function (req, res) {
    melyik = req.params.id;
    res.redirect('/edit');
});    
    
router.use('/delete/:id', ensureAuthenticated, function (req, res) {
        /*req.session.data = req.session.data || [];
        req.session.data = req.session.data.filter(function (elem) {
            return elem.id != req.params.id;
        });*/
        req.app.Models.recipe.destroy({ id: req.params.id })
        .then(function () {
            req.flash('success', 'Recept törölve');
            res.redirect('/list'); 
        })
        .catch(function () {
            req.flash('error', 'Recept törlése sikertelen');
            res.redirect('/list');
        });;
    });


module.exports = router;