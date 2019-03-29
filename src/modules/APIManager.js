const remoteURL = "localhost:5002"



const APIManager = {
    //Checks for food/exercise entries of user as well as prefilled entries
    getAllEntriesByUser: function(collection, userId){
        return fetch(`http://${remoteURL}/${collection}/?userId=${userId}`)
        .then(r=>r.json())
    },

    getAllEntries: function(collection, userId){
        return fetch(`http://${remoteURL}/${collection}/?userId=${userId}&&userId=1`)
        .then(r => r.json())
    },

    getSingleEntry: function(collection, itemId){
        return fetch(`http://${remoteURL}/${collection}/${itemId}`)
        .then(r => r.json())
    },

    addNewEntry: function(collection, object){
        return fetch(`http://${remoteURL}/${collection}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(object)
        }).then(r => r.json())
    },

    editEntry: function(collection, object){
        return fetch(`http://${remoteURL}/${collection}/${object.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(object)
        }).then(r => r.json())
    },

    deleteEntry: function(collection, objectId) {
        return fetch(`http://${remoteURL}/${collection}/${objectId}`, {
            method: "DELETE"
        })
        .then(r => r.json())
    }

}

export default APIManager