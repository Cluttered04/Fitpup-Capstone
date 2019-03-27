//Fetch calls to fetch all a user's dog, an individual dog, edit dog, delete dog



const DogManager = {
    getAllDogs: (userId) => {
        return fetch(`http://localhost:5002/dogs/?userId=${userId}`)
        .then(r => r.json())
    },

    getSingleDog: (dogId) => {
        return fetch(`http://localhost:5002/dogs/${dogId}`)
        .then(r => r.json())
    },

    addNewDog: (dogObject) => {
        return fetch(`http://localhost:5002/dogs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dogObject)
        }).then(r => r.json())
    },

    editDog: (dogObject) => {
        return fetch(`http://localhost:5002/dogs/${dogObject.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dogObject)
        }).then (r => r.json())
    },

    deleteDog: (id) => {
        return fetch(`http://localhost:5002/dogs/${id}`, {
            method: "DELETE"
        }).then (r => r.json())

    }
}

export default DogManager;