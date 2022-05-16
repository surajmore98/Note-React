import { ResponseStatusCode } from "../utility/ResponseStatusCode";
import { toast } from 'react-toastify';
import { deleteApi, postApi } from "./AxiosWrapper";

export const insertNote = async(note, token) => {
    try {
        const response = await postApi("/notes", token, note);
        if(response.status === ResponseStatusCode.CREATED){
            return response.data;
        }
    } catch(e) {
        toast.error(e.response.data['errors'] || "something went wrong!!");
        console.error(e);
    }
}

export const updateNote = async(note, id, token) => {
    try {
        const response = await postApi(`/notes/${id}`, token, note);
        if(response.status === ResponseStatusCode.CREATED){
            return response.data;
        }
    } catch(e) {
        toast.error(e.response.data['errors'] || "something went wrong!!");
        console.error(e);
    }
}

export const deleteNote = async(id, token) => {
    try {
        const response = await deleteApi(`/notes${id}`, token);
        if(response.status === ResponseStatusCode.CREATED){
            return response.data;
        }
    } catch(e) {
        toast.error(e.response.data['errors'] || "something went wrong!!");
        console.error(e);
    }
}

export const getNotes = async(note, token) => {
    try {
        const response = await postApi("/notes", note, token);
        if(response.status === ResponseStatusCode.CREATED){
            return response.data;
        }
    } catch(e) {
        toast.error(e.response.data['errors'] || "something went wrong!!");
        console.error(e);
    }
}

export const moveNotesToArchive = async(id, token) => {
    try {
        const response = await postApi(`/notes/archives/${id}`, token);
        if(response.status === ResponseStatusCode.CREATED){
            return response.data;
        }
    } catch(e) {
        toast.error(e.response.data['errors'] || "something went wrong!!");
        console.error(e);
    }
}

export const moveNotesToTrash = async(id, token) => {
    try {
        const response = await postApi(`/notes/trash/${id}`, token);
        if(response.status === ResponseStatusCode.CREATED){
            return response.data;
        }
    } catch(e) {
        toast.error(e.response.data['errors'] || "something went wrong!!");
        console.error(e);
    }
}

