const select = document.querySelector("select")
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
        //mapeando os arrays
        console.log(resp)
        resp.map((element, index, array) => {
            //element recebendo os ids
            id = element.id
            const options = document.createElement("option")
            select.append(options)
            options.innerHTML = `${element.id} - ${element.autor}`
        })
    })
// evento do formulario
const form = document.querySelector("form")
//evento change do select
select.addEventListener("change", (evento) => {
    const idBusca = select.value.split(" ")
    evento.preventDefault()
    fetch(`http://localhost:3000/postagens/${idBusca[0]}`, myInit)
        .then(function (response) {
            return (response.json())
        })
        .then(function (resp) {
            console.log(select)
            const divImg = document.querySelector("#divImg")
            // Remover a imagem anterior, se existir
            const imgAnterior = divImg.querySelector("img")
            if (imgAnterior) {
                imgAnterior.remove();
            }
            //valor da imagem
            form.imagem.value = resp.imagem
            //criando uma tag img
            const img = document.createElement("img")
            //colocando a img como filho na divImg
            divImg.append(img)
            //mostrando dinamicamente
            img.src = resp.imagem
            form.conteudo.value = resp.conteudo
            form.autor.value = resp.autor

            form.setAttribute("data-id", idBusca[0])
            //evento de editar
            form.addEventListener("submit", (evento) => { 
                evento.preventDefault()
                const imagem = form.imagem.value
                const conteudo = form.conteudo.value
                const autor = form.autor.value
                fetch(`http://localhost:3000/postagens/${idBusca[0]}`, {
                    method: "put",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "id": id+1, "imagem": imagem, "conteudo": conteudo, "autor": autor
                  
                      })
                })
            })
        })
})