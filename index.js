function isUserLoggedInVidya() {
  var loggedInUser = localStorage.getItem('loggedInUser')
  return loggedInUser === 'vidya'
}

document
  .getElementById('loginForm')
  .addEventListener('submit', function (event) {
    event.preventDefault() // Prevent form submission

    var username = document.getElementById('username').value
    var password = document.getElementById('password').value

    if (username === 'vidya' && password === 'vidya') {
      localStorage.setItem('loggedInUser', 'vidya')
      document.getElementById('loginSection').classList.add('hidden')
      document.getElementById('logoutButton').classList.remove('hidden')
      document.getElementById('loginButton').classList.add('hidden')
      document.getElementById('mainContent').classList.remove('hidden')
      document.getElementById('favoriteBooks').classList.add('hidden')
    } else {
      alert('Invalid username or password. Please try again.')
    }
  })

document.addEventListener('DOMContentLoaded', function () {
  var loggedInUser = localStorage.getItem('loggedInUser')

  if (isUserLoggedInVidya()) {
    // Hide the login section and show the main content
    document.getElementById('logoutButton').classList.remove('hidden')
    document.getElementById('loginButton').classList.add('hidden')
    document.getElementById('loginSection').classList.add('hidden')
    document.getElementById('mainContent').classList.remove('hidden')
    document.getElementById('favoriteBooks').classList.add('hidden')
  }
})

// Logout functionality
document.getElementById('logoutButton').addEventListener('click', function () {
  // Clear the 'venky' entry from localStorage
  localStorage.removeItem('loggedInUser')

  alert('user logout successfully')

  // Show the login section and hide the main content
  document.getElementById('logoutButton').classList.add('hidden')
  document.getElementById('loginButton').classList.remove('hidden')
  document.getElementById('loginSection').classList.add('hidden')
  document.getElementById('mainContent').classList.remove('hidden')
})

document.getElementById('loginButton').addEventListener('click', function () {
  document.getElementById('loginSection').classList.remove('hidden')
  document.getElementById('mainContent').classList.add('hidden')
})

document.getElementById('navItem1').addEventListener('click', function () {
  document.getElementById('loginSection').classList.add('hidden')
  document.getElementById('favoriteBooks').classList.add('hidden')
  document.getElementById('mainContent').classList.remove('hidden')
})

document.getElementById('mainLogo').addEventListener('click', function () {
  document.getElementById('loginSection').classList.add('hidden')
  document.getElementById('favoriteBooks').classList.add('hidden')
  document.getElementById('mainContent').classList.remove('hidden')
})

async function fetchBooksFromOpenLibrary() {
  try {
    const response = await fetch(
      'https://openlibrary.org/subjects/science_fiction.json?limit=10',
    )
    const data = await response.json()

    if (data?.works) {
      // Hide loader on successful response
      displayBooks(data?.works)
    }
  } catch (error) {
    console.error('Error fetching books:', error)
    hideLoader() // Hide loader if there's an error
  }
}

function showLoader() {
  document.getElementById('loader').style.display = 'block'
}

// Hide loader function
function hideLoader() {
  document.getElementById('loader').style.display = 'none'
}
function displayBooks(books) {
  var booksList = document.getElementById('booksList')

  booksList.innerHTML = ''

  // Iterate over the books and create list items to display them
  books.forEach(book => {
    // Create the elements for each book
    var listItem = document.createElement('li')
    var container = document.createElement('div')
    container.classList.add('r-container', 'd-flex', 'flex-row')

    var image = document.createElement('img')

    // Fetch cover image for the book from OpenLibrary API
    fetch(
      `https://openlibrary.org/search.json?title=${encodeURIComponent(
        book.title,
      )}`,
    )
      .then(response => response.json())
      .then(data => {
        if (data.docs.length > 0 && data.docs[0].cover_i) {
          const coverImageUrl = `https://covers.openlibrary.org/b/id/${data.docs[0].cover_i}-L.jpg`
          image.src = coverImageUrl
        } else {
          // If no image is available, use a placeholder
          image.src = 'https://example.com/placeholder.jpg'
        }
      })
      .catch(error => {
        console.error('Error fetching cover image:', error)
        // If there's an error, use a placeholder image
        image.src = 'https://example.com/placeholder.jpg'
      })

    image.classList.add('image1')

    var container3 = document.createElement('div')
    container3.classList.add('container3')

    var title = document.createElement('h1')
    title.textContent = book.title
    title.classList.add('side1')

    var authorPara = document.createElement('p')
    if (book.authors && book.authors.length > 0) {
      authorPara.textContent = book.authors[0].name // Assuming the first author
    } else {
      authorPara.textContent = 'Unknown Author'
    }
    authorPara.classList.add('para1')

    var authorHeader = document.createElement('h3')
    if (book.authors && book.authors.length > 0) {
      authorHeader.textContent = 'by ' + book.authors[0].name // Assuming the first author
    } else {
      authorHeader.textContent = 'by Unknown Author'
    }
    authorHeader.classList.add('h4')

    var readButton = document.createElement('button')

    readButton.textContent = 'Read Now'
    readButton.classList.add('button', 'btn', 'btn-primary')
    readButton.addEventListener('click', function () {
      // You can define a function for displaying details and call it here
      // For now, let's alert the book title
      alert('Display details for ' + book.title)
    })

    // Append elements to their respective containers
    container3.appendChild(title)
    container3.appendChild(authorPara)
    container3.appendChild(authorHeader)
    container3.appendChild(readButton)

    container.appendChild(image)
    container.appendChild(container3)
    listItem.appendChild(container)

    // Append the list item to the books list
    booksList.appendChild(listItem)
  })

  hideLoader()

  // Hide main content and show favorite books section
  document.getElementById('loginSection').classList.add('hidden')
  document.getElementById('mainContent').classList.add('hidden')
  document.getElementById('favoriteBooks').classList.remove('hidden')
}

document.getElementById('navItem2').addEventListener('click', function (event) {
  if (isUserLoggedInVidya()) {
    showLoader()
    fetchBooksFromOpenLibrary()
      .then(() => {
        // Hide loader after successful response
      })
      .catch(error => console.error('Error fetching books:', error))
  } else {
    alert('Please Login to continue')
  }
})

document.getElementById('Authors').addEventListener('click', function (event) {
  event.preventDefault()
  if (isUserLoggedInVidya()) {
    alert('Authors are not avalible yet!!')
  } else {
    alert('Please Login to continue')
  }
})

document.getElementById('RBooks').addEventListener('click', function (event) {
  event.preventDefault()

  if (isUserLoggedInVidya()) {
    alert('this is not available yet are not avalible yet!!')
  } else {
    alert('Please Login to continue')
  }
})

// Function to display the list of books
function displayBooksSearch(books) {
  var bookListContainer = document.getElementById('bookListContainer')

  // Iterate over the array of books and create list items to display them
  books.forEach(book => {
    var listItem = document.createElement('div')
    listItem.textContent = book.title // Display book title for demonstration
    bookListContainer.appendChild(listItem)
  })
}

// Function to clear the book list container
function clearBookList() {
  document.getElementById('bookListContainer').innerHTML = ''
}

document
  .getElementById('gotoSignIn')
  .addEventListener('click', function (event) {
    document.getElementById('form1').classList.add('hidden')
    document.getElementById('form2').classList.remove('hidden')
  })

document
  .getElementById('submitBtnSign')
  .addEventListener('click', function (event) {
    event.preventDefault()
    alert('sign in done')
  })

document.getElementById('Login').addEventListener('click', function (event) {
  document.getElementById('form1').classList.remove('hidden')
  document.getElementById('form2').classList.add('hidden')
})
