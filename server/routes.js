export const reactRoutes = [
    {
        name: "Product Detail Page",
        path: "/products",
        children: [
          ":identifier",
        ]
      },
]