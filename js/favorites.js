const listBooksFavorite = JSON.parse(localStorage.getItem("books")) || [];




listBooksFavorite.forEach(element => {
    getAPI(element.id);
});

async function getAPI(url) {
    try {
        const api = await fetch(url);
        const result = await api.json();
        createFavoriteElement(result);
    } catch (error) {
        console.error("Erro ao buscar os dados da API:", error);
    }
}

function createFavoriteElement(api) {
    const favoriteContainer = document.createElement('div');
    favoriteContainer.classList.add('favorite-container');
    let image = api.volumeInfo.imageLinks.smallThumbnail;
    let title = api.volumeInfo.title;
    let id = api.volumeInfo.authors[0];

    favoriteContainer.innerHTML = `
        <img class="img-favorite" src="${image}">
        <div>
            <section class="favorite-info">
                <h3>${title}</h3>
                <h4>${id}</h4>
            </section>
            <section class="remove-favorite">
                <button class="remove-button">Remover</button>
            </section>
        </div>
    `;

    const favoriteList = document.querySelector('.favorite-list');
    favoriteList.appendChild(favoriteContainer);
    removeFavorite(favoriteContainer, id);
}

function removeFavorite(list) {
    const removeBook = list.querySelector('.remove-button');
    const id = list.querySelector('#');
  
    removeBook.addEventListener('click', ()=> {
        console.log('id da lista', list.childNodes[3])
        list.remove();

        
        // listBooksFavorite.splice(listBooksFavorite.findIndex((item) => item.id === id), 1);
        // localStorage.setItem('books', JSON.stringify(listBooksFavorite));
        console.log((listBooksFavorite.findIndex((item) => console.log(item.id === id))))
    })

}