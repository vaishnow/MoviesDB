import { useEffect, useState } from "react";
import { discoverContent } from "../api/tmdb";

const useContent = (urlSuffix) => {
	const [contentDetails, setContentDetails] = useState({});

	const getContentDetails = async () => {
		const result = await discoverContent(urlSuffix);
		if (result.status === 200) {
			setContentDetails(result.data);
			return result.data
		} else {
			console.log(result.response.data);
		}
	};

	useEffect(() => {
		getContentDetails();
	}, []);

	return [contentDetails, getContentDetails]
}

export default useContent