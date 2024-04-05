import { useEffect, useState } from "react";
import { getUserLists } from "../api/moviesDB";
import { toast } from "react-toastify";

const useUserList = (username, type) => {
	const [list, setList] = useState([])

	const getList = async () => {
		const result = await getUserLists(username, type)
		if (result.status === 200) {
			setList(result.data.list)
		}else{
			toast.error(result.response.data)
		}
	}
	
	useEffect(()=>{
		getList()
	},[])

	return { list, setList }
}

export default useUserList