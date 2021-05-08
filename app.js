
const auth = '563492ad6f91700001000001d19db8dd946b4d70ae95b58c60b15876';
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const searchForm = document.querySelector('.search-form');
const submitBtn = document.querySelector('.submit-btn');
const moreBtn = document.querySelector('.more-btn');
let searchValue;
let page = 1;
let fetchLink;
let currentSearch;
searchInput.addEventListener('input', updateInput);
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchImages(searchValue);
});

moreBtn.addEventListener('click', loadMore);
function updateInput(e){
    searchValue = e.target.value;
}
async function fetchApi(url){
    const dataFetch = await fetch(url, {
    method: 'GET',
    headers: {
        Accept: 'application/json',
        Authorization: auth
    }
 });
    const data = await dataFetch.json();
    return data;
}
function generateImages(data){
    data.photos.forEach(photo => {
        const galleryImg = document.createElement('div');
        galleryImg.classList.add('gallery-img');
        galleryImg.innerHTML = `
        <div class="gallery-items">
        <p>By: ${photo.photographer}</p>
        <a href=${photo.src.original}>Download</a>
        </div>
        <img src="${photo.src.portrait}" alt="Unable to load image">
        `;
        gallery.appendChild(galleryImg);
 });
}
async function curatedImages(){
    fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
    const data = await fetchApi(fetchLink);
    generateImages(data);
   }
async function searchImages(query){
    clear();
    currentSearch = searchInput.value;
    fetchLink = `https://api.pexels.com/v1/search?query=${query}+querye&per_page=15&page=1`;
    const data = await fetchApi(fetchLink);
    
    generateImages(data);
}
function clear(){
    gallery.innerHTML = '';
    searchInput.value = '';
}
const noteContainer = document.querySelector('.note-container')
setTimeout(function(){
    noteContainer.style.display = 'none';
}, 5000);

async function loadMore(){
    page++;
    if(currentSearch){
        fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+querye&per_page=15&page=${page}`;
    } else {
        fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
    }
    const data = await fetchApi(fetchLink);
    generateImages(data);
}
curatedImages();

