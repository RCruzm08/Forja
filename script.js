const somarDano = (danoBase, buff) => danoBase + buff;
const materiaisBasicos  = ["Ferro", "Madeira", "Couro"];
const materiaisMagicos  = ["Pó de Fada", "Cristal de Fogo"];
const estoqueCompleto   = [...materiaisBasicos, ...materiaisMagicos];
console.log("Estoque completo:", estoqueCompleto);

const catalogoDeBuffs = {
  fogo:   { elemento: "Fogo",   danoExtra: 10, nomeAdicional: "Abençoado por Hefestos" },
  raio:   { elemento: "Raio",   danoExtra: 18, nomeAdicional: "Tocado por Zeus"        },
  gelo:   { elemento: "Gelo",   danoExtra: 8,  nomeAdicional: "Sopro de Despoina"      },
  veneno: { elemento: "Veneno", danoExtra: 12, nomeAdicional: "da Medusa"       },
  divino: { elemento: "Divino", danoExtra: 25, nomeAdicional: "Forjado no Olimpo"      },
};

const catalogoDeArmas = {
  espada: { icone: "⚔️", nomeBase: "Espada de Bronze Celestial", dano: 15, durabilidade: 10 * 10 },
  arco:   { icone: "🏹", nomeBase: "Arco dos Ventos",             dano: 12, durabilidade: 8 * 10  },
  adaga:  { icone: "🗡️", nomeBase: "Adaga das Sombras",           dano: 10, durabilidade: 7 * 10  },
  lanca:  { icone: "🔱", nomeBase: "Lança de Poseidon",           dano: 18, durabilidade: 9 * 10  },
};

let arsenal = [];

function forjarArma() {
  const tipoEscolhido         = document.getElementById("tipo-arma").value;
  const encantamentoEscolhido = document.getElementById("encantamento").value;

  const armaBase        = catalogoDeArmas[tipoEscolhido];
  const buffSelecionado = catalogoDeBuffs[encantamentoEscolhido];

  const armaEvoluida = {
    ...armaBase,
    ...buffSelecionado,
    nome:      `${armaBase.icone} ${armaBase.nomeBase} ${buffSelecionado.nomeAdicional}`,
    danoTotal: armaBase.dano + buffSelecionado.danoExtra,
  };

  document.getElementById("weapon-name").innerText = armaEvoluida.nome;
  document.getElementById("stat-dano").innerText   = armaEvoluida.danoTotal;
  document.getElementById("stat-elem").innerText   = armaEvoluida.elemento;
  document.getElementById("stat-dur").innerText    = armaEvoluida.durabilidade;

  document.getElementById("resultado").innerHTML =
    `<p class="forjado-msg">— Arma abençoada pelos deuses —</p>`;

  arsenal.push(armaEvoluida);
  renderizarArsenal(arsenal);
}

function renderizarArsenal(lista) {
  const header   = document.getElementById("vitrine-header");
  const vitrine  = document.getElementById("vitrine");
  const tituloEl = document.getElementById("vitrine-titulo");
  const countEl  = document.getElementById("vitrine-count");

  if (lista.length === 0) {
    header.style.display = "none";
    vitrine.innerHTML = "";
    return;
  }

  header.style.display = "flex";
  countEl.innerText = `${lista.length} arma${lista.length > 1 ? "s" : ""}`;

  const letal = lista !== arsenal;
  tituloEl.innerText = letal ? "⚔️ Armas Letais" : "📜 Arsenal Completo";

  vitrine.innerHTML = lista
    .map(({ nome, danoTotal, elemento, durabilidade }) => {
      const isLetal = danoTotal > 24;
      return `
        <div class="weapon-card ${isLetal ? "weapon-card--letal" : ""}">
          <div class="card-nome">${nome}</div>
          <div class="card-stats">
            <span class="card-stat"><span class="card-label">Dano</span>${danoTotal}</span>
            <span class="card-stat"><span class="card-label">Elem.</span>${elemento}</span>
            <span class="card-stat"><span class="card-label">Dur.</span>${durabilidade}</span>
          </div>
          ${isLetal ? '<div class="card-badge">LETAL</div>' : ""}
        </div>`;
    })
    .join("");
}

function filtrarLetais() {
  if (arsenal.length === 0) {
    document.getElementById("resultado").innerHTML =
      `<p class="forjado-msg">— Forje armas antes de filtrar! —</p>`;
    return;
  }

  const armasLetais = arsenal.filter(arma => arma.danoTotal > 24);

  if (armasLetais.length === 0) {
    document.getElementById("vitrine-header").style.display = "flex";
    document.getElementById("vitrine-titulo").innerText = "👑 Armas Letais (alto dano)";
    document.getElementById("vitrine-count").innerText = "0 armas";
    document.getElementById("vitrine").innerHTML =
      `<p class="empty-msg">Nenhuma arma passou na inspeção real. Forje mais!</p>`;
    return;
  }

  renderizarArsenal(armasLetais);
  document.getElementById("vitrine-titulo").innerText = "👑 Armas Letais (alto dano)";
  document.getElementById("vitrine-count").innerText =
    `${armasLetais.length} de ${arsenal.length}`;
}

function mostrarTodas() {
  renderizarArsenal(arsenal);
  if (arsenal.length > 0) {
    document.getElementById("vitrine-titulo").innerText = "📜 Arsenal Completo";
  }
}
