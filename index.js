class Entity {
  //abstract
  id; //number
}

class Person extends Entity {
  firstname; //string
  lastname; //string
}

class Company extends Entity {
  name; //string
}

class IDataProvider {
  //abstract interface
  list() {} //abstract:Entity
  search(text) {} //abstract:Entity
}

class BaseProvider extends IDataProvider {
  //abstract
  getData() {} ////abstract:Entity []

  list() {
    //Entity []
    return this.getData();
  }

  search(text) {
    //:Entity [], text: string
    let search = text.toLowerCase(); //string
    let results = []; //Entity[]
    for (const item of this.getData()) {
      if (JSON.stringify(item).toLowerCase().includes(search)) {
        results.push(item);
      }
    }
    return results;
  }
}

class PersonProvider extends BaseProvider {
  getData() {
    //:person[]
    let p1 = new Person(); //person
    p1.id = 1;
    p1.firstname = "Sophie";
    p1.lastname = "Lozophy";

    let p2 = new Person(); //person
    p2.id = 2;
    p2.firstname = "Annie";
    p2.lastname = "Versaire";

    let p3 = new Person(); //person
    p3.id = 3;
    p3.firstname = "Paul";
    p3.lastname = "Ochon";

    return [p1, p2, p3];
  }
}

class CompanyProvider extends BaseProvider {
  getData() {
    //:Compagny[]
    let c1 = new Company(); //compagny
    c1.id = 1;
    c1.name = "Google";

    let c2 = new Company(); //compagny
    c2.id = 2;
    c2.name = "Apple";

    let c3 = new Company(); //compagny
    compagny;
    c3.id = 3;
    c3.name = "Microsoft";

    return [c1, c2, c3];
  }
}

class RepositoryService {
  providers; // IdataProvider[]

  constructor(providers) {
    // c'est qu'on exige lors de l'instanciation des providers : une dépendance
    this.providers = providers;
  }

  list() {
    //:Entity []
    let accu = []; //Entity[]
    for (const element of this.providers) {
      accu = accu.concat(element.list());
    }
    return accu;
  }

  search(text) {
    //:Entity [], text: string
    let accu = []; //Entity[]
    for (const element of this.providers) {
      accu = accu.concat(element.search(text));
    }
    return accu;
  }
}

const jose = new PersonProvider(); //PersonProvider
const sophie = new CompanyProvider(); //CompagnyProvider
const bertrand = new RepositoryService([jose, sophie]); //RepositoryService
// lié au constructor POUR LA CONSTRUCTION

const express = require("express");
const cors = require("cors");

let app = express(); // création du serveur
app.use(cors()); // utilisation de cors : autoriser les requetes HTTP provenant d'une autre origine
app.use(express.json()); // utilisation de json : permettre la communication avec des données au format JSON

// GET (recuperation de données) - list
// POST (envoi de données avec une intention de création) - search (pour l'exemple, habituellement en GET)
// PUT (envoi de données avec une intenion de modification totale)
// PATCH  (envoi de données avec une intenion de modification partielle)
// DELETE (suppression de données)
// HEAD (salutation)
// OPTIONS (demande d'autorisation)

app.get("/", function (req, res) {
  res.send(bertrand.list());
});

/*
créer un nouveau endpoint qui accepte les requites en POST (POST: http//localhost:400/) avec une donnée "text" à l'interieur de playload
renvoyer les resultat de la recherche utilisant la donnée "text" qui a été envoyée.
indice: pour récupérer la données "text" du playload: req.body.text
*/

app.post("/search", function (req, res) {
  res.send(bertrand.search(req.body.text));
});

app.listen(4000, function () {
  console.log("Listening on port 4000 haha...");
});
