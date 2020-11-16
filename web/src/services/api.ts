import axios from 'axios'


const api = axios.create({
    //endereco do backend
    baseURL: 'http://localhost:3333',
})

export default api