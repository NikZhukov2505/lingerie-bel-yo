import { allAPIs } from "../../axios"


const initialState = {
    products: {},
    categoryList: [],
    product: {},
    random: null,
    keyWords: [],
    order: '',
    categoryName: '',
    items: []
}
const SET_PRODUCTS = 'SET_PRODUCTS'
const SET_CATEGORIES = 'SET_CATEGORIES'
const SET_PRODUCT_DATA = 'SET_PRODUCT_DATA'
const SET_RANDOM = 'SET_RANDOM'
const SET_KEY_WORDS = 'SET_KEY_WORDS'
const SET_ORDER = 'SET_ORDER'
const SET_CATEGORY_NAME = 'SET_CATEGORY_NAME'
const SET_ITEM = 'SET_ITEM'

const lingerieReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ITEM:
            return {
                ...state,
                items: action.items
            }
        case SET_PRODUCTS:
            return {
                ...state,
                products: action.products
            }
        case SET_CATEGORIES:
            return {
                ...state,
                categoryList: action.categories
            }
        case SET_PRODUCT_DATA:
            return {
                ...state,
                product: action.product
            }
        case SET_RANDOM:
            return {
                ...state,
                random: action.random
            }
        case SET_KEY_WORDS:
            return {
                ...state,
                keyWords: action.words
            }
        case SET_ORDER:
            return {
                ...state,
                order: action.name
            }
        case SET_CATEGORY_NAME:
            return {
                ...state,
                categoryName: action.categoryName
            }
        default:
            return state
    }
}

const setProducts = (products) => ({ type: SET_PRODUCTS, products })
const setCategories = (categories) => ({ type: SET_CATEGORIES, categories })
const setProductData = (product) => ({ type: SET_PRODUCT_DATA, product })
const setKeyWords = (words) => ({ type: SET_KEY_WORDS, words })
const setRandom = (random) => ({ type: SET_RANDOM, random })
export const setOrder = (name) => ({ type: SET_ORDER, name })
export const setCategoryName = (categoryName) => ({ type: SET_CATEGORY_NAME, categoryName })
export const setItems = (items) => ({ type: SET_ITEM, items })


export const getRandomProducts = () => async (dispatch) => {
    const data = await allAPIs.getRandom()
    dispatch(setRandom(data))
}
export const getProducts = (page, order, categoryName) => async (dispatch) => {
    const data = await allAPIs.getAllProducts(page, order, categoryName)
    dispatch(setProducts(data))
}
export const getOrdering = (name) => async (dispatch) => {
    dispatch(setOrder(name))
    const data = await allAPIs.getByOrdering(name)
    dispatch(setProducts(data))
}
export const searchProducts = (name) => async (dispatch) => {
    const data = await allAPIs.getByName(name)
    dispatch(setProducts(data))
}
export const getCategories = () => async (dispatch) => {
    const data = await allAPIs.getAllCategories()
    dispatch(setCategories(data))
}

export const getProductsByCategory = (name) => async (dispatch) => {
    dispatch(setCategoryName(name))
    const data = await allAPIs.getByCategory(name)
    dispatch(setProducts(data))
}
export const getProductById = (id) => async (dispatch) => {
    const data = await allAPIs.getById(id)
    dispatch(setProductData(data))
}

export const getWords = () => async (dispatch) => {
    const data = await allAPIs.getKeyWords()
    dispatch(setKeyWords(data))
}




export default lingerieReducer;