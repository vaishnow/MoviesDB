import { axiosAPI } from "./axiosAPI";

const MDB_BASE_URL = import.meta.env.VITE_MDB_BASEURL

export const userRegister = async (reqBody) => {
	return await axiosAPI('POST', `${MDB_BASE_URL}/user/register`, reqBody)
}

export const userLogin = async (reqBody) => {
	return await axiosAPI('POST', `${MDB_BASE_URL}/user/login`, reqBody)
}

export const getUserData = async (reqHeader) => {
	return await axiosAPI('POST', `${MDB_BASE_URL}/user/details`,{},reqHeader)
}