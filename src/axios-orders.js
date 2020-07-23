import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://burger-app-f455e.firebaseio.com/'
})

export default instance