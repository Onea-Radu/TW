var formidable = require("formidable");
var crypto = require("crypto");
var session = require("express-session");
var fs = require("fs");

var express = require("express"); /*include modulul express
memorand in variabila express obiectul asociat modulului(exportat de modul)*/
var app = express();
var path = require("path");
// pentru folosirea ejs-ului
app.set("view engine", "ejs");

app.use(
  session({
    secret: "cheie_sesiune",
    resave: true,
    saveUninitialized: false,
  })
);
app.use(express.static(path.join(__dirname, "resources")));

app.post("/inreg", function (req, res) {
  var formular = new formidable.IncomingForm();
  formular.parse(req, function (err, fields, files) {
    //files provine din inputurile de tip file <input type="file"....
    //fields sunt toate celelalte

    //in fields proprietatile sunt valorile atributelor name din inputurile din formular
    // <input type="text" name="username"
    console.log(fields.username);
    fisierUseri = fs.readFileSync("resources/json/useri.json");
    var parolaCriptata;
    //al doilea argument e parola(cheia) de criptare
    var algoritmCriptare = crypto.createCipher(
      "aes-128-cbc",
      "parola_criptare"
    );
    parolaCriptata = algoritmCriptare.update(fields.parola, "utf-8", "hex");
    parolaCriptata += algoritmCriptare.final("hex");
    obUseri = JSON.parse(fisierUseri);
    var userNou = {
      id: obUseri.lastId,
      username: fields.username,
      nume: fields.nume,
      parola: parolaCriptata,
      dataInreg: new Date(),
      rol: "user",
      materii: fields.materii,
      gender: fields.gender,
    };
    obUseri.useri.push(userNou);
    obUseri.lastId++;
    var jsonNou = JSON.stringify(obUseri);
    fs.writeFileSync("resources/json/useri.json", jsonNou);
    res.redirect("/");
  });
});

app.post("/log", function (req, res) {
  var formular = new formidable.IncomingForm();
  formular.parse(req, function (err, fields, files) {
    fisierUseri = fs.readFileSync("resources/json/useri.json");
    var parolaCriptata;
    //al doilea argument e parola(cheia) de criptare
    var algoritmCriptare = crypto.createCipher(
      "aes-128-cbc",
      "parola_criptare"
    );
    parolaCriptata = algoritmCriptare.update(fields.parola, "utf-8", "hex");
    parolaCriptata += algoritmCriptare.final("hex");
    obUseri = JSON.parse(fisierUseri);
    var utiliz = obUseri.useri.find(function (u) {
      return u.username == fields.username && parolaCriptata == u.parola;
    });
    //find returneaza null daca nu gaseste elementul cu conditia data
    if (utiliz) {
      //setez datele de sesiune
      req.session.utilizator = utiliz;
      console.log("Exista utilizatorul");
      //render primeste pe al doilea parametru date (organizate sub forma unui obiect) care pot fi transmise catre ejs (template)
      res.render("Html/index", { username: utiliz.username });
    }
  });
});

app.get("/logout", function (req, res) {
  req.session.destroy();
  res.redirect("/");
});

app.get("/shop", function (req, res) {
  var numeUtiliz = req.session
    ? req.session.utilizator
      ? req.session.utilizator.username
      : null
    : null;
  var idUtiliz = req.session
    ? req.session.utilizator
      ? req.session.utilizator.id
      : null
    : null;
  if (!numeUtiliz) res.redirect("/login");

  res.render(
    "Html" + req.url,
    { username: numeUtiliz, id: idUtiliz ? idUtiliz : -1 },
    function (err, textRandare) {
      //textRandare este rezultatul compilarii templateului ejs
      if (err) {
        if (err.message.includes("Failed to lookup view"))
          return res.status(404).render("Html/404", { username: numeUtiliz });
        else throw err;
      }
      res.send(textRandare);
    }
  );
});

app.get("/*", function (req, res) {
  console.log(req.url);

  var numeUtiliz = req.session
    ? req.session.utilizator
      ? req.session.utilizator.username
      : null
    : null;

  res.render("Html" + req.url, { username: numeUtiliz }, function (
    err,
    textRandare
  ) {
    //textRandare este rezultatul compilarii templateului ejs
    if (err) {
      if (err.message.includes("Failed to lookup view"))
        return res.status(404).render("Html/404", { username: numeUtiliz });
      else throw err;
    }
    res.send(textRandare);
  });
});

// cand se face o cerere get catre pagina de index
app.get("/", function (req, res) {
  /*afiseaza(render) pagina folosind ejs (deoarece este setat ca view engine) */
  res.render("Html/index");
});
app.get("/login", function (req, res) {
  /*afiseaza(render) pagina folosind ejs (deoarece este setat ca view engine) */
  res.render("Html/login");
});

app.get("/gallery", function (req, res) {
  /*afiseaza(render) pagina folosind ejs (deoarece este setat ca view engine) */
  res.render("Html/gallery");
});
app.get("/joc", function (req, res) {
  /*afiseaza(render) pagina folosind ejs (deoarece este setat ca view engine) */
  res.render("Html/joc");
});
app.get("/inregistrare", function (req, res) {
  /*afiseaza(render) pagina folosind ejs (deoarece este setat ca view engine) */
  res.render("Html/inregistrare");
});

app.use(function (req, res) {
  res.status(404).render("Html/404");
});

app.listen(8080);
console.log("Aplicatia se va deschide pe portul 8080.");
