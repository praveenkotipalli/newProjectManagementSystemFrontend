import api from "@/config/api";
import { FETCH_CHAT_BY_MESSAGES_FAILURE, FETCH_CHAT_BY_MESSAGES_REQUEST, FETCH_CHAT_BY_MESSAGES_SUCCESS, FETCH_CHAT_BY_PROJECT_FAILURE, FETCH_CHAT_BY_PROJECT_REQUEST, FETCH_CHAT_BY_PROJECT_SUCCESS, SEND_MESSAGE_FAILURE, SEND_MESSAGE_REQUEST, SEND_MESSAGE_SUCCESS } from "./ActionType";
// import { type } from "os";
// import { ACCEPT_INVITATION_REQUEST, ACCEPT_INVITATION_SUCCESS, CREATE_PROJECT_REQUEST, CREATE_PROJECT_SUCCESS, DELETE_PROJECT_REQUEST, DELETE_PROJECT_SUCCESS, FETCH_PROJECT_BY_ID_REQUEST, FETCH_PROJECT_BY_ID_SUCCESS, FETCH_PROJECTS_REQUEST, FETCH_PROJECTS_SUCCESS, INVITE_TO_PROJECT_REQUEST, INVITE_TO_PROJECT_SUCCESS, SEARCH_PROJECT_REQUEST, SEARCH_PROJECT_SUCCESS } from "./ActionTypes";

export const sendMessage=(messageData)=>async(dispatch)=>{
    dispatch({type:SEND_MESSAGE_REQUEST})
    try {
        const response = await api.post(
            "/api/messages/send",
            messageData
        )
        dispatch({type:SEND_MESSAGE_SUCCESS,
             message: response.data
        });
        console.log("message sent", response.data);
    } catch (error) {
        console.log(error);
        dispatch({
            type: SEND_MESSAGE_FAILURE,
            error: error.message,
        })
    }
}

export const fetchChatByProject=(projectId)=> {
    return async (dispatch) => {
        dispatch({type:FETCH_CHAT_BY_PROJECT_REQUEST});
        try {
            const response = await api.get(
                `/api/projects/${projectId}/chat`,
            );
            console.log("fetch chat ", response.data);
            dispatch({
                type:FETCH_CHAT_BY_PROJECT_SUCCESS,
                chat: response.data
            });
        } catch (error) {
            console.log(error);
            dispatch({
                type: FETCH_CHAT_BY_PROJECT_FAILURE,
                error: error.message,
        })
        }
    }
}

export const fetchChatMessages=(chatId)=> {
    return async (dispatch) => {
        dispatch({type:FETCH_CHAT_BY_MESSAGES_REQUEST});
        try {
            const response = await api.get(
                `/api/messages/chat/${chatId}`,
            );
            console.log("fetch messages ", response.data);
            dispatch({
                type:FETCH_CHAT_BY_MESSAGES_SUCCESS,
                chatId,
                messages: response.data
            });
        } catch (error) {
            console.log(error);
            dispatch({
                type: FETCH_CHAT_BY_MESSAGES_FAILURE,
                error: error.message,
        })
        }
    }
}
