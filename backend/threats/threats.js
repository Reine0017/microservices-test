const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const axios = require("axios");

const port = process.argv.slice(2)[0];
const app = express();

app.use(bodyParser.json());

const heroesService = "http://localhost:8081";

app.get("/threats", (req, res) => {
  console.log("Returning threats list");
  axios({
    method: "get",
    url: "https://api.jsonbin.io/b/5f44d376993a2e110d35e6b7",
    headers: {
      "secret-key":
        "$2b$10$/FEAS8rdsgU05WApMWNsdOlOUhTnalLffRw8Degx5j2IsgVUG871G",
    },
  })
    .then((response) => {
      console.log(response.data);
      res.send(response.data);
    })
    .catch((err) => console.log(err));
});

app.post("/assignment", (req, res) => {
  axios({
    method: "post",
    url: `${heroesService}/hero/${req.body.heroId}`,
    headers: { "content-type": "application/json" },
    data: `{
            "busy": true
        }`,
  }).then(
    (heroResponse) => {
      console.log(heroResponse);
      const threatId = parseInt(req.body.threatId);
      const threat = threats.find((subject) => subject.id === threatId);
      threat.assignedHero = req.body.heroId;
      res.status(202).send(threat);
    },
    (error) => {
      console.log(error);
      res
        .status(400)
        .send({ problem: `Hero Service responded with issue ${error}` });
    }
  );
});

app.use("/img", express.static(path.join(__dirname, "img")));

console.log(`Threats service listening on port ${port}`);
app.listen(port);
