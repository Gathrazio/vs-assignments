const goombaInput = document.getElementById("goomba-input");
const bobombInput = document.getElementById("bobomb-input");
const cheepCheepInput = document.getElementById("cheepcheep-input");

const total = document.getElementById("total");

function updateTotalCost() {
    total.textContent = `${goombaInput.value * 5 + bobombInput.value * 7 + cheepCheepInput.value * 11} Coins`;
}

goombaInput.addEventListener('change', updateTotalCost)
bobombInput.addEventListener('change', updateTotalCost)
cheepCheepInput.addEventListener('change', updateTotalCost)