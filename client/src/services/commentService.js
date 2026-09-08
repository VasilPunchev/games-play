const baseUrl = 'http://localhost:3030/jsonstore/comments'

export async function getComments(gameId, signal) {
    const response = await fetch (
    `${baseUrl}?where=gameId%3D%22${gameId}%22`,
     { signal }
    )
    const result = await response.json()
    if (!response.ok) {
        throw new Error(result.message)
    }
    return Object.entries(result).map(([id, comment]) => ({
        ...comment,
        _id: id
    }))
}

export async function addComment(gameId, comment, token) {
    const response = await fetch(baseUrl, {
        method: 'POST' ,
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        } ,
        body: JSON.stringify({
            gameId ,
            comment
        })
    })
    const result = await response.json()
    if (!response.ok) {
        throw new Error(result.message)
    }
    return result
}