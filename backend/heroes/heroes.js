const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const axios = require("axios");

const port = process.argv.slice(2)[0];
const app = express();
app.use(bodyParser.json());

app.get("/heroes", (req, res) => {
  console.log("Returning heroes list");
  axios({
    method: "get",
    url: "https://my-json-server.typicode.com/Reine0017/json-temp/heroes",
  })
    .then((response) => {
      console.log(response.data);
      res.send(response.data);
    })
    .catch((err) => console.log(err));
});

app.get("/powers", (req, res) => {
  console.log("Returning powers list");

  axios({
    method: "get",
    url: "https://my-json-server.typicode.com/Reine0017/json-temp/powers",
  })
    .then((response) => {
      console.log(response.data);
      res.send(response.data);
    })
    .catch((err) => console.log(err));
});

app.post("/hero/**", (req, res) => {
  const heroId = parseInt(req.params[0]);

  axios({
    method: "get",
    url: "https://my-json-server.typicode.com/Reine0017/json-temp/heroes",
  })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .then((heroes) => {
      const foundHero = heroes.find((subject) => subject.id === heroId);

      if (foundHero) {
        for (let attribute in foundHero) {
          if (req.body[attribute]) {
            foundHero[attribute] = req.body[attribute];
            console.log(
              `Set ${attribute} to ${req.body[attribute]} in hero: ${heroId}`
            );
          }
        }
        console.log(`Hero ${foundHero}, ID ${heroId} called.`);
        res
          .status(202)
          .header({ Location: `http://localhost:${port}/hero/${foundHero.id}` })
          .send(foundHero);
      } else {
        console.log(`Hero not found.`);
        res.status(404).send();
      }
    })
    .catch((err) => console.log(err));
});

app.use("/img", express.static(path.join(__dirname, "img")));

console.log(`Heroes service listening on port ${port}`);
app.listen(port);
