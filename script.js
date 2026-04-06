const somarDano = (danoBase, buff) => danoBase + buff;

let espadaOlimpiana = {
    nome: "Espada de Bronze Celestial",
    dano: 15,
    durabilidade: 10 * 10
};

function forjarArma() { 
    let buffCelestial = { elemento: "Fogo", damageBuff: 10 };
    let buffSword = {
        ...espadaOlimpiana,
        ...buffCelestial,
        nome: "Espada Abençoada por Hefesto",
        totalDamage: somarDano(espadaOlimpiana.dano, buffCelestial.damageBuff)
    };
    exibirResultado(buffSword);
}

function exibirResultado(arma) {
    const { nome, totalDamage, elemento, durabilidade } = arma;  
    let div = document.getElementById('resultado');
    div.innerHTML = `  
        <h3>Item: ${nome}</h3>
        <p>Max Damage: ${totalDamage}</p>
        <p>Elemento Especial: ${elemento}</p>
        <p>Durabilidade: ${durabilidade}</p>
    `;
}