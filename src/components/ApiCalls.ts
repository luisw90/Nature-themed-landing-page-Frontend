import axios from 'axios';
import { UserItem } from '../Types'

export const saveItem = (item: UserItem, userid: string) => {
  return axios
    .post(`http://localhost:3001/users/${userid}`, item)
    .catch(function (error) {
      console.error(error)
    })
}

export const deleteItem = (userid: string, itemid: string) => {
  return axios
    .delete(`http://localhost:3001/users/${userid}`, {
      data: { itemid: itemid }
    })
    .catch(function (error) {
      console.error(error)
    })
}

export const getSavedItems = async (userid: string) => {
  const response = await axios.get(`http://localhost:3001/users/${userid}`)
  return response
}

export const getOneTheme = async () => {
  const themes = ['a39493c2-c3d7-11ed-afa1-0242ac120002', 'b038576c-c3d7-11ed-afa1-0242ac120002', '90052704-c3d7-11ed-afa1-0242ac120002']
  const theme = themes[Math.floor(Math.random()*themes.length)];

  const response = await axios.get(`http://localhost:3001/themes/${theme}`)
  return response
}

export const getOneImage = async (imagepath : string[]) => {
  const randomImagePath = imagepath[Math.floor(Math.random()*imagepath.length)];

  const response = await axios(`https://api.unsplash.com/photos/${randomImagePath}/?client_id=5237d1231297337d4db4bd521d6710d44e32dfa0f6824f00d2788f9e503fb510`);
  return response
}