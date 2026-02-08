import { createSlice } from '@reduxjs/toolkit';

export const infoSlice = createSlice({
    name: 'info',
    initialState: {
        isShow: false,
        text: '',
        type: 'success',
        time: '',
    },
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
    },
});

export default infoSlice.reducer;

export const { createMessage, removeMessage } = infoSlice.actions;
