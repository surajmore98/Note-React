import { ResponseStatusCode } from "../utility/ResponseStatusCode";
import { toast } from 'react-toastify';
import { deleteApi, postApi, getApi } from "./AxiosWrapper";

export const getAllArchivedNotes = async(token) => {
    try {
        const response = await getApi("/archives", token);
        if(response.status === ResponseStatusCode.OK){
            return response.data;
        }
    } catch(e) {
        toast.error(e.response.data['errors'] || "something went wrong!!");
        console.error(e);
    }
}

export const deleteFromArchives = async(id, token) => {
    try {
        const response = await deleteApi(`/archives/delete/${id}`, token);
        if(response.status === ResponseStatusCode.OK){
            return response.data;
        }
    } catch(e) {
        toast.error(e.response.data['errors'] || "something went wrong!!");
        console.error(e);
    }
}

export const restoreFromArchives = async(id, token) => {
    try {
        const response = await postApi(`/archives/restore/${id}`, token);
        if(response.status === ResponseStatusCode.OK){
            return response.data;
        }
    } catch(e) {
        toast.error(e.response.data['errors'] || "something went wrong!!");
        console.error(e);
    }
}