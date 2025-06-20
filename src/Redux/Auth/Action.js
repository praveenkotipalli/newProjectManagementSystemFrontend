import axios from "axios";
import { GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from "./ActionTypes"
import { API_BASE_URL } from "@/config/api";
// import { type } from "os";
 

export const register = userData => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
    try {
        const { data } = await axios.post(`https://project-management-system-with-spring-7svx.onrender.com/auth/signup`, userData);
        console.log("REGISTER payload:", userData);
        console.log("REGISTER response:", data);
        
        if (data.jwt) {
            localStorage.setItem("jwt", data.jwt);
            dispatch({ 
                type: REGISTER_SUCCESS,
                payload: { jwt: data.jwt }
            });
        }
    } catch (error) {
        console.error("Register error:", error);
        dispatch({ 
            type: REGISTER_FAILURE, 
            payload: error.response?.data?.message || "Registration failed"
        });
    }
}


export const getUser =()=>async(dispatch)=>{
    dispatch({type:GET_USER_REQUEST})
    try{
        const {data} = await axios.get(`https://project-management-system-with-spring-7svx.onrender.com/api/users/profile`, {
            headers:{
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
            },
        });
        // if(data.jwt){
        //     localStorage.setItem("jwt", data.jwt)
            dispatch({type:GET_USER_SUCCESS, payload: data})
        // }


        console.log("GET USER success", data);
    }catch(error){
        console.log(error);
    }
}

export const login = userData => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
        const { data } = await axios.post(`https://project-management-system-with-spring-7svx.onrender.com/auth/signing`, userData);
        console.log("Login payload:", userData);
        console.log("Login response:", data);
        
        if (data.jwt) {
            localStorage.setItem("jwt", data.jwt);
            dispatch({ 
                type: LOGIN_SUCCESS,
                payload: { jwt: data.jwt }
            });
        }
    } catch (error) {
        console.error("Login error:", error);
        dispatch({ 
            type: LOGIN_FAILURE, 
            payload: error.response?.data?.message || "Invalid credentials"
        });
    }
}

export const logout = () => async (dispatch) => {
    dispatch({ type: LOGOUT });
    localStorage.clear();
}