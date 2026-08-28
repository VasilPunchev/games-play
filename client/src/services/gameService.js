const baseUrl = 'http://localhost:3030/jsonstore/games'
export async function getAll(signal) {
    const response = await fetch(
        `${baseUrl}?sortBy=_createdOn%20desc`,
        { signal }
    )

    const result = await response.json()

    return Object.entries(result).map(([id, game]) => ({
        ...game,
        _id: id
    }))
}
export async function getOne(gameId, signal) {
    const response = await fetch(`${baseUrl}/${gameId}`, { signal })
    const result = await response.json()
    return result;
}