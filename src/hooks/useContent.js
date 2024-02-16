import { useEffect, useState } from "react";
import { discoverContent } from "../api/tmdb";

const useContent = (urlSuffix) => {
	const contentPlaceholder = {
		"results":
			Array.from({ length: 20 }, (_, index) => ({
				"id": index,
				"genre_ids": [1, 2],
				"original_title": "...",
				"overview": "...",
				"popularity": 0,
				"poster_path": "_",
				"release_date": "...",
				"title": "...",
				"vote_average": 0,
				"vote_count": 0
			}))
		,
		"genres":
			Array.from({ length: 5 }, (_, index) => ({
				"id": index,
			}))
	}
	const [contentDetails, setContentDetails] = useState(contentPlaceholder);

	const getContentDetails = async () => {
		setContentDetails(contentPlaceholder)
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