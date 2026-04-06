const somarDano = (danoBase, buff) => danoBase + buff;

const buffsDisponiveis = [
  { elemento: "Fogo",   damageBuff: 10, nome: "Abençoada por Hefestos" },
  { elemento: "Raio",   damageBuff: 18, nome: "Tocada por Zeus"         },
  { elemento: "Gelo",   damageBuff: 8,  nome: "Sopro de Bóreas"         },
  { elemento: "Veneno", damageBuff: 12, nome: "Lâmina de Hermes"        },
  { elemento: "Divino", damageBuff: 25, nome: "Forjada no Olimpo"       },
];

let espadaOlimpiana = {
  nome: "Espada de Bronze Celestial",
  dano: 15,
  durabilidade: 10 * 10
};

function forjarArma() {
  const idx  = Math.floor(Math.random() * buffsDisponiveis.length);
  const buff = buffsDisponiveis[idx];

  const buffSword = {
    ...espadaOlimpiana,
    elemento:    buff.elemento,
    nome:        `Espada ${buff.nome}`,
    totalDamage: somarDano(espadaOlimpiana.dano, buff.damageBuff),
  };

  exibirResultado(buffSword);
}

function exibirResultado(arma) {
  document.getElementById('weapon-name').textContent = arma.nome;
  document.getElementById('stat-dano').textContent   = arma.totalDamage;
  document.getElementById('stat-dur').textContent    = arma.durabilidade;
  document.getElementById('stat-elem').textContent   = arma.elemento;

  const div = document.getElementById('resultado');
  div.innerHTML = `<p class="forjado-msg">— Arma abençoada pelos deuses —</p>`;
}
