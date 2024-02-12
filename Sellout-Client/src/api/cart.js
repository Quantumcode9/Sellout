import apiUrl from '../apiConfig'
import axios from 'axios'

export const getCartItems = (user) => {
    return axios({
      url: apiUrl + '/cart',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
  }

export const addToCart = (tvId, user) => {
  return axios({
    url: apiUrl + '/add-to-cart',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
    data: {
      tvId: tvId
    },
  })
}

export const handleDeleteFromCart = (tvId, user) => {
  return axios({
    url: apiUrl + '/delete-from-cart',
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
    data: {
      tvId: tvId,
    },
  })
}