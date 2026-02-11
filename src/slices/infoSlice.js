import { createSlice } from '@reduxjs/toolkit';

const initialState = { isShow: false, text: '', type: '', time: '' };

export const infoSlice = createSlice({
    name: 'info',
    initialState: initialState,
    reducers: {
        createMessage: (state, action) => {
            const { text, type } = action.payload;
            state.isShow = true;
            state.text = text;
            state.type = type;
            state.time = new Date().toLocaleDateString([], {
                hour: '2-digit',
                minute: '2-digit',
            });
        },
        removeMessage: (state) => {
            state.isShow = false;
        },
        clearMessage: () => {
            return initialState;
        },
    },
});

export default infoSlice.reducer;

export const { createMessage, removeMessage, clearMessage } = infoSlice.actions;
