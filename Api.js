const URL_API = 'https://api-sockets-ih7r.onrender.com';

export const getData = async () => {
    const data = await fetch(URL_API);
    return await data.json();
}

export const getOneData = async (id) => {
    const data = await fetch(`${URL_API}/${id}`);
    return await data.json();
}

export const insertData = async (data) => {
    const res = await fetch(URL_API, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json',
        },
        body: JSON.stringify(data)
    });
    return await res.json();
}

export const updateData = async (id, updatedData) => {
    const response = await fetch(`${URL_API}/${id}`, {
        method: "PUT", 
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json',
        },
        body: JSON.stringify(updatedData)
    });
    return await response.json();
}

export const deleteData = async (id) => {
    const res = await fetch(`${URL_API}/${id}`, {
        method: "DELETE",
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json',
        }
    });
    return await res.json();
}
