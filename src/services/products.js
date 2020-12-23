import axios from "axios";
const baseUrl = "http://localhost:3001/admin/products";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const create = async (product) => {
  const response = await axios.post(baseUrl, product);
  return response.data;
};

const updateById = async (product) => {
  const response = await axios.put(`${baseUrl}/${product.id}`, product);
  return response.data;
};

const deleteById = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

const bulkDelete = async (ids) => {
  const response = await axios.post(`${baseUrl}/bulk-delete`, ids)
  return response.data
}

const productService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  bulkDelete
};

export default productService;
