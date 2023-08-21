const listBooksFavorite = JSON.parse(localStorage.getItem("books")) || [];

listBooksFavorite.forEach((element) => {
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
  const favoriteContainer = document.createElement("div");
  favoriteContainer.classList.add("item");
  let image = api.volumeInfo.imageLinks.smallThumbnail;
  let title = api.volumeInfo.title;
  let id = api.selfLink;

  favoriteContainer.innerHTML = `

  <h2 class="book-title">${title}</h2>
        <img src="${image}">
        <div class="section-btn">
         
        <button class="remove-button btn btn-danger" id=${id}>Remover</button>
                    
        </div>

        </div>
       
    `;

  const favoriteList = document.querySelector(".favorite-list");
  favoriteList.appendChild(favoriteContainer);
  removeFavorite(favoriteContainer);
}

function removeFavorite(list) {
  const removeBook = list.querySelector(".remove-button");
  const id = list.childNodes[5].childNodes[1].getAttribute("id");

  removeBook.addEventListener("click", () => {
    list.remove();

    listBooksFavorite.splice(
      listBooksFavorite.findIndex((item) => item.id === id),
      1
    );
    localStorage.setItem("books", JSON.stringify(listBooksFavorite));
  });
}
