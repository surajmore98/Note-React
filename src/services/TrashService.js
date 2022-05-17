import { ResponseStatusCode } from "../utility/ResponseStatusCode";
import { toast } from 'react-toastify';
import { deleteApi, postApi, getApi } from "./AxiosWrapper";

export const getAllTrashNotes = async(token) => {
    try {
        const response = await getApi("/trash", token);
        if(response.status === ResponseStatusCode.OK){
            return response.data;
        }
    } catch(e) {
        toast.error(e.response.data['errors'] || "something went wrong!!");
        console.error(e);
    }
}

export const deleteFromTrash = async(id, token) => {
    try {
        const response = await deleteApi(`/trash/delete/${id}`, token);
        if(response.status === ResponseStatusCode.OK){
            return response.data;
        }
    } catch(e) {
        toast.error(e.response.data['errors'] || "something went wrong!!");
        console.error(e);
    }
}

export const restoreFromTrash = async(id, token) => {
    try {
        const response = await postApi(`/trash/restore/${id}`, token);
        if(response.status === ResponseStatusCode.OK){
            return response.data;
        }
    } catch(e) {
        toast.error(e.response.data['errors'] || "something went wrong!!");
        console.error(e);
    }
}