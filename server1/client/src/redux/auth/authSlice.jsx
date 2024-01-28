import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from 'axios'

export const signUp=createAsyncThunk("signup",async(data,{rejectWithValue})=>{

    // const res=await axios.post("http://127.0.0.1:5000/users/signup",data)


    const response=await fetch("http://127.0.0.1:5000/users/signup",{
        method:'post',
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(data)
    });

    try{
        const result=await response.json();
        return result;
    }catch(error){
        return rejectWithValue(error);
    }

})

export const signIn=createAsyncThunk("signin",async(data,{rejectWithValue})=>{

    // const res=await axios.post("http://127.0.0.1:5000/users/signup",data)


    const response=await fetch("http://127.0.0.1:5000/users/signin",{
        method:'post',
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(data)
    });

    try{
        const result=await response.json('logging success');
        return result;
    }catch(error){
        return rejectWithValue(error);
    }

})

export const AllUSers=createAsyncThunk("allUsers",async({rejectWithValue})=>{
    const response=await fetch("http://127.0.0.1:5000/users/all",{
        method:'get',
        headers:{
            "content-type":"application/json"
        }
    });

    try{
        const result=await response.json();
        return result;
    }catch(error){
        return rejectWithValue(error);
    }
})

export const user = createSlice({
    name:'user',
    initialState:{
        users:[],
        loading:false,
        error:null,
        response:{
            token:'',
            id:0,
            username:'',
            email:''
        }
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(signUp.pending,(state)=>{
            state.loading=true;
        })
        .addCase(signUp.fulfilled,(state,action)=>{
            state.loading=false;
            state.users=action.payload
        })
        .addCase(signUp.rejected,(state,action)=>{
            state.loading=true;
            state.error=action.payload
        }).addCase(signIn.pending,(state)=>{
            state.loading=true;
        })
        .addCase(signIn.fulfilled,(state,{payload:{token,id,username,email}})=>{
            state.loading=false;
            state.response.email=email
            state.response.id=id
            state.response.token=token
            state.response.username=username
            localStorage.setItem('jwtToken',token);
            localStorage.setItem('username',username);
            localStorage.setItem('id',id);
        })
    }
})

export default user.reducer