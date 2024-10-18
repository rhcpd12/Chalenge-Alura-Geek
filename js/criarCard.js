import { conectaApi } from "./conectaApi.js"

const formulario = document.querySelector("[data-formulario]");


async function criarCard(evento) {
    try {
        evento.preventDefault();
        const nome = document.querySelector("[data-nome]").value;
        const preco = document.querySelector("[data-preco]").value;
        const imagemInput = document.querySelector("[data-imagem]").files[0];
        const reader = new FileReader();
        
        const precoFormatado = parseFloat(preco).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });

        

        reader.onloadend = async () => {
            const imagemBase64 = reader.result;
            await conectaApi.criaCard(imagemBase64, nome, precoFormatado);
        }
        
        
        reader.readAsDataURL(imagemInput);
    } catch (erro) {
        console.error("Erro ao criar card:", erro);
        alert("Erro ao criar card. Tente novamente.");
    }
}
formulario.addEventListener("submit", evento => criarCard(evento));