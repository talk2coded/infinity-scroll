const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
 
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = 'B5R4AmAInjP3QekmvUGsd_tBz0L6R9iF1zETYz_7z4g';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


// check if all images were loaded
function imageLoaded(){
    imagesLoaded++;
    if (imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
    }
}


// create elements for links and photos, add to DOM
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
  
    //   run for each object in photosarray
    photosArray.forEach((photo) => {
        //  create <a></a> to link to unsplash
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');
        // create img for photo
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);

        // Event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded );

        // put img inside <a></a>, then put both inside inage container
        item.appendChild(img);
        imageContainer.appendChild(item);
        
    });
}


// get photos from unsplash API
async function getPhotos(){
    try{

        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }catch(error){
        // catch error

    }
}


// check to see if scrolling near bottom of page, loads more
window.addEventListener('scroll', ()=> {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
});

// On load
getPhotos();