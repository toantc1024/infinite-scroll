const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];


// Unsplash API
let count = 5;
const apiKey = 'PeJXhlm9mVkPKO6ifICANLgpRk7LNozoZdGEXin6pE0';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


// Check if all images were loaded
const imageLoaded = () => {
    imagesLoaded++;
    // console.log('imageLoaded', imagesLoaded, totalImages); 
    if (imagesLoaded === totalImages) {
        ready = true;
        if(!loader.hasAttribute('hidden')) {
            loader.hidden = true;
        }
        count = 30;
        apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
        // console.log('imageLoaded', imagesLoaded, totalImages); 
        // console.log('ready =', ready);
    } 

}

// Helper Function to Set Attribute on DOM Elements
const setAttributes = (element, attributes) => {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements For Links & Photos, Add to DOM
const displayPhotos = (photosArray) => {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total image', totalImages);  
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });

        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        // Event Listener, check when each is finish loading
        img.addEventListener('load', imageLoaded);
        // Put <img> inside <a>, then both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}

// Get photos from API
const getPhotos = () => {
    try {
        fetch(apiUrl)
        .then(response => response.json())
        .then(displayPhotos)
        .catch(console.log);
    }
    catch (err) {
        // console.log(err);
    }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    if (ready && window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
        // 1000px is a buffer for triggering event before bottom is reached
        console.log('get more photos');
        ready = false;
        getPhotos();
    } else {

    }
});

getPhotos();

// displayPhotos(photosArray);