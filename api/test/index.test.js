var API = require("../index.js");

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();


chai.use(chaiHttp);

describe("OmbrAPP API", () => {
  //Test API prenotazione
  describe("GET prenotazione", () => {
    it("Restituisce le prenotazioni effettuate dall'utente con id = idUtente", (done) => {
      chai.request(API).get('/api/prenotazione')
        .query({
          idUtente: 1
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          done();
        });
    });
    it("Ritorna errore se l'utente non esiste", (done) => {
      chai.request(API).get('/api/prenotazione')
        .query({
          idUtente: 234
        })
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
  });

  describe("POST prenotazione", () => {
    it("Aggiunge una prenotazione alla lista", (done) => {
      chai.request(API).post('/api/prenotazione')
        .query({
          data: "2019-02-10",
          idSpazio: 2,
          quantitativo: 10.0,
          idFornitore: 1,
          idUtente: 1
        })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it("Ritorna errore se la prenotazione esiste già", (done) => {
      chai.request(API).post('/api/prenotazione')
        .query({
          data: "2019-02-10",
          idSpazio: 2,
          quantitativo: 10.0,
          idFornitore: 1,
          idUtente: 1
        })
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
    it("Ritorna errore se lo spazio non esiste", (done) => {
      chai.request(API).post('/api/prenotazione')
        .query({
          data: "2019-02-10",
          idSpazio: 351,
          quantitativo: 10.0,
          idFornitore: 1,
          idUtente: 1
        })
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
    it("Ritorna errore se lo spazio non è un ombrellone", (done) => {
      chai.request(API).post('/api/prenotazione')
        .query({
          data: "2019-02-10",
          idSpazio: 5,
          quantitativo: 10.0,
          idFornitore: 1,
          idUtente: 1
        })
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
    it("Ritorna errore se lo spazio è già riservato", (done) => {
      chai.request(API).post('/api/prenotazione')
        .query({
          data: "2021-12-29",
          idSpazio: 2,
          quantitativo: 10.0,
          idFornitore: 1,
          idUtente: 2
        })
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
  });

  //Test API prenotazione/spazio
  describe("GET prenotazione/spazio", () => {
    it("Ritorna gli spazi prenotati in una prenotazione", (done) => {
      chai.request(API).get('/api/prenotazione/spazio')
        .query({
          idPrenotazione: 2
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          done();
        });
    });
    it("Ritorna errore se la prenotazione non esiste", (done) => {
      chai.request(API).get('/api/prenotazione/spazio')
        .query({
          idPrenotazione: 200
        })
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
  });

  describe("POST prenotazione/spazio", () => {
    it("Aggiunge degli spazi a una prenotazione", (done) => {
      chai.request(API).post('/api/prenotazione/spazio')
        .query({
          idPrenotazione: 3,
          idSpazio: 6
        })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it("Ritorna errore se uno spazio è gia stato aggiunto o è gia riservato", (done) => {
      chai.request(API).post('/api/prenotazione/spazio')
        .query({
          idPrenotazione: 2,
          idSpazio: 6
        })
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
    it("Ritorna errore se la prenotazione non esiste", (done) => {
      chai.request(API).post('/api/prenotazione/spazio')
        .query({
          idPrenotazione: 56,
          idSpazio: 6
        })
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
    it("Ritorna errore se lo spazio non esiste", (done) => {
      chai.request(API).post('/api/prenotazione/spazio')
        .query({
          idPrenotazione: 2,
          idSpazio: 4321
        })
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
  });

  //Test API spazio
  describe("GET spazio", () => {
    it("Ritorna la lista degli spazi", (done) => {
      chai.request(API).get('/api/spazio')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          done();
        });
    });
  });
});