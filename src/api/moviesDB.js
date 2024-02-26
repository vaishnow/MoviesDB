import { axiosAPI } from "./axiosAPI";

const MDB_BASE_URL = import.meta.env.VITE_MDB_BASEURL

const jwtHeader = {
	"Content-Type": "application/json",
	Authorization: `Bearer ${sessionStorage.getItem("token")}`,
}

export const userRegister = async (reqBody) => {
	return await axiosAPI('POST', `${MDB_BASE_URL}/user/register`, reqBody)
}

export const userLogin = async (reqBody) => {
	return await axiosAPI('GET', `${MDB_BASE_URL}/user/login`, reqBody)
}

export const getUserData = async () => {
	return await axiosAPI('GET', `${MDB_BASE_URL}/user/details`, {}, jwtHeader)
}


export const likeContent = async (type, tmdbId, liked) => {
	return await axiosAPI('POST', `${MDB_BASE_URL}/mdb/${type}/${tmdbId}/like`, { liked }, jwtHeader)
}

export const saveContent = async (type, tmdbId, saved) => {
	return await axiosAPI('POST', `${MDB_BASE_URL}/mdb/${type}/${tmdbId}/save`, { saved }, jwtHeader)
}

export const getContentStats = async (type, tmdbId) => {
	return await axiosAPI('GET', `${MDB_BASE_URL}/mdb/${type}/${tmdbId}`, "", jwtHeader)
}


export const getReviews = async (type, tmdbId) => {
	return await axiosAPI('GET', `${MDB_BASE_URL}/mdb/${type}/${tmdbId}/review`, "", jwtHeader)
}

export const setReviews = async (type, tmdbId, reqBody) => {
	return await axiosAPI('POST', `${MDB_BASE_URL}/mdb/${type}/${tmdbId}/review/add`, reqBody, jwtHeader)
}