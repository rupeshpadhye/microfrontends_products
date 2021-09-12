import bodyParser from "body-parser";
import express from "express";
import path from "path";
import cors from "cors";
import { products  } from "./data/products";
import { reactRoutes } from "./routes";

const app = express();
const expressWs = require("express-ws")(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const router = express.Router();
app.use(router);

router.get("/api/products", (req, res, next) => {
  return res.status(200).json(products);
});

router.get("/api/products/:identifier", (req, res, next) => {
  const { params } = req;
  const { identifier } = params;
  const product = products.find((p) => p.identifier === identifier);
  if (product) {
    return res.status(200).json(product);
  } else {
    return res.status(400).json({ message: "invalid product identifier" });
  }
});

router.post("/api/products/:identifier/reviews", (req, res, next) => {
  const { params, body } = req;
  const { review } = body;
  const { identifier } = params;
  const index = products.findIndex((p) => p.identifier === identifier);
  if (index > -1) {
    const product = products[index];
    const newReview = {
      id: Date.now(),
      ...review,
    };
    let { reviews } = product;
    product.reviews = [ newReview , ...reviews];
    product.avgRating = (
      reviews.reduce((acc, cur) => acc + cur.rating, 0) / product.reviews.length
    ).toFixed(2);
    const aWss = expressWs.getWss(`/api/products/${identifier}/live`);
    aWss.clients.forEach(function (client) {
      client.send(JSON.stringify(product));
    });
    return res.status(200).json(product);
  }
  return res.status(400).json({ message: "failed to add review" });
});

app.ws("/api/products/:identifier/live", function (ws, req) {
  ws.on("message", function (msg) {
    console.log(msg);
  });
});

const reactIndexPath = path.join(__dirname, "../../client/build/");
const htmlIndexPath = path.join(__dirname, "../../mvp/index.html");
app.use(express.static(reactIndexPath));
app.use(express.static(htmlIndexPath));

//to detect react route
reactRoutes.map((route) => {
  console.log("route.path ", route.path);
  // app.get(`${route.path}`, (req, res) => {
  //   console.log('came in route', reactIndexPath);
  //    res.sendFile(reactIndexPath);
  // });

  if (route.children && route.children.length) {
    route.children.map((childRoute) => {
      console.log("route.path.children ", `${route.path}/${childRoute}`);
      app.get(`${route.path}/${childRoute}`, (req, res) => {
        console.log("came in route.children", reactIndexPath);
        res.sendFile(reactIndexPath);
      });
    });
  }
});

app.get("*", (req, res) => {
  console.log("came in mvp path");
  res.sendFile(htmlIndexPath);
});

app.set("port", process.env.PORT || 3001);
app.listen(app.get("port"), () => {
  console.log(`Listening on ${app.get("port")}`);
});
