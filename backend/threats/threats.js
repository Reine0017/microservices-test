const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const axios = require("axios");

const port = process.argv.slice(2)[0];
const app = express();

app.use(bodyParser.json());

const heroesService = "http://localhost:8081";

const threats = [
  {
    id: 1,
    displayName: "Pisa tower is about to collapse.",
    necessaryPowers: ["flying"],
    img: "tower.jpg",
    assignedHero: 0,
  },
  {
    id: 2,
    displayName: "Engineer is going to clean up server-room.",
    necessaryPowers: ["teleporting"],
    img: "mess.jpg",
    assignedHero: 0,
  },
  {
    id: 3,
    displayName: "John will not understand the joke",
    necessaryPowers: ["clairvoyance"],
    img: "joke.jpg",
    assignedHero: 0,
  },
];

app.get("/threats", (req, res) => {
  console.log("Returning threats list");
  res.send(threats);
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
