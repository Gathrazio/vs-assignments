import React, { useState, createContext, useEffect } from 'react'
import { resolvePackageData } from 'vite'

const UglyContext = createContext()

function UglyContextProvider (props) {

    const [uglyThings, setUglyThings] = useState([])
    const [currentThing, setCurrentThing] = useState({
        title: "",        
        description: "",
        imgUrl: ""
    })
    const [fluidThings, setFluidThings] = useState({})

    function updateThing (e) {
        const {name, value} = e.target;
        setCurrentThing(prev => ({
            ...prev,
            [name]: value
        }))
    }

    function reload () {
        fetch("https://api.vschool.io/noahj/thing")
            .then(raw => raw.json())
            .then(cooked => setUglyThings(cooked))
    }

    function postUglyThing () {
        fetch("https://api.vschool.io/noahj/thing", {
            method: "POST",
            body: JSON.stringify(currentThing),
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(raw => raw.json())
        .then(cooked => console.log(cooked))
        .catch(resp => console.log(resp))

        setCurrentThing({
            title: "",
            imgUrl: "",
            description: ""
        })

        reload()
    }

    function putUglyThing (id) {
        fetch(`https://api.vschool.io/noahj/thing/${id}`, {
            method: "PUT",
            body: JSON.stringify({
                title: fluidThings[`title${id}`],
                imgUrl: fluidThings[`imgUrl${id}`],
                description: fluidThings[`description${id}`]
            })
        })
        delete fluidThings[`title${id}`];
        delete fluidThings[`imgUrl${id}`];
        delete fluidThings[`description${id}`];

        reload()
    }

    function deleteUglyThing (id) {
        fetch(`https://api.vschool.io/noahj/thing/${id}`, {method: "DELETE"})
        if (fluidThings[`title${id}`]) {
            delete fluidThings[`title${id}`];
            delete fluidThings[`imgUrl${id}`];
            delete fluidThings[`description${id}`];
        }

        reload()
    }



    useEffect(function () {
        reload()
    }, [])

    return (
        <UglyContext.Provider value={{
            uglyThings: uglyThings,
            currentThing: currentThing,
            fluidThings: fluidThings,
            updateThing: updateThing,
            postUglyThing: postUglyThing,
            putUglyThing: putUglyThing,
            deleteUglyThing: deleteUglyThing
        }} >
            {props.children}
        </UglyContext.Provider>
)}

export {UglyContext, UglyContextProvider}