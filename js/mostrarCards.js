import { conectaApi } from "./conectaApi.js";

const lista = document.querySelector("[data-lista]");
const mensagemNenhumProduto = document.querySelector(".produtos__mensagem");

function constroiCard(imagem, nome, preco,id) {
    const card = document.createElement("li");
    card.className = "card__produto";
    card.innerHTML = `<img class="card__imagem" src="${imagem}" alt="produto">
                <h2 class="produto__nome">${nome}</h2>
                <h3 class="produto__preco">${preco}</h3>
                <button class="btn__delete"><img class="btn__delete__img" src="./assets/icone_delete.png" alt="icone_delete"></button>`

     
     const btnDelete = card.querySelector(".btn__delete");
     btnDelete.addEventListener("click", async () => {
         await conectaApi.removeCard(id);  
         card.remove();
         verificaSeListaEstaVazia();  
     });

    return card;
}

async function listaCard() {
    const listaApi = await conectaApi.listaCards();
    if (listaApi.length === 0) {
        mensagemNenhumProduto.style.display = "block";
    } else {
        mensagemNenhumProduto.style.display = "none";
        listaApi.forEach(elemento => {
            lista.appendChild(constroiCard(elemento.imagem, elemento.nome, elemento.preco, elemento.id));
        });
    }
}

function verificaSeListaEstaVazia() {
    const cardsRestantes = document.querySelectorAll(".card__produto");
    if (cardsRestantes.length === 0) {
        mensagemNenhumProduto.style.display = "block"; 
    }
}




   

listaCard();