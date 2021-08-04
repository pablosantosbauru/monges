/*PRODUTO, VALOR, ON OR OFF, LINK IMAGEM */
     //  alert(produtos["cerveja"]["antarctica"]["ANTARCTICA BOA 350ML"]) 
let lista = document.getElementById('listaProdutos')
let paginaProdutos = document.getElementById('paginaProdutos')
let destaqueBox = document.getElementById("destaqueBox")
let grupo = ""
let imgAnuncio = document.getElementById("anuncio")
let nAnuncio = 0
let carrinho = document.getElementById('card')
let dados = document.getElementById('paginaConfirmaDados')
let casco = document.getElementById('paginaConfirmaCascos')
let listaCarrinho = document.getElementById('listaCarrinho')
let listaProdutos = []
let ped = 0
let totalPedidos = 0
let total = document.getElementById('totalCard')
let totalConfirma = document.getElementById('totalConfirma')
let valorTotal = 0
let nomeC = ""
let valorC = ""

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
            let produtoCasco = produtos[a][i][p][4]
            if(produtos[a][i][p][4] == true){
                produtoCasco = 1
            }
            box.innerHTML +=
            `
            <div class="caixaProd" id="${a}${i}${p}"
            onclick="comprarProd('${produtoNome}', ${produtoValor}, ${produtoCasco})">

                <img class="imagemProd" src="${produtoImagem}">
                <h3 class="tituloProd">${produtoNome.toUpperCase()}</h3>
                <h4 class="valorProd">${converterReal(produtoValor)}</h4>
            </div>
            `
            if(produtos[a][i].length < 4){
                document.getElementById(`boxProd${a}${i}`).style.justifyContent= "space-around"
            }
            produtoCasco = 0
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
function abrirFecharConfirmaDados(){
    if(dados.style.visibility == "visible"){
        dados.style.visibility = "hidden"
    }else{
        dados.style.visibility = "visible"
    }
}
function comprarOk(nome, valor){
    abrirFecharCard()
    listaCarrinho.innerHTML +=
    `
    <div class="cardDesejo" id="pedido${ped}">
        <p class="cardDesejoTitulo">${nome}</p>
        <p class="hiddenP">${valor}</p>
        
        <label class="autoDesejo" id="lq${ped}">1</label>
        <label>un</label>
        <label class="autoDesejo" id="lv${ped}">${converterReal(valor)}</label>
        <br>
        <button id="ma0" class="cardMudarMaior" onclick="mais6(${valor},${ped})">+6</button>
        <button id="ma0" class="cardMudarMaior" onclick="mais12(${valor},${ped})">+12</button>
        <button id="ma0" class="cardMudar" onclick="maisQ(${valor},${ped})">+</button>
        <button id="me0" class="cardMudar" onclick="menosQ(${valor},${ped})">-</button>
        <button id="ap0" class="cardApagar" onclick="apagar(${ped})">APAGAR</button>
    </div>
    `
    listaProdutos[ped] = [nome, valor, 1]
    ped++
    totalPedidos++
    somarTotalValor()
}
function comprarProd(nome,valor,precisaCasco){
    //alert(`o produto é "${nome}" e custa ${valor}`)
    if(precisaCasco == 1){
        casco.style.visibility = "visible"
        nomeC = nome
        valorC = valor
    }else{
        comprarOk(nome,valor)
    }

}
function perguntaCasco(resp){
    if(resp == 1){
        comprarOk(nomeC, valorC)
    }
    casco.style.visibility = "hidden"
}
function somarTotalValor(){
    for(let i = 0; i < listaProdutos.length; i++){
        if(listaProdutos[i][1] > 0)
        valorTotal += listaProdutos[i][1]
    }
    total.innerHTML = converterReal(valorTotal)
    valorTotal = 0
}
function somarTotalValor2(){
    for(let i = 0; i < listaProdutos.length; i++){
        if(listaProdutos[i][1] > 0)
        valorTotal += listaProdutos[i][1]
    }
    totalConfirma.innerHTML = converterReal(valorTotal)
    valorTotal = 0
}
function maisQ(valor, nPedido){
    let qt = document.getElementById(`lq${nPedido}`)
    let vl = document.getElementById(`lv${nPedido}`)
    listaProdutos[nPedido][2] += 1
    listaProdutos[nPedido][1] += valor
    qt.innerHTML = listaProdutos[nPedido][2]
    vl.innerHTML = converterReal(listaProdutos[nPedido][1])
    somarTotalValor()
}
function mais6(valor, nPedido){
    let qt = document.getElementById(`lq${nPedido}`)
    let vl = document.getElementById(`lv${nPedido}`)
    listaProdutos[nPedido][2] += 6
    listaProdutos[nPedido][1] += valor*6
    qt.innerHTML = listaProdutos[nPedido][2]
    vl.innerHTML = converterReal(listaProdutos[nPedido][1])
    somarTotalValor()
}
function mais12(valor, nPedido){
    let qt = document.getElementById(`lq${nPedido}`)
    let vl = document.getElementById(`lv${nPedido}`)
    listaProdutos[nPedido][2] += 12
    listaProdutos[nPedido][1] += valor*12
    qt.innerHTML = listaProdutos[nPedido][2]
    vl.innerHTML = converterReal(listaProdutos[nPedido][1])
    somarTotalValor()
}
function menosQ(valor, nPedido){
    let qt = document.getElementById(`lq${nPedido}`)
    let vl = document.getElementById(`lv${nPedido}`)
    if(listaProdutos[nPedido][2]>1){
        listaProdutos[nPedido][2] -= 1
        listaProdutos[nPedido][1] -= valor
    }else{
        listaProdutos[nPedido][2] = 1
    }

    qt.innerHTML = listaProdutos[nPedido][2]
    vl.innerHTML = converterReal(listaProdutos[nPedido][1])
    somarTotalValor()
}
function apagar(ped){
    pedidoApagar = document.getElementById(`pedido${ped}`)
    pedidoApagar.parentNode.removeChild(pedidoApagar)
    listaProdutos[ped] = [0,0,0]
    totalPedidos--
    somarTotalValor()
}
function confirmaDados(){
    if(totalPedidos>0){
        abrirFecharConfirmaDados()
        somarTotalValor2()
    }
}


/*
<p class="autoDesejo">${converterReal(valor)}</p>

<div class="cardDesejo" id="d0">
    <p class="cardDesejoTitulo">PRODUTO X long neck </p>
    <p class="hiddenP">2.5</p>
    <p class="autoDesejo">R$2,50un</p>
    <label class="autoDesejo" id="lq0">6un</label>
    <label class="autoDesejo" id="lv0">R$15,00</label>
    <br>
    <button id="ma0" class="cardMudar">+</button>
    <button id="me0" class="cardMudar">-</button>
    <button id="ap0" class="cardApagar">APAGAR</button>
</div>
*/
