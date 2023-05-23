const xhr = new XMLHttpRequest();
xhr.open("GET", "https://api.vschool.io/pokemon", true)
xhr.send()

xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
        const jSONData = xhr.responseText;
        const data = JSON.parse(jSONData);
        showData(data.objects[0].pokemon);
    }
}

const showData = (pokemonArray) => {
    for (i = 0; i < pokemonArray.length; i++) {
        let pokemonData = {};
        this["xhr"+i] = new XMLHttpRequest();
        const currentRequest = this["xhr"+i];
        const pokemonArrayItem = pokemonArray[i];
        currentRequest.open("GET", `https://pokeapi.co/${pokemonArray[i].resource_uri}`.replace("1", "2"), true)
        currentRequest.send()
        currentRequest.onreadystatechange = () => {
            if (currentRequest.readyState === 4 && currentRequest.status === 200) {
                const jSONData = currentRequest.responseText;
                pokemonData = JSON.parse(jSONData);
                if (`${pokemonData.sprites.versions["generation-v"]["black-white"].animated.front_default}` === "null"){
                    return;
                }
                buildAndAppendPkmnBlock(pokemonData, pokemonArrayItem)
            } else if (currentRequest.readyState === 4 && currentRequest.status !== 200) {
                console.log("Oops!")
            }
        }
    }
}

const buildAndAppendPkmnBlock = (pokemonData, pokemonArrayItem) => {
    const newPkmnContainer = document.createElement("div");
        newPkmnContainer.setAttribute("class", "pkmn-container");
        const newPkmnNameh1 = document.createElement("h1")
        newPkmnNameh1.setAttribute("class", "name");
        newPkmnNameh1.textContent = `${pokemonArrayItem.name[0].toUpperCase()}${pokemonArrayItem.name.slice(1)}`;
        const newPkmnSpriteDiv = document.createElement("div");
        newPkmnSpriteDiv.setAttribute("class", "sprite");
        console.log(`<img src="${pokemonData.sprites.versions["generation-v"]["black-white"].animated.front_default}"/>`)
        newPkmnSpriteDiv.innerHTML = `<img src="${pokemonData.sprites.versions["generation-v"]["black-white"].animated.front_default}"/>`;

        document.body.appendChild(newPkmnContainer)
        newPkmnContainer.appendChild(newPkmnNameh1)
        newPkmnContainer.appendChild(newPkmnSpriteDiv)
}