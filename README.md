# **micro-frontend**

Serving multiple pages build with different technologies within single app

### Approach - 
1. Express server is acting like middleware which routes to react page if the route is listed in  `routes.js`
2. structure of the routes.js 
```
[
    {
        name: "Product Detail Page",
        path: "/products",
        children: [
          ":identifier",
        ]
      },
]
```
3. `data/products.js` products info serving as database.
4. css is written with css modules , override antd style if required  
### Pages -  
[Products](https://micronfontend-products.herokuapp.com/products)
-  display product rating in vanilla JS / jQuery

[Product Details](https://micronfontend-products.herokuapp.com/products/the-minimalist-entrepreneur) 
- shows product details with React 
- Add Rating to product
- Realtime Updates for ratings


### Third Party Libraries -
1. antd 
2. react-websocket