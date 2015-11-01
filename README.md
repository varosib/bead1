## bead1 dokumentáció
###Követelményanalízis
####Követelmények
######A feladat egy olyan alkalmazás programozása, amely recepteket tárol és listáz ki. Recepteket lehessen hozzáadni, szerkeszteni, törölni, de ezeket csak bejelentkezett felhasználók tehetik meg. Ezzel szemben a recepteket bármelyik vendig elolvashatja. Lehetőség van keresni is a receptek között, valamint regisztálni új felhasználói fiókot.
####Használatieset-modell
######Szerepkörök: vendég, felhasználó
######![Szerepkör-modell](docs/images/szerepkor.png)
######Folyamat ismertetés: Vendék érkezik az oldalra, szeretne felvenni egy receptet. Ehhez először a bejelentkezés fülre kattint, majd a regisztrálásra. Miután megadta az adatait és belépett, egyből az új recept hozzáadás menüpont alatt találja magát. Itt felveszi az adatokat, majd átvált a receptek fülre, ahol szemrevételezheti, hogy felkerült a recept.
###Tervezés
###Implementáció
####Fejlesztői környezet
######Cloud9
####Mappaszerkezet
######bead1 főkönyvtár: ez tartalmazza az alkalamzás működéséért felelős js fileokat és az alkönyvtárakat
######models: user és recipe modellek
######views: oldalak megjelenéséért felelős hbs fileok
###Tesztelés
###Felhasználói dokumentáció
####Futtatás
######Futtatáshoz szükségünk van egy keretrendszerre, pl. Cloud9.
####Telepítés
######Miután leszedtük a projectet a githubról, importálni kell a keretrendszerbe. Ezután a module csomagok feltelepítése után (npm install) használhatjuk/fejleszthetjük a programot.
####Program használata
######A főkönyvtárból futtatható a program a "node index.js" paranccsal.
