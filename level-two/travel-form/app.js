const travelForm = document["travel-form"];

travelForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const firstName = travelForm.firstName.value;
    const lastName = travelForm.lastName.value;
    const age = travelForm.age.value;
    const gender = travelForm.gender.value;
    const location = travelForm.location.value;

    const dietRestrictions = [];
    const checkedDietRestrictions = document.querySelectorAll('input[name=diet]:checked');
    for (i = 0; i < checkedDietRestrictions.length; i++) {
        dietRestrictions.push(checkedDietRestrictions[i].value)
    }

    alert(`First name: ${firstName}\nLast name: ${lastName}\nAge: ${age}\nGender: ${gender}\nLocation: ${location}\nDietary restrictions: ${dietRestrictions.join(", ")}`)

    travelForm.firstName.value = "";
    travelForm.lastName.value = "";
    travelForm.age.value = "";
    travelForm.gender.value = "";
    travelForm.location.value = "Toronto";

    for (i = 0; i < 3; i++) {
        if (travelForm.diet[i].checked) {
            travelForm.diet[i].checked = false;
        }
    }

    for (i = 0; i < 2; i++) {
        if (travelForm.gender[i].checked) {
            travelForm.gender[i].checked = false;
        }
    }
})