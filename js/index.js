import { apiKey } from "./key.js";
const btnSearch = document.querySelector('#btnSearch');
const listBooksFavorite = JSON.parse(localStorage.getItem("books")) || [];

btnSearch.addEventListener('click', (event) => {
    event.preventDefault();
    const input = document.querySelector('#search');
    if (input.value == '') {
        alert('Digite o nome do filme para pesquisar')
        return;
    }

    searchBook(input);
    input.value = '';
})

async function searchBook(input) {

    try{
        const api = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${input.value}&maxResults=30&key=${apiKey}`);
        const resultOfSearch = await api.json();
        creatBook(resultOfSearch.items);

    }catch(error){
        alert("Erro ao buscar os dados da API")
    }
    

    
}

function creatBook(json) {
    const list = document.querySelector('.list');
    list.innerHTML = '';


    json.forEach((element) => {

        if (element.volumeInfo.imageLinks != undefined) {

            let title = element.volumeInfo.title;
            let image = element.volumeInfo.imageLinks.smallThumbnail;
            let idBook = element.selfLink;

            list.innerHTML += `<div class="item" id="${idBook}">
        <h2 class="book-title">${title}</h2>
        <img src="${image}">
        <div>
          <button class="show-details-button">Saiba mais</button>
          <button data-btn-favorite>Favoritos</button>
        </div>

        </div>`;

    }
        
    });
    
    listBooks()  

   

}



function listBooks() {

    const books = document.querySelectorAll('.item');

    books.forEach(book => {
        const detailsButton = book.querySelector('.show-details-button');
        const btnFavorite = book.querySelector('[data-btn-favorite]');

        detailsButton.addEventListener('click', () => {
            const idBook = book.getAttribute('id')
            getIdBook(idBook)
        })

        btnFavorite.addEventListener('click', ()=>{
            const title = book.childNodes[1].textContent;
            const idBook = book.getAttribute('id')
            
            const favoriteBook =  {
                nameBook : title,
                id: idBook
            }
            listBooksFavorite.push(favoriteBook);
            console.log(listBooksFavorite)
            localStorage.setItem('books', JSON.stringify(listBooksFavorite));
            alert('Livro adicionado aos favoritos!')
        })
        

    })

}

async function getIdBook(id){
    const api = await fetch(id)
    const resultID = await api.json();
    openModal(resultID)
}

function openModal(book){
    const modal = document.querySelector('[data-modal]')
    modal.innerHTML = `<img src="${book.volumeInfo.imageLinks.thumbnail}" alt="">
    <h2>${book.volumeInfo.title}</h2>
    <p>${book.volumeInfo.description}</p>`
    modal.showModal()
}



