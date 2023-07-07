import axios from 'axios';
import queryString from 'query-string';
import { CatalogInterface, CatalogGetQueryInterface } from 'interfaces/catalog';
import { GetQueryInterface } from '../../interfaces';

export const getCatalogs = async (query?: CatalogGetQueryInterface) => {
  const response = await axios.get(`/api/catalogs${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createCatalog = async (catalog: CatalogInterface) => {
  const response = await axios.post('/api/catalogs', catalog);
  return response.data;
};

export const updateCatalogById = async (id: string, catalog: CatalogInterface) => {
  const response = await axios.put(`/api/catalogs/${id}`, catalog);
  return response.data;
};

export const getCatalogById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/catalogs/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCatalogById = async (id: string) => {
  const response = await axios.delete(`/api/catalogs/${id}`);
  return response.data;
};
