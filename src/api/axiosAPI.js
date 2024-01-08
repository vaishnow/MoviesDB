import axios from 'axios'

export const axiosAPI = async (httpMethod, url, reqBody, reqHeader) => {

	const reqConfig = {
		method: httpMethod,
		url,
		data: reqBody,
		headers: reqHeader ? reqHeader : { "Content-Type": "application/json" }
	}

	return await axios(reqConfig).then((result) => {
		return result
	}).catch((error) => { return error })

}