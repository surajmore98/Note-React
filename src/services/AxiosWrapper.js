import axios from "axios"

export async function postApi(url, token, data = null) {
    return await axios.post(`/api${url}`,
        {
            note: data 
        },
        {
            headers: {
                authorization: token
            }
        }
    );
}

export async function deleteApi(url, token) {
    return await axios.delete(`/api${url}`, {
        headers: {
            authorization: token
        }
    });
}

export async function getApi(url, token){
    return await axios.get(`/api${url}`, {
        headers: {
            authorization: token
        }
    });
}

