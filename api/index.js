var Express = require("express");
var cors = require("cors");

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

var mysql = require("mysql");
const { response } = require("express");

var app = Express();
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(cors());

var dbConnection = mysql.createConnection({
  host: "127.0.0.1",
  port: "3306",
  database: "ombrappdb",
  user: "root",
  password: ""
})

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "OmbrAPP API",
      description: "Documentazione API del progetto OmbrAPP",
      contact: {
        name: "Gruppo 41"
      },
      servers: [
        {
          url: "http://localhost:49146/",
          description: "Development Server"
        }
      ]
    }
  },
  apis: [
    "index.js"
  ]
}
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(49146, () => {
  console.log("APIs Running");
});

//API Documentation
/**
 * @swagger
 * /api/prenotazione:
 *   get:
 *     summary: Restituisce tutte le prenotazioni di un utente.
 *     tags:
 *     - "prenotazione"
 *     parameters:
 *     - in: query
 *       name: idUtente
 *       schema:
 *         type: int
 *     responses:
 *       200:
 *         description: Corretta restituzione delle prenotazioni
 *       400:
 *         description: Errore durante la restituzione delle prenotazioni
 *   post:
 *     summary: Inserisce nuova prenotazione.
 *     tags:
 *     - "prenotazione"
 *     parameters:
 *     - in: query
 *       name: data
 *       schema:
 *         type: string
 *     - in: query
 *       name: quantitativo
 *       schema:
 *         type: float
 *     - in: query
 *       name: idFornitore
 *       schema: 
 *         type: int
 *     - in: query
 *       name: idUtente
 *       schema:
 *         type: int
 *     - in: query
 *       name: idSpazio
 *       schema:
 *         type: int 
 *     responses:
 *       200:
 *         description: Corretto inserimento dell'elemento
 *       400:
 *         description: Errore durante l'inserimento
 *       500:
 *         description: Errore durante le query "SELECT"
 * /api/prenotazione/spazio:
 *   get:
 *     summary: Retituisce tutti gli spazi prenotati data un idPrenotazione
 *     tags:
 *     - "prenotazione"
 *     parameters:
 *     - in: query
 *       name: idPrenotazione
 *       schema:
 *         type: int
 *     responses:
 *       200:
 *         description: Corretta restituzione degli spazi prenotati
 *       400:
 *         description: Errore durante la restituzione degli spazi
 *   post:
 *     summary: Aggiunge uno spazio ad una prenotazione
 *     tags:
 *     - "prenotazione"
 *     parameters:
 *     - in: query
 *       name: idPrenotazione
 *       schema:
 *         type: int
 *     - in: query
 *       name: idSpazio
 *       schema:
 *         type: int
 *     responses:
 *       200:
 *         description: Corretta aggiunta dello spazio alla prenotazione
 *       400:
 *         description: Errore durante l'aggiunta della prenotazione
 *       500:
 *         description: Errore, lo spazio o la prenotazione indicate non esistono
 * /api/spazio:
 *   get:
 *     summary: Restituisce tutti gli spazi
 *     tags:
 *     - "spazio"
 *     responses:
 *       200:
 *         description: Corretta restituzione degli spazi
 *       400:
 *         description: Errore durante la restituzione degli spazi
 */

//API Definition
dbConnection.connect(function (err) {
  if (err) {
    console.log("MySQL Server Error (Server closed?)");
  } else {
    //API Prenotazione
    app.get("/api/prenotazione", (request, response) => {
      var idUtente = request.query.idUtente;

      dbConnection.query("SELECT * FROM prenotazioni WHERE utente = ?", [idUtente], function (err, result) {
        if (err) {
          response.status(400);
          response.send("Errore Query \n\n" + err);
        } else {
          response.status(200);
          response.send(result);
        }
      });
    });
    app.post("/api/prenotazione", (request, response) => {
      var data = request.query.data;
      var idSpazio = request.query.idSpazio;
      var idPrenotazione = null;

      var quantitativo = request.query.quantitativo;
      var idFornitore = request.query.idFornitore;
      var idUtente = request.query.idUtente;
      var idPagamento = null;

      dbConnection.query("SELECT * FROM spazi WHERE idSpazio = ?", [idSpazio], function (err, result) {
        if (err) {
          response.status(400);
          response.send("Errore Query \n\n" + err);
        } else {
          if (isEmpty(result)) {
            response.status(500);
            response.send("Lo spazio con id = " + idSpazio + " non esiste. \n\n");
          } else if (result[0].tipo != 4) {
            response.status(500);
            response.send("Lo spazio con id = " + idSpazio + " non è un ombrellone \n\n");
          } else {
            dbConnection.query("SELECT * FROM occupazioni o JOIN prenotazioni p ON p.idPrenotazione = o.prenotazione WHERE o.spazio = ? AND p.data = ?", [idSpazio, data], function (err, result) {
              if (err) {
                response.status(400);
                response.send("Errore Query \n\n" + err);
              } else {
                if (!isEmpty(result)) {
                  response.status(500);
                  response.send("Lo spazio con id = " + idSpazio + " è già riservato per quella data");
                } else {
                  dbConnection.query("INSERT INTO pagamenti (quantitativo, fornitore, utente) VALUES (?, ?, ?)", [quantitativo, idFornitore, idUtente], function (err, result) {
                    if (err) {
                      response.status(400);
                      response.send("Errore Query \n\n" + err);
                    } else {
                      idPagamento = result.insertId;

                      dbConnection.query("SELECT prenotazioni.data FROM prenotazioni INNER JOIN occupazioni ON prenotazioni.idPrenotazione = occupazioni.prenotazione WHERE occupazioni.spazio = ? AND prenotazioni.data = ?", [idSpazio, data], function (err, result) {
                        if (err) {
                          response.status(400);
                          response.send("Errore Query \n\n" + err);
                        } else {
                          if (!isEmpty(result)) {
                            response.status(500);
                            response.send("Lo spazio con id = " + idSpazio + " è già riservato per quella data \n\n");
                          } else {
                            dbConnection.query("INSERT INTO prenotazioni (data, pagamento, utente) VALUES (?, ?, ?)", [data, idPagamento, idUtente], function (err, result) {
                              if (err) {
                                response.status(400);
                                response.send("Errore Query \n\n" + err);
                              } else {
                                idPrenotazione = result.insertId;

                                dbConnection.query("INSERT INTO occupazioni (prenotazione, spazio) VALUES (?, ?)", [idPrenotazione, idSpazio], function (err, result) {
                                  if (err) {
                                    response.status(400);
                                    response.send("Errore Query \n\n" + err);
                                  } else {
                                    response.status(200);
                                    response.send("Prenotazione inserita correttamente");
                                  }
                                });
                              }
                            });
                          }
                        }
                      });
                    }
                  });
                }
              }
            });
          }
        }
      });
    });
    /*
    app.delete("/api/prenotazione", (request, response) => {
        var idPrenotazione = request.query.idPrenotazione;
     
        dbConnection.query("DELETE FROM prenotazioni WHERE idPrenotazione = ?", [idPrenotazione], function (err, result) {
            if (err) {
                response.status(400);
                response.send("Errore Query \n\n" + err);
            } else {
                dbConnection.query("DELETE FROM occupazioni WHERE prenotazione = ?", [idPrenotazione], function (err, result) {
                    if (err) {
                        response.status(400);
                        response.send("Errore Query \n\n" + err);
                    } else {
                        response.status(200);
                        response.send("Prenotazione con id = " + idPrenotazione + " eliminata");
                    }
                });
            }
        });
    });
    */

    //API Gestione Prenotazioni (Visualizzazione, Aggiunta e Eliminazione Spazi)
    app.get("/api/prenotazione/spazio", (request, response) => {
      var idPrenotazione = request.query.idPrenotazione;

      dbConnection.query("SELECT spazi.* FROM spazi INNER JOIN occupazioni ON spazi.idSpazio = occupazioni.spazio INNER JOIN prenotazioni ON occupazioni.prenotazione = prenotazioni.idPrenotazione WHERE prenotazioni.idPrenotazione = ?", [idPrenotazione], function (err, result) {
        if (err) {
          response.status(400);
          response.send("Errore Query \n\n" + err);
        } else {
          response.status(200);
          response.send(result);
        }
      });
    });
    app.post("/api/prenotazione/spazio", (request, response) => {
      var idPrenotazione = request.query.idPrenotazione;
      var idSpazio = request.query.idSpazio;

      dbConnection.query("SELECT * FROM prenotazioni WHERE idPrenotazione = ?", [idPrenotazione], function (err, result) {
        if (err) {
          response.status(400);
          response.send("Errore Query \n\n" + err);
        } else {
          if (isEmpty(result)) {
            response.status(500);
            response.send("La prenotazione con id = " + idPrenotazione + "non esiste")
          } else {
            var data = result[0].data;

            dbConnection.query("SELECT * FROM occupazioni o JOIN prenotazioni p ON p.idPrenotazione = o.prenotazione WHERE o.spazio = ? AND p.data = ?", [idSpazio, data], function (err, result) {
              if (err) {
                response.status(400);
                response.send("Errore Query \n\n" + err);
              } else {
                if (!isEmpty(result)) {
                  response.status(500);
                  response.send("Lo spazio con id = " + idSpazio + " è già riservato per quella data");
                } else {
                  dbConnection.query("SELECT * FROM prenotazioni WHERE idPrenotazione = ?", [idPrenotazione], function (err, result) {
                    if (err) {
                      response.status(400);
                      response.send("Errore Query \n\n" + err);
                    } else {
                      if (isEmpty(result)) {
                        response.status(500);
                        response.send("Non esiste una prenotazione con id = " + idPrenotazione);
                      } else {
                        dbConnection.query("SELECT * FROM spazi WHERE idSpazio = ?", [idSpazio], function (err, result) {
                          if (err) {
                            response.status(400);
                            response.send("Errore Query \n\n" + err);
                          } else {
                            if (isEmpty(result)) {
                              response.status(500);
                              response.send("Non esiste uno spazio con id = " + idSpazio);
                            } else {
                              dbConnection.query("INSERT INTO occupazioni (prenotazione, spazio) VALUES (?, ?)", [idPrenotazione, idSpazio], function (err, result) {
                                if (err) {
                                  response.status(400);
                                  response.send("Errore Query \n\n" + err);
                                } else {
                                  response.status(200);
                                  response.send("Spazio correttamente aggiunto alla prenotazione");
                                }
                              });
                            }
                          }
                        });
                      }
                    }
                  });
                }
              }
            });
          }
        }
      });
    });

    //API Spazi
    app.get("/api/spazio", (request, response) => {
      dbConnection.query("SELECT spazi.idSpazio, spazi.cordinataX, spazi.cordinataY, tipospazio.nome AS tipo FROM spazi INNER JOIN tipospazio ON tipospazio.idTipo = spazi.tipo", function (err, result) {
        if (err) {
          response.status(400);
          response.send("Errore Query \n\n" + err);
        } else {
          response.status(200);
          response.send(result);
        }
      });
    });
  };
});
var isEmpty = function (obj) {
  return Object.keys(obj).length === 0;
}