if (!sessionStorage.getItem("itemStorage")) {
    sessionStorage.setItem("itemStorage", "[]")
}

// sessionStorage.clear()


/* ↓ the following two functions storeItem and removeItem help to operate
     the session storage system for list items */
function storeItem (item) {
    var itemStorage = JSON.parse(sessionStorage.getItem("itemStorage"));
    itemStorage.push(item)
    sessionStorage.setItem("itemStorage", JSON.stringify(itemStorage))
}

function removeItem (itemIndex){
    var itemStorage = JSON.parse(sessionStorage.getItem("itemStorage"));
    itemStorage.splice(itemIndex, 1)
    sessionStorage.setItem("itemStorage", JSON.stringify(itemStorage))
}

/* ↓ the following for-loop generates the items held in session storage */
var itemStorage = JSON.parse(sessionStorage.getItem("itemStorage"));

for (i = 0; i < itemStorage.length; i++) {
    const generatedListItem = generateLI(itemStorage[i]);

    /* ↓ grabbing the shoppingList HTML Element by grabbing the element
         with id list */
    const shoppingList = document.getElementById("list");

        /* ↓ append the generated list item to the end of the shopping
             list */
    shoppingList.appendChild(generatedListItem)
}



const addItemForm = document.addItem;

/* ↓ adding a submit event listener to the add shopping item form 
     to generate and append a new list item from what was entered in
     the nested input element's field (said input element has name
     shopping-item). */

addItemForm.addEventListener("submit", e => {
    e.preventDefault()

    /* ↓ addedItem is a text string which contains the value of the
         shopping-item input field */
    const addedItem = addItemForm["shopping-item"].value

    /* ↓ adding addedItem to sessionStorage */
    storeItem(addedItem)

    /* ↓ removing the value of the shopping-item input so it looks like
         the addedItem is being sent down into the body of the item list. */
    addItemForm["shopping-item"].value = "";

    /* ↓ generating the related list item */
    const generatedListItem = generateLI(addedItem);

    /* ↓ grabbing the shoppingList HTML Element by grabbing the element
         with id list */
    const shoppingList = document.getElementById("list");

    /* ↓ appending the generated list item to the end of the shopping list */
    shoppingList.appendChild(generatedListItem)
})



/* ↓ this function generates a shopping list item as a result of typing 
     in something to buy (the addItem) and submitting the add item form */

function generateLI(addedItem) {

    /* ↓ building a skeletal list item for the shopping list, to 
         eventually be returned. also giving this list item a class
         to be able to use it */
    const listItem = document.createElement("li");
    listItem.setAttribute("class", "list-item")

    /* ↓ creating a li-form, setting a name attribute for it, setting a class attribute
         for it, and nesting it inside the list item. This form will
         handle the button clicks inside the shopping list item itself */
    const listItemForm = document.createElement("form");
    listItemForm.setAttribute("name", "li-form")
    listItemForm.setAttribute("class", "li-form")
    listItem.appendChild(listItemForm)

    /* ↓ creating the clear item button, setting text content for it,
         setting a value attribute for it, and appending it to the end of 
         the li-form */
    const xButton = document.createElement("button");
    xButton.textContent = "X";
    xButton.setAttribute("value", "remove")
    xButton.setAttribute("id", addedItem)
    listItemForm.appendChild(xButton)

    /* ↓ creating a div, setting the text content for it, setting a class 
         attribute for it, and appending it to the end of the li-form */
    const liText = document.createElement("div");
    liText.textContent = " " + addedItem + " ";
    liText.setAttribute("class", "li-text")
    listItemForm.appendChild(liText)

    /* ↓ creating the edit button, setting text content for it, setting 
         a value and name attribute for it, and appending it to the end 
         of the li-form */
    const editButton = document.createElement("button");
    editButton.textContent = "Edit"
    editButton.setAttribute("value", "edit")
    editButton.setAttribute("name", "edit-btn")
    listItemForm.appendChild(editButton)


    /* ↓ adding a "submit" event listener on the li-form, which
         dictates how the X and Edit buttons function */
    listItemForm.addEventListener("submit", e => {
        e.preventDefault()

        /* ↓ a switch statement to determine what should be done depending
             on the value of the button that initiated the submit event
             (i.e., the button that was clicked) */
        switch (e.submitter.value) {
            case "remove": // if it was the X button
                listItem.style.display = "none"; // remove the list item from the list

                /* ↓ remove the item from sessionStorage */
                var itemStorage = JSON.parse(sessionStorage.getItem("itemStorage"));
                removeItem(itemStorage.indexOf(xButton.getAttribute("id")))
                break;
            case "edit": // if it was the Edit button

                /* ↓ grabbing the most recent text field of liText, which allows
                     the user to edit a list item more than once */
                const recentItem = liText.textContent.slice(1, liText.textContent.length - 1)

                /* ↓ building and setting attributes of an input which will be
                     used to edit the list item's text, functionally speaking. Also
                     setting the value of the editInput field to the most recent
                     liText text (the most recent item that was either submitted into
                     the list or edited and saved) */
                var editInput = document.createElement("input");
                editInput.setAttribute("name", "edit-input")
                editInput.setAttribute("class", "edit-input")
                editInput.setAttribute("value", recentItem)

                /* ↓ making the edit button change to say "Save" and changing its value
                     to 'save'. essentially morphing it into the Save button */
                editButton.textContent = "Save";
                listItemForm["edit-btn"].value = "save";

                /* ↓ replacing the liText div with the editInput field */
                listItemForm.replaceChild(editInput, liText)

                /* ↓ setting the width of the editInput to match the size of recentItem */
                listItemForm["edit-input"].style.width = (listItemForm["edit-input"].value.length + 2).toString() + "ch";

                /* ↓ adding an event listener on the edit input field to dynamically
                     resize the input area as characters are typed */
                listItemForm.addEventListener("input", function(e) {
                    e.preventDefault()
                    this["edit-input"].style.width = (this["edit-input"].value.length + 2).toString() + "ch";
                })
                break;
            case "save": // if it was the Save button (just the re-skinned edit button)
                
                /* ↓ generating the list item edit the user wants to save */
                liText.textContent = " " + listItemForm["edit-input"].value + " ";

                /* ↓ turning the Save button back into the Edit button */
                editButton.textContent = "Edit";
                editButton.setAttribute("value", "edit")

                /* ↓ replacing the old item with the edited version in local storage */
                itemStorage = JSON.parse(sessionStorage.getItem("itemStorage"));
                replaceIndex = itemStorage.indexOf(xButton.getAttribute("id"));
                removeItem(replaceIndex)
                const updatedItemStorage = JSON.parse(sessionStorage.getItem("itemStorage"));
                updatedItemStorage.splice(replaceIndex, 0, listItemForm["edit-input"].value)
                sessionStorage.setItem("itemStorage", JSON.stringify(updatedItemStorage))
                xButton.setAttribute("id", listItemForm["edit-input"].value)

                /* ↓ replacing the edit input form with the modified liText div */
                listItemForm.replaceChild(liText, listItemForm.childNodes[1])
        }
    })

    /* ↓ returning the finished shopping list item */
    return listItem;
}