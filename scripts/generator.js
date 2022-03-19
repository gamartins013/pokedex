const typeColor = {
    bug:"#26de81",
    dragon:"#ffeaa7",
    electric:"#fed330",
    fairy:"#FF0069",
    fighting:"#30336b",
    fire:"#f0932b",
    flying:"#F5F5F5",
    grass:"#00b894",
    ground:"#EFB549",
    ghost:"#a55eea",
    ice:"#74b9ff",
    normal:"#95afc0",
    poison:"#6c5ce7",
    psychic:"#a29bfe",
    rock:"#2d3436",
    water:"#0190FF",
    
};

const url = "https://pokeapi.co/api/v2/pokemon/";
const card = document.getElementById("card");
const button = document.getElementById("button");


// função para gerar um pokemon aleatório entre 1 e 150
let getPokeData = () =>{
    let id = Math.floor(Math.random() * 150) + 1;
    //console.log(id)

    // combinar a url da poke api com o id para gerar o link 
    const finalUrl = url + id

    // requisição usando fetch
    fetch(finalUrl)
    .then((response ) => response.json())
    .then((data) => {
        gerarCard(data)
        
    });

};

// função para gerar os cards
    let gerarCard = (data) => {
        const hp = data.stats[0].base_stat;
        const imgSrc = data.sprites.other.dream_world.front_default;
        const pokeName = data.name[0].toUpperCase() + data.name.slice(1);
        const statAttack = data.stats[1].base_stat;
        const statDefense = data.stats[2].base_stat;
        const statSpeed = data.stats[5].base_stat;


       
        card.innerHTML = `
        <p class="hp">
            <span>HP 
            ${hp}
            </span>
        </p>
            <img src=${imgSrc} />
            <h2 class="name-pokemon">
                ${pokeName}
            </h2>
            <div class="types">
            </div>
            <div class="status">
                <div>
                    <h3>${statAttack}</h3>
                    <p>Ataque</p>
                </div>
                <div>
                    <h3>${statDefense}</h3>
                    <p>Defesa</p>
                </div>
                <div>
                    <h3>${statSpeed}</h3>
                    <p>Velocidade</p>
                </div>
            </div>
        `;
        appendTypes(data.types);

    };
    
    let appendTypes = (types) => {
        if (types.length === 2) {
            console.log("2");
            card.style.background = `radial-gradient(circle at 50% 0%, ${typeColor[types[1].type.name]}, ${typeColor[types[0].type.name]} 36%, #ffffff 36%)`;
        }
        else {
            console.log("1");
            card.style.background = `radial-gradient(circle at 50% 0%, ${typeColor[types[0].type.name]}, ${typeColor[types[0].type.name]} 36%, #ffffff 36%)`;
        }
        types.forEach((item) => {
            let span = document.createElement("SPAN")
            span.textContent = item.type.name;
            document.querySelector(".types").appendChild(span);
            span.style.backgroundColor = typeColor[item.type.name];
        });
    };

// adicionando evento de click no botão de novo pokemon
button.addEventListener("click", getPokeData);

window.addEventListener("load", getPokeData);
