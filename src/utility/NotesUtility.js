import { SORT_NEWEST_TO_OLDEST, SORT_OLDEST_TO_NEWEST } from "./Modules";
import { LabelUtility } from "./NoteLables";

export const getPinnedNotes = (data) => {
    if(data && data.length > 0) {
        return {
            title: "Pinned",
            data: data.filter(x => x.isPinned)
        }
    }

    return {
        title: "Pinned",
        data: data
    };
}

export const getOtherNotes = (data) => {
    if(data && data.length > 0) {
        return {
            title: "Other",
            data: data.filter(x => !x.isPinned)
        }
    }

    return {
        title: "Other",
        data: data
    };
}

export const sortNotesByTags = (data) => {
    if(data && data.length > 0) {
        let tagsNoteGroup = [];
        LabelUtility.forEach(element => {
            const notesByLabel = data.filter(x => x.tags.map(a => a.label).includes(element.label));
            if(notesByLabel && notesByLabel.length > 0) {
                tagsNoteGroup.push(
                    { title: element.label,
                    data: notesByLabel
                    }
                );
            }
        });
        return tagsNoteGroup;
    }

    return data;
}


export const filterNotesBySearchText = (data, value) => {
    if(value && data && data.length > 0) {
        return data.filter(x => x.title.toLowerCase().indexOf(value.toLowerCase()) >= 0);
    }
    return data;
}

export const filterNotes = (data, searchValue, filterObj) => {
    let filteredNotes = data;
    if(filterObj) {
        if(filterObj.label) {
            filteredNotes = filteredNotes.filter(x => x.tags.map(a => a.label).includes(filterObj.label));
        }
        
        if(filteredNotes.sort) {
            switch(filterObj.sort) {
                case SORT_NEWEST_TO_OLDEST:
                    filteredNotes.sort((a,b) => sortByDateAsc(a,b));
                    break;
                case SORT_OLDEST_TO_NEWEST:
                    filteredNotes.sort((a,b) => sortByDateDesc(a,b));
                    break;
            }
        }
    }
    return filterNotesBySearchText(filteredNotes, searchValue);
}

const sortByDateAsc = (a, b) => {
    return new Date(b.createdDate) - new Date(a.createdDate);
}

const sortByDateDesc = (a, b) => {
    return new Date(a.createdDate) - new Date(b.createdDate);
}