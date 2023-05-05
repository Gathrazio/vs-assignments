const addItemForm = document.addItem;
addItemForm.addEventListener("submit", e => {
    e.preventDefault()
    const addedItem = addItemForm["shopping-item"].value
    addItemForm["shopping-item"].value = "";
    generatedListItem = generateLI(addedItem);
    const shoppingList = document.getElementById("list");
    shoppingList.appendChild(generatedListItem)
})

function generateLI(addedItem) {
    const listItem = document.createElement("li");

    const listItemForm = document.createElement("form");
    listItemForm.setAttribute("name", "li-form")
    listItem.appendChild(listItemForm)

    const xButton = document.createElement("button");
    xButton.textContent = "X";
    xButton.setAttribute("value", "remove")
    listItemForm.appendChild(xButton)

    const liText = document.createElement("div");
    liText.setAttribute("class", "li-text")
    liText.textContent = " " + addedItem + " ";
    listItemForm.appendChild(liText)

    const editButton = document.createElement("button");
    editButton.textContent = "Edit"
    editButton.setAttribute("value", "edit")
    editButton.setAttribute("name", "edit-btn")
    listItemForm.appendChild(editButton)

    listItem.setAttribute("class", "list-item")

    listItemForm.addEventListener("submit", e => {
        e.preventDefault()

        var writeableSubmitterValue = e.submitter.value;

        console.log(e.code)

        /* if (e.key == 13) {
            writeableSubmitterValue = "save";
        } */ 

        switch (writeableSubmitterValue) {
            case "remove":
                listItem.style.display = "none";
                break;
            case "edit":
                var editInput = document.createElement("input");
                editInput.setAttribute("name", "edit-input")
                editInput.setAttribute("class", "edit-input")
                
                const recentItem = liText.textContent.replaceAll(" ", "")

                editInput.setAttribute("value", recentItem)
                editButton.textContent = "Save";
                listItemForm["edit-btn"].value = "save";
                listItemForm.replaceChild(editInput, liText)
                break;
            default:
                liText.textContent = " " + listItemForm["edit-input"].value + " ";
                editButton.textContent = "Edit";
                editButton.setAttribute("value", "edit")
                listItemForm.replaceChild(liText, listItemForm.childNodes[1])
        }
    })

    return listItem;
}

