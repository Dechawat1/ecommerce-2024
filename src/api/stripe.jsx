import axios from 'axios'


export const payment = async (token) => await axios.post('https://ecommerce-api-kohl-sigma.vercel.app/api/user/create-payment-intent', {}, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})