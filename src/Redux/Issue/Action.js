import api from "@/config/api";

import * as actionTypes from "./ActionTypes";
// import { s } from "vite/dist/node/types.d-aGj9QkWt";

export const fetchIssues = (id) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.FETCH_ISSUES_REQUEST });
        try {
            const response = await api.get(`/api/issues/project/${id}`);
            console.log("fetched issues success", response.data);
            dispatch({ type: actionTypes.FETCH_ISSUES_SUCCESS, issues: response.data });
        } catch (error) {
            console.log("error", error);
            dispatch({ type: actionTypes.FETCH_ISSUES_FAILURE, error: error.message });
        }
    };
};

export const fetchIssueById = (id) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.FETCH_ISSUES_BY_ID_REQUEST });
        try {
            const response = await api.get(`/api/issues/${id}`);
            console.log("fetched issue by id success", response.data);
            dispatch({ type: actionTypes.FETCH_ISSUES_BY_ID_SUCCESS, issue: response.data });
        } catch (error) {
            console.log("error", error);
            dispatch({ type: actionTypes.FETCH_ISSUES_BY_ID_FAILURE, error: error.message });
        }
    };
};

export const createIssue = (issueData) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.CREATE_ISSUE_REQUEST });
        try {
            const response = await api.post("/api/issues", issueData);
            console.log("created issue success", response.data);
            dispatch({ type: actionTypes.CREATE_ISSUE_SUCCESS, issue: response.data });
        } catch (error) {
            console.log("error", error);
            dispatch({ type: actionTypes.CREATE_ISSUE_FAILURE, error: error.message });
        }
    };
};


export const updateIssueStatus = ( {id, status} ) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.UPDATE_ISSUE_STATUS_REQUEST });
        try {
            const response = await api.put(`/api/issues/${id}/status/${status}` );
            console.log("updated issue status success", response.data);
            dispatch({ type: actionTypes.UPDATE_ISSUE_STATUS_SUCCESS, issue: response.data });
        } catch (error) {
            console.log("error", error);
            dispatch({ type: actionTypes.UPDATE_ISSUE_STATUS_FAILURE, error: error.message });
        }
    };
};

export const assignedUserToIssue = ( {issueId, userId} ) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.ASSIGNED_ISSUE_TO_UESR_REQUEST });
        try {
            const response = await api.put(`/api/issues/${issueId}/assignee/${userId}`);
            console.log("assigned issue to user success", response.data);
            dispatch({ type: actionTypes.ASSIGNED_ISSUE_TO_UESR_SUCCESS, issue: response.data });
        } catch (error) {
            console.log("error", error);
            dispatch({ type: actionTypes.ASSIGNED_ISSUE_TO_UESR_FAILURE, error: error.message });
        }
    };

}

export const deleteIssue = (id) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.DELETE_ISSUE_REQUEST });
        try {
            const response = await api.delete(`/api/issues/${id}`);
            console.log("deleted issue success", response.data);
            dispatch({ type: actionTypes.DELETE_ISSUE_SUCCESS, issueId: id });
        } catch (error) {
            console.log("error", error);
            dispatch({ type: actionTypes.DELETE_ISSUE_FAILURE, error: error.message });
        }
    };
}