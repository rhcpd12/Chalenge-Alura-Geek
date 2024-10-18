async function listaCards() {
    const conexao = await fetch("http://localhost:3000/cards")
    const conexaoConvertida = await conexao.json();

    return conexaoConvertida;
}

async function criaCard(imagem, nome, preco) {
    const conexao = await fetch("http://localhost:3000/cards", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            imagem: imagem, 
            nome: nome,
            preco: preco

        })
    });

    const conexaoConvertida = await conexao.json();
    return conexaoConvertida;
    
   
}

async function removeCard(id) {
    const conexao = await fetch(`http://localhost:3000/cards/${id}`, {
        method: "DELETE"
    });

    if (!conexao.ok) {
        throw new Error('Não foi possível remover o card');
    }
}
   


export const conectaApi = {
    listaCards,
    criaCard,
    removeCard
}