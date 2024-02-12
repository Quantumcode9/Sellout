import apiUrl from '../apiConfig'
import axios from 'axios'

// READ -> Index
// axios default functionality is to send a GET request
export const getAllTVs = () => {
    return axios(`${apiUrl}/tvs`)
}

// READ -> Show
export const getOneTV = (id) => {
    return axios(`${apiUrl}/tvs/${id}`)
}

// CREATE -> Add a tv
// API calls with axios that are not a simple GET, require a config object
// that config object needs a url, method, and any auth headers if necessary
export const createTV = (user, newTV) => {
    return axios({
        url: `${apiUrl}/tvs`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { tv: newTV }
    })
}

// UPDATE -> Adjust a tv
export const updateTV = (user, updatedTV) => {
    return axios({
        url: `${apiUrl}/tvs/${updatedTV._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { tv: updatedTV }
    })
}

// DELETE -> Set a tv free
export const removeTV = (user, id) => {
    return axios({
        url: `${apiUrl}/tvs/${id}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}