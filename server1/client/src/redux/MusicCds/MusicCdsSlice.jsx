import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from 'axios'

export const addMusicCd=createAsyncThunk("addMusicCd",async(data,{rejectWithValue})=>{

    const response = await fetch("http://127.0.0.1:5000/MusicCds/add",{
        method:'post',
        headers:{
            "content-type":"application/json",
            "jwtToken":localStorage.getItem("jwtToken")
        },
        body:JSON.stringify(data)
    });
    try{
        const res=await response.json();
        return res
    }catch(error){
        return rejectWithValue(error)
    }
});

export const editMusicCd=createAsyncThunk('editMusicCd',async({formData,mId} )=>{
    console.log("from music slice edit : ",mId,formData);


    const response = await fetch(`http://127.0.0.1:5000/MusicCds/bySeller/Id/${mId}`,{
        method:'put',
        headers:{
            "content-type":"application/json",
            "jwtToken":localStorage.getItem("jwtToken")
        },
        body:JSON.stringify(formData)
    });
    try{
        const res=await response.json();
        return res
    }catch(error){
        return error
    }

    
})

export const allMusic=createAsyncThunk('allMusic',async()=>{
    const response = await fetch("http://localhost:5000/MusicCds/all ",{
        method:"get"
    });
    try{
        const result=await response.json();
        
        return result;
    }catch(error){
        return error
    }
});

export const SellerMusic=createAsyncThunk('SellerMusic',async(data)=>{
    const response = await fetch(`http://localhost:5000/MusicCds/bySeller/Id/${data}`,{
        method:"get"
    });
    try{
        const result=await response.json();
        
        return result;
    }catch(error){
        return error
    }
});

export const singleMusicData=createAsyncThunk('singleMusicData',async(id)=>{
    const response = await fetch(`http://localhost:5000/MusicCds/oneMusic/Id/${id}`,{
        method:"get"
    });
    try{
        const result=await response.json();
        return result;
    }catch(error){
        return error
    }
});

export const deleteMusicBySeller=createAsyncThunk('deleteMusicBySeller',async(id)=>{
    const response=await fetch(`http://127.0.0.1:5000/MusicCds/bySeller/Id/${id}`,{
        method:"DELETE"
    });
    try{
        const result=await response.json();
        return result;
    }catch(error){
        return error
    }
});

export const musicCds = createSlice({
    name:'musicCds',
    initialState:{
        musicCdsDetail:[],
        loading:false,
        error:null
    },
    reducer:{},
    extraReducers:(builder)=>{
        builder.addCase(addMusicCd.pending,(state)=>{
            state.loading=true
        }).addCase(addMusicCd.fulfilled,(state,action)=>{
            state.loading=false
            state.musicCdsDetail.push(action.payload)
        }).addCase(addMusicCd.rejected,(state,action)=>{
            state.loading=true
            state.error=action.payload
        })
        .addCase(allMusic.pending,(state)=>{
            state.loading=true
        }).addCase(allMusic.fulfilled,(state,action)=>{
            state.loading=false
            state.musicCdsDetail=action.payload
        }).addCase(allMusic.rejected,(state,action)=>{
            state.loading=true
            state.error=action.payload
        })
        .addCase(SellerMusic.pending,(state)=>{
            state.loading=true
        }).addCase(SellerMusic.fulfilled,(state,action)=>{
            state.loading=false
            state.musicCdsDetail=action.payload
        }).addCase(SellerMusic.rejected,(state,action)=>{
            state.loading=true
            state.error=action.payload
        })
        .addCase(deleteMusicBySeller.pending,(state)=>{
            state.loading=true
        }).addCase(deleteMusicBySeller.fulfilled,(state,action)=>{
            state.loading=false;
            const {id}=action.payload;
            if(id){
                state.musicCdsDetail=state.musicCdsDetail.filter(val=> val.id !== id)
            }
            // state.musicCdsDetail=action.payload
        }).addCase(deleteMusicBySeller.rejected,(state,action)=>{
            state.loading=true
            state.error=action.payload
        })
        .addCase(singleMusicData.pending,(state)=>{
            state.loading=true
        }).addCase(singleMusicData.fulfilled,(state,action)=>{
            state.loading=false
            state.musicCdsDetail=action.payload
        }).addCase(singleMusicData.rejected,(state,action)=>{
            state.loading=true
            state.error=action.payload
        })
        .addCase(editMusicCd.pending,(state)=>{
            state.loading=true
        }).addCase(editMusicCd.fulfilled,(state,action)=>{
            state.loading=false
            
            state.musicCdsDetail=state.musicCdsDetail.map((val)=>
                val.id === action.payload.id ? action.payload : val
            )
        }).addCase(editMusicCd.rejected,(state,action)=>{
            state.loading=true
            state.error=action.payload
        })
        
    }
})

export default musicCds.reducer