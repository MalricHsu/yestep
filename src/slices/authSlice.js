import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const token = Cookies.get('accessToken');
const userCookie = Cookies.get('user');

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLogin: !!token, //變成布林值
        user: userCookie ? JSON.parse(userCookie) : null,
        token: token || null,
    },
    reducers: {
        //登入成功
        loginSuccess: (state, action) => {
            const { accessToken, user } = action.payload;
            state.isLogin = true;
            state.user = user;
            state.token = accessToken;
            // 將 Token 和 User 資料寫入 Cookie
            // expires: 7 代表 7 天後過期
            Cookies.set('accessToken', accessToken, { expires: 7 });
            // 為了方便前端顯示 User 名稱，我們先把 user 資訊也存 cookie (實務上通常只存 token)
            Cookies.set('user', JSON.stringify(user), { expires: 7 });
        },
        logout: (state) => {
            state.isLogin = false;
            state.user = null;
            state.token = null;

            Cookies.remove('accessToken');
            Cookies.remove('user');
        },
    },
});

export default authSlice.reducer;

export const { loginSuccess, logout } = authSlice.actions;
