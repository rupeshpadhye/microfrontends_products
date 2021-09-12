
export const fetchProductDetails = (identifier) => {
  return new Promise((resolve, reject) => {
    fetch(`/api/products/${identifier}`)
      .then(response => response.json())
      .then(data => {
        resolve(data);
      }).catch(e => reject(e));
  });

}

export const saveReview = (identifier, review) => {
  return new Promise((resolve, reject) => {
      fetch(`/api/products/${identifier}/reviews`, {
        method: "POST",
        body: JSON.stringify({
        review,
      }),   
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }})
    .then(response => response.json())
    .then(json =>   resolve(json))
    .catch(e => reject(e));;
  });
}



