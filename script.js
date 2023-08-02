let id = 0
var myHeaders = new Headers();
var myInit = {
  method: 'GET',
  headers: myHeaders,
  mode: 'cors',
  cache: 'default'
}

fetch('http://localhost:3000/postagens', myInit)
  .then(function (response) {
    return (response.json())
  })
  .then(function (resp) {
    //mapeando
    resp.map((element, index, array) => {
      //element recebendo os ids
      id = element.id
      const novaDiv = document.createElement("div")
      const img = document.createElement('img')
      const conteudo = document.createElement("p")
      const autor = document.createElement('p')
      const deleteButton = document.createElement("button")
      const editar = document.createElement("button")

      conteudo.classList.add("conteudo")
      autor.classList.add('autor')
      deleteButton.classList.add("deleteButton")
      editar.classList.add("deleteButton")
      editar.style.backgroundColor = "blue"


      //colocando a div como filho do section
      const sectionCards = document.querySelector(".section-cards");
      sectionCards.appendChild(novaDiv);
      novaDiv.append(img)
      novaDiv.append(conteudo)
      novaDiv.append(autor)
      novaDiv.appendChild(deleteButton)
      novaDiv.appendChild(editar)

      //criando um id dinamicamente
      deleteButton.setAttribute("id", id)

      //colocando a palavra deletar dentro do botão
      deleteButton.textContent = "deletar"
      editar.textContent = "editar"

      //mostrando dinamicamente na tela do cliente
      img.src = element.imagem
      conteudo.innerHTML = element.conteudo
      autor.innerHTML = element.autor
      //evento do deletar
      deleteButton.addEventListener("click", () => {
        const idDelete = deleteButton.getAttribute("id")
        fetch(`http://localhost:3000/postagens/${idDelete}`, {
          method: "delete",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }

        })
      })

    })
  })

//########## FORMULARIO ##########
const form = document.querySelector("form")
form.addEventListener("submit", (evento) => {
  evento.preventDefault()
  // const titulo = form.titulo.value
  // Selecionando a URL da imagem do JSON
  const imagem = form.imagem.value;
  const conteudo = form.conteudo.value
  const autor = form.autor.value

  fetch("http://localhost:3000/postagens", {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "id": (id + 1), "imagem": imagem, "conteudo": conteudo, "autor": autor

    })
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // Aqui você pode fazer algo com a resposta do servidor
      console.log(data);
    })
})

