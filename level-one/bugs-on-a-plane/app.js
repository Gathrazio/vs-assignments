const form = document["airline-form"];

function formAlert(event) {
    event.preventDefault()
    const firstName = form["first-name"].value;
    const lastName = form["last-name"].value;
    const age = form.elements["age"].value;
    const gender = form.elements["gender"].value;
    const location = form.elements["travel-location"].value;
    const dietArr = [];
    if (form.elements['vegan'].checked) {
        dietArr.push(document.getElementById("vegan").value);
    }
    if (form.elements['gluten'].checked) {
        dietArr.push(form.elements["gluten"].value);
    }
    if (form.elements['paleo'].checked) {
        dietArr.push(document.getElementById('paleo').value);
    }

    const diet = dietArr.join(", ");

    alert("First Name: " + firstName + "\nLast Name: " + lastName + "\nAge: " + age + "\nGender: " + gender + "\nTravel Location: " + location + "\nDiet: " + diet + "\nAwesome, now if you die, it won't be an accident..");
}

form.addEventListener("submit", formAlert);