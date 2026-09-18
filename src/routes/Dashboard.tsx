import { useEffect } from "react";
import { getCurrentUser } from "../../repository/userRepository"
import { useNavigate } from "react-router-dom"

export default function Dashboard(){
    const navigate = useNavigate()
    useEffect(()=>{
        const isAuthenticated = async() =>{
            const user = await getCurrentUser()
            if(user.success === false){
                navigate("/")
            }
        }
        isAuthenticated()
    },[])
    return(
        <></>
    )
}