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

  <h3>${title}</h3>
        <img class="img-favorite" src="${image}">
        <div>
            <section class="favorite-info">
               
              
            </section>
            <section class="remove-favorite" id=${id}>
                <button class="remove-button btn btn-danger">Remover</button>
            </section>
        </div>
   
    `;

  const favoriteList = document.querySelector(".favorite-list");
  favoriteList.appendChild(favoriteContainer);
  removeFavorite(favoriteContainer);
}

function removeFavorite(list) {
  const removeBook = list.querySelector(".remove-button");
  const id = list.childNodes[3].childNodes[3].getAttribute("id");

  removeBook.addEventListener("click", () => {
    list.remove();

    listBooksFavorite.splice(
      listBooksFavorite.findIndex((item) => item.id === id),
      1
    );
    localStorage.setItem("books", JSON.stringify(listBooksFavorite));
  });
}
