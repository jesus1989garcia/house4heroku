import http from './BaseService'

const getProfile = () =>  http.get('/profile')
.then(res => Promise.resolve(res.data))

const addFavs = (id) => http.post(`/users/add_favourites/${id}`)
.then(res => Promise.resolve(res.data))

const listFavs = () => http.get('users/favourites')
.then( res => Promise.resolve(res.data))

const deleteFav = (id) => http.delete(`/users/delete_favourite/${id}`)
.then( res => Promise.resolve(res.data))

const editProfile = (user) => {
  const data = new FormData();
  Object.keys(user).forEach(prop => {
    return data.append(prop,user[prop])
  })
return http.put(`/profile`, data)
.then(res => Promise.resolve(res.data))
}


export default {
  getProfile,
  addFavs,
  listFavs,
  deleteFav,
  editProfile
}