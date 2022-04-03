import {Order} from "../../../models/order";
import { callInstance } from "../../network/connection";

// getAll method

export const getAllOrders  = async () => {
    try {
        const response = await callInstance.get('/orders');
        return response.data;

    } catch (err) {
        console.log(err);
    }
}

// getone method
export const getOneOrder = async (id: string | number) => {
    try{
        const response = await callInstance.get(`/orders/${id}`);
        return response.data;
    }catch(err){
        console.log(err);
    }
}

// create method
export const createOrder = async(o : Order)=>{
    try{
        const response = await callInstance.post('/orders' , o)
        return response.data;
    }catch(err){
        console.log(err);
    }
}

// edit method
export const editOrder = async(id : string | number,c : object)=>{
    try{
        const response = await callInstance.put(`/orders/${id}` , c);
        return response.data;
    }catch(err){
        console.log(err);
    }
}

export const deleteOrder = async(id : string | number)=>{
    try{
        const response = await callInstance.delete(`/orders/${id}`);
        return response.data;
    }catch(err){
        console.log(err);
    }
}