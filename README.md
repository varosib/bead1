## bead1 dokumentáció
###Követelményanalízis
####Követelmények
######A feladat egy olyan alkalmazás programozása, amely recepteket tárol és listáz ki. Recepteket lehessen hozzáadni, szerkeszteni, törölni, de ezeket csak bejelentkezett felhasználók tehetik meg. Ezzel szemben a recepteket bármelyik vendig elolvashatja. Lehetőség van keresni is a receptek között, valamint regisztálni új felhasználói fiókot.
####Használatieset-modell
######Szerepkörök: vendég, felhasználó
######![szerepkor](https://cloud.githubusercontent.com/assets/14218102/10869402/fc82e4a8-80ae-11e5-937c-e29ffaaf5ec5.png)
######Folyamat ismertetés: Vendék érkezik az oldalra, szeretne felvenni egy receptet. Ehhez először a bejelentkezés fülre kattint, majd a regisztrálásra. Miután megadta az adatait és belépett, egyből az új recept hozzáadás menüpont alatt találja magát. Itt felveszi az adatokat, majd átvált a receptek fülre, ahol szemrevételezheti, hogy felkerült a recept.
###Tervezés
####Architektúra
#####Oldaltérkép:
######Public:
+ Főoldal
+ Receptek
+ Bejelentkezés
+ Regisztráció

######Private:
+ Új recept
+ Recept szerkesztés

#####Végpontok:
+ GET /: főoldal
+ GET /auth/login: bejelentekzési oldal
+ POST /auth/login: bejelentkező adatok küldése
+ GET /auth/signup: regisztrációs oldal
+ POST /auth/signup: regisztrációs adatok küldése
+ GET /list: receptek listázása
+ GET /add: recept felvételi oldal
+ POST /add: új recept adatainak küldése
+ GET /delete:id : recept törlése
+ GET /edit:id : recept módosító oldal
+ POST /edit : modosítot adatok küldése
+ GET /auth/logout: kijelentkezés

####Oldalterv
![oldalterv](https://cloud.githubusercontent.com/assets/14218102/10869485/bb7ec884-80b1-11e5-92e8-92de90b0b4c7.png)
####Adatmodell
![adatmodell](https://cloud.githubusercontent.com/assets/14218102/10869521/b62507ee-80b2-11e5-9098-373e4b299629.png)
######User
+ azon: felhasználónév
+ password: jelszó
+ surename + forename: név
+ recipes: userhez tartozó receptek
 
######Recipe
+ etel: étel neve
+ hozzavalo: hozzávalók
+ user: recepthez tartozó user
+ felhasznalonev: felhasználó összefűzött neve

###Implementáció
####Fejlesztői környezet
######Cloud9
####Mappaszerkezet
+ bead1 főkönyvtár: ez tartalmazza az alkalamzás működéséért felelős js fileokat és az alkönyvtárakat
+ models: user és recipe modellek
+ views: oldalak megjelenéséért felelős hbs fileok

###Felhasználói dokumentáció
####Futtatás
######Futtatáshoz szükségünk van egy keretrendszerre, pl. Cloud9.
####Telepítés
######Miután leszedtük a projectet a githubról, importálni kell a keretrendszerbe. Ezután a module csomagok feltelepítése után (npm install) használhatjuk/fejleszthetjük a programot.
####Program használata
######A főkönyvtárból futtatható a program a "node index.js" paranccsal.
