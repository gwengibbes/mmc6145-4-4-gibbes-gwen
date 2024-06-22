import { Link, useParams, useNavigate, Navigate } from "react-router-dom"
import { useBookContext } from "../../context/book"
import styles from "./style.module.css"
// Import actions
import reducer from "../../context/book/reducer"
import initialState from "../../context/book/state"
import { useReducer } from "react"
import { ADD_BOOK, REMOVE_BOOK, SEARCH_BOOKS } from "../../context/book/actions"

export default function Book() {
  const { bookId } = useParams()
  const navigate = useNavigate()
  // Use dispatch appropriately to add/remove books
  const [{bookSearchResults, favoriteBooks}, dispatch] = useBookContext()

  let isFavoriteBook = false
  let book = favoriteBooks.find(book => book.id === bookId)
  if (book)
    isFavoriteBook = true
  else
    book = bookSearchResults.find(book => book.id === bookId)
  if (!book) return <Navigate to='/favorites' />

  return (
    <main>
      <BookInfo isFavorite={isFavoriteBook} {...book}/>
      <div className={styles.controls}>
        {
          isFavoriteBook
          // Add onClick function that calls dispatch to remove a book
          ? <button onClick={() => dispatch ({action: REMOVE_BOOK, book})}>
              Remove from Favorites
            </button>
          // Add onClick function that calls dispatch to add a book
          : <button onClick={() => dispatch ({action: ADD_BOOK, book})}>
              Add to Favorites
            </button>
        }
        <Link onClick={() => navigate(-1)}>
          Return
        </Link>
      </div>
    </main>
  )
}

function BookInfo({
  title,
  authors,
  thumbnail,
  description,
  isFavorite,
  pageCount,
  categories,
  previewLink
}) {
  return (
    <>
      <div className={styles.titleGroup}>
        <div>
          <h1>{title}{isFavorite && <sup>⭐</sup>}</h1>
          {
            authors &&
            <h2>By: {authors.join(", ").replace(/, ([^,]*)$/, ', and $1')}</h2>
          }
          {
            categories &&
            <h3>Category: {categories.join(", ").replace(/, ([^,]*)$/, ', and $1')}</h3>
          }
        </div>
        <a target="_BLANK"
          href={previewLink}
          className={styles.imgContainer}
          rel="noreferrer">
          <img src={thumbnail
            ? thumbnail
            : "https://via.placeholder.com/128x190?text=NO COVER"} alt={title} />
          <span>Look Inside!</span>
        </a>
      </div>
      <p>Description:<br/>{description}</p>
      <p>Pages: {pageCount}</p>
      <div className={styles.links}>
        <span>Order online:</span>
        <a target="_BLANK"
          href={`https://www.amazon.com/s?k=${title} ${authors ? authors[0] : ""}`}
          rel="noreferrer">
          Amazon
        </a>
        <a target="_BLANK"
          href={`https://www.barnesandnoble.com/s/${title} ${authors ? authors[0] : ""}`}
          rel="noreferrer">
          Barnes & Noble
        </a>
      </div>
    </>
  )
}
