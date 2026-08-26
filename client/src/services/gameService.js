const baseUrl = 'http://localhost:3030/jsonstore/games'
export  async function getAll() {
    const response = await fetch(`${baseUrl}?sortBy=_createdOn%20desc`)
    const result = await response.json()
    return result
}