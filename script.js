let cards = [];
let proximoId = 1;

document.addEventListener("DOMContentLoaded", () => {
    configurarBotoes();
    configurarDragDrop();
});

function criarCard(coluna) {
    const texto = prompt("Digite o conteúdo do card:");
    if (!texto) return;

    const novoCard = {
        id: proximoId++,
        texto: texto,
        coluna: coluna
    };

    cards.push(novoCard);
    renderizar();
}

function configurarBotoes() {
    const botoes = document.querySelectorAll(".btn-novo-card");

    botoes.forEach(botao => {
        botao.addEventListener("click", () => {
            const coluna = botao.closest(".coluna").dataset.coluna;
            criarCard(coluna);
        });
    });
}

function renderizar() {
    const areas = document.querySelectorAll(".area-cards");

    areas.forEach(area => area.innerHTML = "");

    cards.forEach(card => {
        const elemento = document.createElement("div");
        elemento.classList.add("card");
        elemento.innerText = card.texto;
        elemento.draggable = true;

        elemento.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("id", card.id);
        });

        elemento.addEventListener("dblclick", () => {
            const novoTexto = prompt("Editar card:", card.texto);
            if (novoTexto) {
                card.texto = novoTexto;
                renderizar();
            }
        });

      
        const coluna = document.querySelector(
            `[data-coluna="${card.coluna}"] .area-cards`
        );

        coluna.appendChild(elemento);
    });
}


function configurarDragDrop() {
    const areas = document.querySelectorAll(".area-cards");

    areas.forEach(area => {

        area.addEventListener("dragover", (e) => {
            e.preventDefault();
            area.style.backgroundColor = "#d0e6ff"; 
        });

        area.addEventListener("dragleave", () => {
            area.style.backgroundColor = "";
        });

        area.addEventListener("drop", (e) => {
    e.preventDefault();

    const id = parseInt(e.dataTransfer.getData("id"));
    const areaDestino = e.currentTarget;
    const novaColuna = areaDestino.closest(".coluna").dataset.coluna;
    const card = cards.find(c => c.id === id);

    if (card) {
        card.coluna = novaColuna;
        renderizar();
    }
});

    });
}