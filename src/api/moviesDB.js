import { axiosAPI } from "./axiosAPI";

const MDB_BASE_URL = import.meta.env.VITE_MDB_BASEURL

const getJwtHeader = () => {
	return {
		"Content-Type": "application/json",
		Authorization: `Bearer ${sessionStorage.getItem("token")}`,
	}
}

export const userRegister = async (reqBody) => {
	return await axiosAPI('POST', `${MDB_BASE_URL}/user/register`, reqBody)
}

export const userLogin = async (reqBody) => {
	return await axiosAPI('POST', `${MDB_BASE_URL}/user/login`, reqBody)
}

export const getUserData = async () => {
	return await axiosAPI('GET', `${MDB_BASE_URL}/user/details`, {}, getJwtHeader())
}

export const editUserData = async (reqBody, reqHeader) => {
	return await axiosAPI('POST', `${MDB_BASE_URL}/user/edit`, reqBody, reqHeader ? reqHeader : getJwtHeader())
}

export const getUserLists = async (username, type) => {
	return await axiosAPI('GET', `${MDB_BASE_URL}/user/${username}/lists/${type}`, {}, getJwtHeader())
}


export const likeContent = async (type, tmdbId, liked) => {
	return await axiosAPI('POST', `${MDB_BASE_URL}/mdb/${type}/${tmdbId}/like`, { liked }, getJwtHeader())
}

export const saveContent = async (type, tmdbId, saved) => {
	return await axiosAPI('POST', `${MDB_BASE_URL}/mdb/${type}/${tmdbId}/save`, { saved }, getJwtHeader())
}

export const getContentStats = async (type, tmdbId, reqBody) => {
	return await axiosAPI('POST', `${MDB_BASE_URL}/mdb/${type}/${tmdbId}`, reqBody, getJwtHeader())
}


export const getReviews = async (type, tmdbId) => {
	return await axiosAPI('GET', `${MDB_BASE_URL}/mdb/${type}/${tmdbId}/review`, "", getJwtHeader())
}

export const setReviews = async (type, tmdbId, reqBody) => {
	return await axiosAPI('POST', `${MDB_BASE_URL}/mdb/${type}/${tmdbId}/review/add`, reqBody, getJwtHeader())
}