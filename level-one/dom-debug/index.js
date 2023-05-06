const colors = ["red", "blue", "green"]

/* ↓ event listener added to the 'add new item' button which creates and 
    appends a list item (just some <div> element, called henceforth 'sub item') to the <div>
    element which acts as the list */ 

/* easter egg! */

document.getElementById("add").addEventListener("click", function(){
    const subItem = createSubItem(); // creating the list item
    document.getElementById("list").appendChild(subItem) // appending list item to the end of the list
})

/* ↓ function that creates the list item to be appended */

function createSubItem(){
    const subItem = document.createElement("div") // generating the item as a div
    /* ↓ declaring and initializing subItemInput, which is an <input> HTML Element
        referring to the input box we type stuff into. */
    var subItemInput = document.getElementById("input");
    /* ↓ setting the text inside the list item to the stuff we typed in to the 
        input box */
    subItem.textContent = subItemInput.value
    /* ↓ generating the drop down element (dropDown is the
        <select> HTML Element) */
    const dropDown = createDropDown(subItem)
    subItem.style.backgroundColor = "red"; // changing the list item's background color to the default drop-down option
    /* ↓ appending the generated <select> drop down into the end of the list item (notably will be displayed
        inline after the innerText of subItem). Note that .appendChild accepts only Node objects to
        append whereas .append accepts Node objects as well as DOM strings. In this case the .appendChild 
        and .append methods are interchangeable as dropDown is an HTML Element (a Node object). */
    subItem.appendChild(dropDown)
    subItem.setAttribute("class", "subItem") // setting the list item's class attribute to "subItem"
    return subItem;
}

/* ↓ function that creates the <select> drop down item to be appended inside subItem */

function createDropDown(subItem){
    const dropDown = document.createElement("select") // declaring and initializing dropDown
    /* ↓ this for loop generates the three <option> children of the <select> element */
    for (let i = 0; i < colors.length; i++){ // loops 3 times
        const option = document.createElement("option") // first create an <option> element
        option.textContent = colors[i] // set the inside text to some color string
        option.value = colors[i] // set the value attribute of this <option> to the same color string
        dropDown.append(option) // then append the <option> to the end of the inside of <select>
    }
    /* ↓ event listener added that listens for a change in the selected option
        in the <select> element. Note that the event listener is added inside this
        function because we are delineating the characteristics of the <select> drop down.
        e is this event listener's event object, and e.target is an HTML Element that 
        represents the specific <option> element in the list that was clicked on which
        instigated the "change" event.  */
    dropDown.addEventListener("change", function(e){
        /* ↓ changing the list item's background color (by reference) to the value 
            attribute of the option that was clicked on. I.e., click on the option that says
            "red", then the list item's background color changes to red. */
        subItem.style.backgroundColor = e.target.value
    })
    return dropDown; // returning the finished drop-down <select> element to createSubItem
}
