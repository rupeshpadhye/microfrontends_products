import bodyParser from 'body-parser'
import express from 'express'
import path from 'path'
import cors from 'cors';
import { products } from './data/products';
import { reactRoutes } from './routes';

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());


const router = express.Router()
app.use(router);

router.get('/api/products',(req, res, next) => {
  return res.status(200).json(products)
});



const reactIndexPath = path.join(__dirname, '../../client/build/');
const htmlIndexPath = path.join(__dirname, '../../mvp/index.html');
app.use(express.static(reactIndexPath));
app.use(express.static(htmlIndexPath));

//to detect react route 
reactRoutes.map(route => {
  console.log('route.path ', route.path);
  // app.get(`${route.path}`, (req, res) => {
  //   console.log('came in route', reactIndexPath);
  //    res.sendFile(reactIndexPath);
  // });

  if (route.children && route.children.length) {
    route.children.map(childRoute => {
      console.log('route.path.children ', `${route.path}/${childRoute}`);
      app.get(`${route.path}/${childRoute}`, (req, res) => {
        console.log('came in route.children', reactIndexPath);
         res.sendFile(reactIndexPath);
      });
    });
  }
});

app.get('*',(req, res) => {
  console.log('came in mvp path');
  res.sendFile(htmlIndexPath);
})

app.set('port', (process.env.PORT || 3001))
app.listen(app.get('port'), () => {
  console.log(`Listening on ${app.get('port')}`)
})
