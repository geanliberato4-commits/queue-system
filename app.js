// Banco de dados simples usando localStorage
const DB_KEY = "filas_sistema";

// Salvar no "banco"
function salvar(dados) {
    localStorage.setItem(DB_KEY, JSON.stringify(dados));
}

// Carregar do "banco"
function carregar() {
    return JSON.parse(localStorage.getItem(DB_KEY) || "[]");
}

// GERAR SENHA
if (location.pathname.includes("gerar.html")) {
    const form = document.getElementById("formSenha");
    const exibir = document.getElementById("senha-gerada");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const dados = carregar();

        const senha = {
            nome: nome.value,
            placa: placa.value,
            tipo: tipo.value,
            chamada: false
        };

        dados.push(senha);
        salvar(dados);

        exibir.innerHTML = `<h2>Senha Gerada:</h2><p>${senha.nome}</p>`;
        form.reset();
    });
}

// PAINEL DO ATENDIMENTO
if (location.pathname.includes("painel.html")) {
    function atualizarPainel() {
        const dados = carregar();
        const lista = document.getElementById("lista-atendimentos");

        lista.innerHTML = "";

        dados.forEach((s, index) => {
            const div = document.createElement("div");
            div.className = "item";

            div.innerHTML = `
                <p><b>${s.nome}</b> (${s.placa}) — ${s.tipo}</p>
                <button onclick="chamar(${index})">Chamar</button>
            `;

            lista.appendChild(div);
        });
    }

    window.chamar = function(index) {
        const dados = carregar();
        const item = dados[index];

        localStorage.setItem("senha_atual", item.nome);
        localStorage.setItem("guincho_atual", item.tipo);

        atualizarPainel();
    }

    atualizarPainel();
}

// TELA DE CHAMADA
if (location.pathname.includes("index.html")) {
    function atualizarTela() {
        document.getElementById("senha-atual").textContent =
            localStorage.getItem("senha_atual") || "—";

        document.getElementById("guincho-atual").textContent =
            localStorage.getItem("guincho_atual") || "—";
    }

    setInterval(atualizarTela, 500);
}
