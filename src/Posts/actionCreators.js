import {
    fetchCollection, fetchRecord, createRecord, updateRecord, deleteRecord
} from 'redux-crud-store'

const MODEL = 'posts'
const PATH = '/posts'

export function fetchPosts(params = {}) {
    return fetchCollection(MODEL, PATH, params)
}

export function fetchPost(id, params = {}) {
    return fetchRecord(MODEL, id, `${PATH}/${id}`, params)
}

export function createPost(data = {}) {
    return createRecord(MODEL, PATH, data)
}

export function updatePost(id, data = {}) {
    return updateRecord(MODEL, id, `${PATH}/${id}`, data)
}

export function deletePost(id) {
    return deleteRecord(MODEL, id, `${PATH}/${id}`)
}
