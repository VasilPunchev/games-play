const baseUrl = 'http://localhost:3030/jsonstore/games'
export  async function getAll(signal) {
    const response = await fetch(`${baseUrl}?sortBy=_createdOn%20desc,${signal}`)
    const result = await response.json()
    return Object.values(result);
}