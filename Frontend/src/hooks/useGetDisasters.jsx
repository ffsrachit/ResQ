import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { setallDisaster } from "@/redux/disasterslice"
import { DISASTER_API_END_POINT } from "@/utils/constants"

const useGetDisasters = () => {
  const dispatch = useDispatch()
  const disasters = useSelector((state) => state.disaster?.disaster || []) // <-- safely read from Redux

  useEffect(() => {
    const fetchDisasters = async () => {
      try {
        const res = await axios.get(`${DISASTER_API_END_POINT}/getD`)
        console.log("API RESPONSE:", res.data)

        if (res.data.success) {
          dispatch(setallDisaster(res.data.data || []))
        }
      } catch (error) {
        console.error("Error fetching disasters:", error)
      }
    }

    fetchDisasters()
  }, [dispatch])

  return disasters  // ✅ return disasters so component can use them
}

export default useGetDisasters
