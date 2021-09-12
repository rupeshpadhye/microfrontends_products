var convert = require('xml-js');

function nativeType(value) {
  var nValue = Number(value);
  if (!isNaN(nValue)) {
    return nValue;
  }
  var bValue = value.toLowerCase();
  if (bValue === 'true') {
    return true;
  } else if (bValue === 'false') {
    return false;
  }
  return value;
}

var removeJsonTextAttribute = function (value, parentElement) {
  try {
    var keyNo = Object.keys(parentElement._parent).length;
    var keyName = Object.keys(parentElement._parent)[keyNo - 1];
    parentElement._parent[keyName] = nativeType(value);
  } catch (e) { }
}


export const fetchBooks = (searchText, page = 1) => {
  const books = [];
  return new Promise((resolve, reject) => {
    fetch(`/api/search/index.xml?q=${searchText}&page=${page}`)
      .then(response => response.text())
      .then(data => {
        const res = convert.xml2js(data, {
          compact: true,
          trim: true,
          nativeType: false,
          ignoreDeclaration: true,
          ignoreInstruction: true,
          ignoreAttributes: true,
          ignoreComment: true,
          ignoreCdata: true,
          ignoreDoctype: true,
          textFn: removeJsonTextAttribute
        }).GoodreadsResponse;

        const totalItems = res.search['total-results'];
        const books = res.search.results.work;
        resolve({
          totalItems,
          books
        });
      }).catch(e => reject('something went wrong'));


  });
}

export const fetchBookDetails = (bookId) => {

  return new Promise((resolve, reject) => {
    fetch(`/api/book/show/${bookId}`)
      .then(response => response.text())
      .then(data => {
        const res = convert.xml2js(data, {
          compact: true,
          trim: true,
          nativeType: false,
          ignoreDeclaration: true,
          ignoreInstruction: true,
          ignoreAttributes: true,
          ignoreComment: true,
          textFn: removeJsonTextAttribute
        }).GoodreadsResponse;

        resolve({
          description: res.book.description._cdata,
          authors: Array.isArray(res.book.authors.author) ? res.book.authors.author : [res.book.authors.author]
        });
      }).catch(e => reject('something went wrong'));
  });

}

export const fetchAuthorDetails = (id) => {
  return new Promise((resolve, reject) => {
    fetch(`/api/author/show.xml/?id=${id}`)
      .then(response => response.text())
      .then(data => {
        const res = convert.xml2js(data, {
          compact: true,
          trim: true,
          nativeType: false,
          ignoreDeclaration: true,
          ignoreInstruction: true,
          ignoreAttributes: true,
          ignoreComment: true,
          textFn: removeJsonTextAttribute
        }).GoodreadsResponse;

        resolve({
          authorInfo: res.author
        });
      }).catch(e => reject('something went wrong'));
  });
}