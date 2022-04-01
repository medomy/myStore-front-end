import User from "../../../models/user";
import { callInstance } from "../../network/connection";

// getAll method

export const getAllUsers  = async () => {
    try {
        const response = await callInstance.get('/users');
        return response.data;

    } catch (err) {
        console.log(err);
    }
}

// getone method
export const getOneUser = async (id: string | number) => {
    try{
        const response = await callInstance.get(`/users/${id}`);
        return response.data;
    }catch(err){
        console.log(err);
    }
}

// create method
export const register = async(u : User)=>{
    try{
        const response = await callInstance.post('/users' , u)
        return response.data;
    }catch(err){
        console.log(err);
    }
}

// edit method
export const editUser = async(id : string | number,c : object)=>{
    try{
        const response = await callInstance.put(`/users/${id}` , c);
        return response.data;
    }catch(err){
        console.log(err);
    }
}

export const deleteUser = async(id : string | number)=>{
    try{
        const response = await callInstance.delete(`/users/${id}`);
        return response.data;
    }catch(err){
        console.log(err);
    }
}

// get cart items for user
export const getuserCart = async (id : string | number)=>{
    try{
        const response = await callInstance.get(`/users/cart/${id}`);
        return response.data;
    }catch(err){
        console.log(err);
    }
}