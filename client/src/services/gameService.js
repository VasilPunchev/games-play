const baseUrl = 'http://localhost:3030/data/games'
export async function getAll(signal) {
    const response = await fetch(
        `${baseUrl}?sortBy=_createdOn%20desc`,
        { signal }
    )

    const result = await response.json()

    return result
}
export async function getOne(gameId, signal) {
    const response = await fetch(`${baseUrl}/${gameId}`, { signal })
    const result = await response.json()
    return result;
}
export async function deleteGame(gameId, token) {
    const response = await fetch(`${baseUrl}/${gameId}`, {
        method: 'DELETE',
        headers: {
            'X-Authorization' : token
        }
    })
    const result = await response.json()
    if (!response.ok) {
        throw new Error(result.message)
    }
    return result
}

export async function addGame(gameData, token) {
    const response = await fetch(baseUrl, {
        method: 'POST',
         headers: {
            'Content-Type':'application/json' ,
            'X-Authorization' : token
        },  
        body: JSON.stringify(gameData)
    })
    const result = await response.json()

    if (!response.ok) {
        throw new Error(result.message)
    }
    return result;


}

export async function editGame(gameId, gameData, token) {
    const response = await fetch(`${baseUrl}/${gameId}`, {
    method:'PUT',
    headers: {
        'Content-Type': 'application/json',
        'X-Authorization' : token
    },
    body:JSON.stringify(gameData)

    })
    const result = await response.json();
    if (!response.ok) {
        throw new Error(result.message)
    }
   return result
    
}