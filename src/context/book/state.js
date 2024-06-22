// bookSearchResults should be an empty array
function getFavoriteBooks() {
   //Load/parse 'favoriteBooks' from localStorage
    const saved = localStorage.getItem("favoriteBooks");
    const initialValue = JSON.parse(saved);
    // favoriteBooks should be the value from localStorage or an empty array if localStorage value is falsy
    return initialValue || [];
  }

//initial state should have keys bookSearchResults and favoriteBooks
const initialState = {
    bookSearchResults: [],
    favoriteBooks: getFavoriteBooks(),
}

//export initial state object as default
export default initialState