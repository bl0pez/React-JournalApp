import { collection, doc, setDoc } from "firebase/firestore/lite";
import { firebaseBD } from "../../firebase/config";
import { addNewEmptyNote, setActiveNote, savingNewNote, setNotes, setSaving, updateNote } from "./";
import { loadNotes } from "../../helpers";

export const startNewNote = () => {
    return async(dispatch, getState) => {

        dispatch(savingNewNote());
        
        const { uid } = getState().auth;

        const newNote = {
            title: "",
            body: "",
            date: new Date().getTime(),
        }

        const newDoc = doc( collection( firebaseBD, `${uid}/journal/notes`));
        await setDoc( newDoc, newNote);

        newNote.id = newDoc.id;

        dispatch( addNewEmptyNote( newNote ));
        dispatch( setActiveNote( newNote ));

    }
}

export const startLoadingNotes = () => {
    return async(dispatch, getState ) => {
        const { uid } = getState().auth;

        const notas = await loadNotes( uid );

        dispatch( setNotes( notas ));
    }
}

export const startSavingNote = (note) => {
    return async(dispatch, getState) => {
        const { uid } = getState().auth;
        const { active:note } = getState().journal;

        const noteToFirestore = { ...note };
        //Elimina la propiedad id de la nota para que no se guarde en firestore
        delete noteToFirestore.id;

    }
}

export const startSaveNote = () => {
    return async(dispatch, getState) => {

        dispatch( setSaving() );

        const { uid } = getState().auth;
        const { active:note } = getState().journal;

        const noteToFirestore = { ...note };
        delete noteToFirestore.id;

        const docRef = doc( firebaseBD, `${uid}/journal/notes/${note.id}`);
        await setDoc( docRef, noteToFirestore, {marge: true});

        dispatch( updateNote( note ));

    }
}

export const startUploading = (file = []) => {
    return async( dispatch ) => {
        
    }
}