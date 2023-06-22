import React, { useState, createContext, useEffect } from 'react'

const UglyContext = createContext()

function UglyContextProvider (props) {

    const [uglyThings, setUglyThings] = useState([])
    const [currentThing, setCurrentThing] = useState({
        title: "",
        image: "",
        description: ""
    })
    const [fluidThings, setFluidThings] = useState({})

    function postUglyThing () {
        fetch("https://api.vschool.io/noahj/thing", {
            method: "POST",
            body: JSON.stringify(currentThing)
        })
        .then(raw => raw.json())
        .then(cooked => console.log(cooked))
    }

    function putUglyThing (id) {
        fetch(`https://api.vschool.io/noahj/thing/${id}`, {
            method: "PUT",
            body: JSON.stringify({
                title: fluidThings[`title${id}`],
                image: fluidThings[`image${id}`],
                description: fluidThings[`description${id}`]
            })
        })
        delete fluidThings[`title${id}`];
        delete fluidThings[`image${id}`];
        delete fluidThings[`description${id}`];
    }

    function deleteUglyThing (id) {
        fetch(`https://api.vschool.io/noahj/thing/${id}`, {method: "DELETE"})
        if (fluidThings[`title${id}`]) {
            delete fluidThings[`title${id}`];
            delete fluidThings[`image${id}`];
            delete fluidThings[`description${id}`];
        }
    }



    useEffect(function () {
        fetch("https://api.vschool.io/noahj/thing")
            .then(raw => raw.json())
            .then(cooked => setUglyThings(cooked))
    }, [])

    return (
        <UglyContext.Provider value={{uglyThings: uglyThings}} >
            {props.children}
        </UglyContext.Provider>
)}

export {UglyContext, UglyContextProvider}