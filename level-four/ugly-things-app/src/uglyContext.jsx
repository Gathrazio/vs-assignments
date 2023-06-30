import React, { useState, createContext, useEffect } from 'react'

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
        if (name.length > 11) {
            setFluidThings(prev => ({
                ...prev,
                [name]: value
            }))
        } else {
            setCurrentThing(prev => ({
                ...prev,
                [name]: value
            }))
        }
        
    }

    function load () {
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
        }).then(() => load())

        setCurrentThing({
            title: "",
            imgUrl: "",
            description: ""
        })
    }

    function putUglyThing (id) {
        fetch(`https://api.vschool.io/noahj/thing/${id}`, {
            method: "PUT",
            body: JSON.stringify({
                title: fluidThings[`title${id}`],
                imgUrl: fluidThings[`imgUrl${id}`],
                description: fluidThings[`description${id}`]
            }),
            headers: { "Content-Type": "application/json" }
        }).then(() => load())

        delete fluidThings[`title${id}`];
        delete fluidThings[`imgUrl${id}`];
        delete fluidThings[`description${id}`];
    }

    function deleteUglyThing (id) {
        fetch(`https://api.vschool.io/noahj/thing/${id}`, {method: "DELETE"})
            .then(() => load())
        if (fluidThings[`title${id}`]) {
            delete fluidThings[`title${id}`];
            delete fluidThings[`imgUrl${id}`];
            delete fluidThings[`description${id}`];
        }
    }

    function initializeEdit (id) {
        uglyThings.forEach(thing => {
            if (thing._id === id) {
                setFluidThings(prev => ({
                    ...prev,
                    [`title${id}`]: thing.title,
                    [`description${id}`]: thing.description,
                    [`imgUrl${id}`]: thing.imgUrl
                }))
            }
        })
    }



    useEffect(function () {
        load()
    }, [])

    return (
        <UglyContext.Provider value={{
            uglyThings,
            currentThing,
            fluidThings,
            updateThing,
            postUglyThing,
            putUglyThing,
            deleteUglyThing,
            initializeEdit
        }} >
            {props.children}
        </UglyContext.Provider>
)}

export {UglyContext, UglyContextProvider}