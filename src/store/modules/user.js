import { request } from '@/utils';
import {createSlice} from '@reduxjs/toolkit'
import { setToken as _setToken,getToken ,removeToken} from '@/utils';

const userStore = createSlice({
    name:'user',
    initialState:{
        token :getToken()||'',
        userInfo: {}
    },
    reducers:{  
        setToken(state, action) {
            state.token = action.payload
            _setToken(action.payload)
        },
        setUserInfo (state, action) {
            state.userInfo = action.payload
        },
        clearUserInfo(state){
            state.token = ''
            state.userInfo = {}
            removeToken()
        }
    },
});

const { setToken, setUserInfo ,clearUserInfo } = userStore.actions
const userReducer = userStore.reducer

const  fetchLogin = (loginForm) =>{
    return async (dispatch)=>{
        const res = await request.post('/v1_0/authorizations',loginForm)
        dispatch(setToken(res.data.token))
    }
}

const fetchUserInfo = () => {
    return async (dispatch) => {
    //   request failed
    //   const res = await request.get('/user/profile')
     const res = {name : "kyle"}
      dispatch(setUserInfo(res))
    }
  }
  



export {setToken, fetchLogin,fetchUserInfo,clearUserInfo}
export default userReducer;
