import axios from 'axios'
const baseUrl = 'http://localhost:3002/persons'
const getAll = () => {
  return (axios.get(baseUrl)
    .then(({ data }) => data)
    .catch(err => console.error(err)))
}
const create = (newObject) => {
  return (axios.post(baseUrl, newObject)
    .then(response => response.data))
}
const update = (id, newObject) => {
  return (axios.put(`${baseUrl}/${id}`, newObject)
    .then(response => response.data))
}
const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return (request.then(res => res.data))
}
export default { getAll, create, update, deletePerson }