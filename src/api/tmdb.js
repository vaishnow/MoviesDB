import { axiosAPI } from "./axiosAPI";

const TMDB_BASE_URL = 'https://api.themoviedb.org/3'

const reqHeader = {
	"Content-Type": "application/json",
	"Authorization": `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
};

export const discoverContent = async (api) => {
	return await axiosAPI('GET', `${TMDB_BASE_URL}${api}`, '', reqHeader)
}