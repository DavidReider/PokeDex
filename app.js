const poke_container = document.getElementById('poke_container');
const pokemon_number = 386;

const colors = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};

const main_types = Object.keys(colors);

const fetchPokemon = async () => {
    for(let i = 1; i <= pokemon_number; i++){
        await getPokemon(i);
    }
}

const getPokemon = async id => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const result = await fetch(url);
    const pokemon = await result.json();
    createPokemonCard(pokemon);
}



function createPokemonCard(pokemon){
    console.log(pokemon);
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon');

    const poke_types = pokemon.types.map(element => element.type.name);
    const type = main_types.find(type => poke_types.indexOf(type) > -1);

    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const color = colors[type];

    pokemonEl.style.backgroundColor = color;
    pokemonEl.setAttribute('id', name);
    
    //https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokemon.id}.png
    //https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png
    const pokeInnerHTML = `
        <div class="img-container"><img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png"></div>
        <div class="info">
            <span class="number">#${pokemon.id.toString().padStart(3, '0')}</span>
            <h3 class="name"> ${name} </h3>
            <small class="type"> Type: <span>${type}</span></small>
        </div>

        <div id="myModal_${pokemon.id}" class="modal">
            <div class="modal-content">
                <span id="close_${pokemon.id}" class="close">&times;</span>
                <div class="physical">
                    <p> Height: ${pokemon.height} </p>
                    <p> Weight: ${pokemon.weight} </p>
                </div>
                <div class="stats">
                    <p>${pokemon.stats[0].stat.name} : ${pokemon.stats[0].base_stat}</p><meter value="${pokemon.stats[0].base_stat}" min="0" max="255"></meter>
                    <p>${pokemon.stats[1].stat.name} : ${pokemon.stats[1].base_stat}</p><meter value="${pokemon.stats[1].base_stat}" min="0" max="255"></meter>
                    <p>${pokemon.stats[2].stat.name} : ${pokemon.stats[2].base_stat}</p><meter value="${pokemon.stats[2].base_stat}" min="0" max="255"></meter>
                    <p>${pokemon.stats[3].stat.name} : ${pokemon.stats[3].base_stat}</p><meter value="${pokemon.stats[3].base_stat}" min="0" max="255"></meter>
                    <p>${pokemon.stats[4].stat.name} : ${pokemon.stats[4].base_stat}</p><meter value="${pokemon.stats[4].base_stat}" min="0" max="255"></meter>
                    <p>${pokemon.stats[5].stat.name} : ${pokemon.stats[5].base_stat}</p><meter value="${pokemon.stats[5].base_stat}" min="0" max="255"></meter>
                </div>
            </div>
        </div>
    `;
    
    pokemonEl.innerHTML = pokeInnerHTML;
    pokemonEl.addEventListener('click', () => {
        var modal = document.getElementById(`myModal_${pokemon.id}`);
        var span = document.getElementById(`close_${pokemon.id}`);
        modal.style.display = "block";

        window.onclick = function(event) {
            if (event.target == modal || event.target == span) {
                modal.style.display = "none";
            }
        }
    });


    poke_container.appendChild(pokemonEl);
}

fetchPokemon();

