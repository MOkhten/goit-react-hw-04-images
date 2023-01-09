import axios from 'axios';

axios.defaults.baseURL = "https://pixabay.com/api/";
 const params = {
  key: '30858133-3384191e7fc42d639d87c19d3',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
  per_page: 12,
  isImageModalOpen: false,
};

export const fetchImages = async (query, page) => {
  const { data } = await axios.get(`/?q=${query}&page=${page}`, { params });
  return data;
};
