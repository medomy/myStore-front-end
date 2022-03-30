import Product from "../../../models/product";
import { callInstance } from "../../network/connection";

// getAll method

export const getAllProducts  = async () => {
    try {
        const response = await callInstance.get('/products');
        return response.data;

    } catch (err) {
        console.log(err);
    }
}

// getone method
export const getOneProduct = async (id: string | number) => {
    try{
        const response = await callInstance.get(`/products/${id}`);
        return response.data;
    }catch(err){
        console.log(err);
    }
}

// create method
export const createProduct = async(p : Product)=>{
    try{
        const createdProduct = await callInstance.post('/products' , p)
        return createdProduct.data;
    }catch(err){
        console.log(err);
    }
}

// edit method
export const editProduct = async(id : string | number,c : object)=>{
    try{
        const editedProduct = await callInstance.put(`/products/${id}` , c);
        return editedProduct.data;
    }catch(err){
        console.log(err);
    }
}

export const deleteProduct = async(id : string | number)=>{
    try{
        const deleteProduct = await callInstance.delete(`/products/${id}`);
        return deleteProduct.data;
    }catch(err){
        console.log(err);
    }
}