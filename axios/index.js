import axios from "axios";


const instanse = axios.create({
    baseURL: 'http://195.38.164.87:8000/api/',
    headers: {
        'Content-Type': 'application/json',
    }
})

export const allAPIs = {
    getProductsByPaths() {
        return instanse.get('products/all_products/').then(res => res.data)
    },
    getAllProducts(page = 1, name = '', categotyName = '') {
        return instanse.get(`products/products/?page=${page}&ordering=${name}&product_type__name=${categotyName}`).then(res => res.data)
    },
    getByOrdering(data = '') {
        return instanse.get(`products/products/?ordering=${data}`).then(res => res.data)
    },
    getById(id) {
        return instanse.get(`products/products/${id}`).then(res => res.data)
    },
    getByName(name) {
        return instanse.get(`products/products/?search=${name}`).then(res => res.data)
    },
    getContacts() {
        return instanse.get('contacts_info/company_info/').then(res => res.data)
    },
    getAllCategories() {
        return instanse.get('categories/categories/').then(res => res.data)
    },
    getByCategory(name) {
        return instanse.get(`products/products/?product_type__name=${name}`).then(res => res.data)
    },
    getRandom() {
        return instanse.get('products/random_products/').then(res => res.data)
    },
    getKeyWords() {
        return instanse.get('contacts_info/words/').then(res => res.data)
    },
    setOrder(orderData) {
        return instanse.post('/cart/order/', orderData).then(res => res.data)
    }
}