/*PRODUTO, VALOR, ON OR OFF, LINK IMAGEM */
     //  alert(produtos["cerveja"]["antarctica"]["ANTARCTICA BOA 350ML"]) 
let lista = document.getElementById('listaProdutos')
let paginaProdutos = document.getElementById('paginaProdutos')
let destaqueBox = document.getElementById("destaqueBox")
let grupo = ""
let imgAnuncio = document.getElementById("anuncio")
let nAnuncio = 0
let carrinho = document.getElementById('card')

let destaques = [produtos[1][0][2],
                produtos[0][1][1],
                produtos[0][2][1],
                produtos[0][3][1]
                ]
function converterReal(a){
    valor = a.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
    return valor
}
function abrir(a){
    paginaProdutos.style.visibility = "visible"
    grupo = a
    mostrarProdutos(a)
}
function fecharProdutos(){
    paginaProdutos.style.visibility = "hidden"
}
function mostrarDestaques(){
    destaqueBox.innerHTML = ""

    for(i=0; i < destaques.length; i++){
        let produtoNome = destaques[i][0]
        let produtoValor = destaques[i][1]
        let produtoImagem = destaques[i][3]

        //addProd(produtoNome,produtoValor)

        destaqueBox.innerHTML +=
        `
        <div class="caixaProd">
            <img class="imagemProd" src="${produtoImagem}">
            <h3 class="tituloProd">${produtoNome.toUpperCase()}</h3>
            <h4 class="valorProd">${converterReal(produtoValor)}</h4>
        </div>
        `
    }
}
mostrarDestaques()
function mostrarProdutos(a){

    lista.innerHTML = ""
    for(let i = 0; i < produtos[a].length; i++){
    //for para cada subgrupo do grupo
        lista.innerHTML += 
        `
        <h2 class="tituloTema">${produtos[a][i][0]}</h2>
        <div class="destaques" id="boxProd${a}${i}"></div>
        `
    }

    for(let i = 0; i < produtos[a].length; i++){
        let box = document.getElementById(`boxProd${a}${i}`)
        for(let p = 1; p < produtos[a][i].length; p++){
        //for para cada produto do subgrupo
            let produtoNome = produtos[a][i][p][0]
            let produtoValor = produtos[a][i][p][1]
            let produtoImagem = produtos[a][i][p][3]

            box.innerHTML +=
            `
            <div class="caixaProd" id="${a}${i}${p}">
                <img class="imagemProd" src="${produtoImagem}">
                <h3 class="tituloProd">${produtoNome.toUpperCase()}</h3>
                <h4 class="valorProd">${converterReal(produtoValor)}</h4>
            </div>
            `
        }
    }
}
function slide(){
    imgAnuncio.setAttribute("src", anuncios[nAnuncio])
    nAnuncio++
    if(nAnuncio >= 5){
        nAnuncio = 0
    }
}
setInterval("slide()", 2500)

function abrirFecharCard(){
    if(carrinho.style.visibility == "visible"){
        carrinho.style.visibility = "hidden"
    }else{
        carrinho.style.visibility = "visible"
    }
}