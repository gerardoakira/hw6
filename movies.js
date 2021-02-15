// First, sign up for an account at https://themoviedb.org
// Once verified and signed-in, go to Settings and create a new
// API key; in the form, indicate that you'll be using this API
// key for educational or personal use, and you should receive
// your new key right away.

// For this exercise, we'll be using the "now playing" API endpoint
// https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US

// Note: image data returned by the API will only give you the filename;
// prepend with `https://image.tmdb.org/t/p/w500/` to get the 
// complete image URL

window.addEventListener('DOMContentLoaded', async function(event) {
  // Step 1: Construct a URL to get movies playing now from TMDB, fetch
  // data and put the Array of movie Objects in a variable called
  // movies. Write the contents of this array to the JavaScript
  // console to ensure you've got good data
  // ⬇️ ⬇️ ⬇️
  let apiKey = '331cf67ae6ac540fe6028e9b6d6c64a6' // <<<< fill in with your api key from step 1 (or the api key we provided)
  let response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US`)
  let json = await response.json()
  console.log(json)
  // ⬆️ ⬆️ ⬆️ 
  // End Step 1
  // Step 2: 
  // - Loop through the Array called movies and insert HTML
  //   into the existing DOM element with the class name .movies
  // - Include a "watched" button to click for each movie
  // - Give each "movie" a unique class name based on its numeric
  //   ID field.
  // Some HTML that would look pretty good... replace with real values :)
  // <div class="w-1/5 p-4 movie-abcdefg1234567">
  //   <img src="https://image.tmdb.org/t/p/w500/moviePosterPath.jpg" class="w-full">
  //   <a href="#" class="watched-button block text-center text-white bg-green-500 mt-4 px-4 py-2 rounded">I've watched this!</a>
  // </div>
  // ⬇️ ⬇️ ⬇️
      // let movies = json.results
      // console.log(movies)


      // for (let i=0; i<movies.length; i++) {
      //   let movieImage = movies[i].poster_path
      //   let movieName = movies[i].original_title
      //   document.querySelector('.movies').insertAdjacentHTML('beforeend', `
      //   <div class="movie-${movieName} text-center p-12">
      //   <img src="https://image.tmdb.org/t/p/w500/${movieImage}" class="mx-auto">
      //   <h1 class="text-2xl text-bold text-gray-50">${movieName}</h1>
      //   <a hrer="#" class="done p=2 text-lg bg-green-400 text-white"> ✔️ watched </a>
      //   </div>
      //   `)
      //   console.log(movieName)
      // }

  // ⬆️ ⬆️ ⬆️ 
  // End Step 2

  // Step 3: 
  // - Attach an event listener to each "watched button"
  // - Be sure to prevent the default behavior of the button
  // - When the "watched button" is clicked, changed the opacity
  //   of the entire "movie" by using .classList.add('opacity-20')
  // - When done, refresh the page... does the opacity stick?
  // - Bonus challenge: add code to "un-watch" the movie by
  //   using .classList.contains('opacity-20') to check if 
  //   the movie is watched. Use .classList.remove('opacity-20')
  //   to remove the class if the element already contains it.
  // ⬇️ ⬇️ ⬇️
  let movies = json.results
  console.log(movies)
  
  let db = firebase.firestore()
  let querySnapshot = await db.collection('watched').get()

  let watchedMovies = querySnapshot.docs
  // console.log(querySnapshot.docs.length)
  // console.log(querySnapshot.size)
  // console.log(watchedMovies)


  for (let i=0; i<movies.length; i++) {
    let movieId = movies[i].id
    let movieImage = movies[i].poster_path
    let movieName = movies[i].original_title
    document.querySelector('.movies').insertAdjacentHTML('beforeend', `
    <div class="movie-${movieId} text-center p-12">
    <img src="https://image.tmdb.org/t/p/w500/${movieImage}" class="mx-auto">
    <h1 class="text-2xl text-bold text-gray-50">${movieName}</h1>
    <a hrer="#" class="done p=2 text-lg bg-green-400 text-white"> ✔️ watched </a>
    </div>
    `)
   
    let querySnapshot = await db.collection('watched').get()
    let watched = querySnapshot.docs  
    for (let i=0; i<watched.length; i++) {
      let watchedId = watched[i].id
      if (watchedId == movieId) {
        document.querySelector(`.movie-${movieId}`).classList.add('opacity-20')
      }
    }

    document.querySelector(`.movie-${movieId} .done`).addEventListener('click',async function (event){
      event.preventDefault()
      if (document.querySelector(`.movie-${movieId}`).classList.contains('opacity-20') == true) {
        document.querySelector(`.movie-${movieId}`).classList.remove('opacity-20')
        await db.collection('watched').doc(`${movieId}`).delete()
      }       
      else {
      document.querySelector(`.movie-${movieId}`).classList.add('opacity-20')
      docRef=await db.collection(`watched`).doc(`${movieId}`).set({})
      console.log(`${movieName} watched!`)
      }
    })



  }


  // ⬆️ ⬆️ ⬆️ 
  // End Step 3

  // Step 4: 
  // - Properly configure Firebase and Firebase Cloud Firestore
  // - Inside your "watched button" event listener, you wrote in
  //   step 3, after successfully setting opacity, persist data
  //   for movies watched to Firebase.
  // - The data could be stored in a variety of ways, but the 
  //   easiest approach would be to use the TMDB movie ID as the
  //   document ID in a "watched" Firestore collection.
  // - Hint: you can use .set({}) to create a document with
  //   no data – in this case, the document doesn't need any data;
  //   if a TMDB movie ID is in the "watched" collection, the 
  //   movie has been watched, otherwise it hasn't.
  // - Modify the code you wrote in Step 2 to conditionally >>>>>>>>>>>>< I DID IT ON STEP 3
  //   make the movie opaque if it's already watched in the 
  //   database.
  // - Hint: you can use if (document) with no comparison
  //   operator to test for the existence of an object.
})