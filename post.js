fetch("http://localhost:3000/postagens", {
  method: "post",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "id": 8,
     "imagem":"https://images.velog.io/images/rememberme_jhk/post/2a1c5b17-c028-421f-a870-3538078a841c/js.png", 
     "titulo": "Teste do Método POST","conteudo":"Realizando o método POST do http com fetch.",
      "autor": "Daniel Souza"

  })
})
.then( (response) => { 
});