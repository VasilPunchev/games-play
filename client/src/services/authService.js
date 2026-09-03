const baseUrl = 'http://localhost:3030/users'
export async function login(email, password) {
    const response = await fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})

    })
    const result = await response.json()

    if (!response.ok) {
        throw new Error(result.message)
        
    }
    return result;
}

export async function register(email, password) {
    const response = await fetch(`${baseUrl}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
    const result = await response.json()
    if (!response.ok) {
        throw new Error(result.message)
    }
    return result;
}