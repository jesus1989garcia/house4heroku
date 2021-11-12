import http from './BaseService'

const getHouses = () => http.get('/houses/list')
.then(res => Promise.resolve(res.data))

const createHouses = (house) => http.post('/houses/create_house', house)
.then(res => Promise.resolve(res.data))

const getProperties = () => http.get('/houses/properties')
.then( res => Promise.resolve(res.data))

const getHouseDetail = (id) => http.get(`/houses/detail_house/${id}`)
.then( res => Promise.resolve(res.data))

const deleteHouse = (owner, house) => http.delete(`/houses/delete_house/${owner}/${house}`)
.then( res =>(Promise.resolve(res.data)))

const editHouse = (owner, houseId, property) => {
  const data = new FormData();
  Object.keys(property).forEach(prop => {
    return data.append(prop, property[prop])
  })
 return http.put(`/houses/edit_house/${owner}/${houseId}`, data)
.then( res => Promise.resolve(res.data))
}

const editHousePhotos = (owner, houseId, photos) => {
  const data = new FormData();
  for(let i = 0; i < photos.length; i++){
    data.append('photos', photos[i])
  }
  return http.put(`/houses/edit_house/${owner}/${houseId}/imgs`, data)
.then( res => Promise.resolve(res.data))
}

const editLocation = (owner, houseId, latitude) => http.put(`/houses/edit_house/${owner}/${houseId}/location`, latitude)
.then( res => Promise.resolve(res.data))
// .then (console.log("thisis si " + city)) //error is not here   hacer otrto service especifico para city
// .then(console.log(typeof(city)))



const editCity = (owner, houseId, city) => http.put(`/houses/edit_house/${owner}/${houseId}/citatella`, city)
.then( res => Promise.resolve(res.data))
//.then(console.log("city in editCity houseService " + city.ciudad))
//.then( alert(city.ciudad))







export default {
  getHouses, createHouses, getProperties, getHouseDetail, deleteHouse, editHouse, editHousePhotos, editLocation, editCity
}
