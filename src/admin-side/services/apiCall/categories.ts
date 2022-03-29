import Category from "../../../models/category";
import { callInstance } from "../../network/connection";

// getAll method

export const getAllCategories  = async () => {
    try {
        const response = await callInstance.get('/categories');
        return response.data;

    } catch (err) {
        console.log(err);
    }
}

// getone method
export const getOneCategory = async (id: string | number) => {
    try{
        const response = await callInstance.get(`/categories/${id}`);
        return response.data;
    }catch(err){
        console.log(err);
    }
}

// create method
export const createCategory = async(c : Category)=>{
    try{
        const createdCategory = await callInstance.post('/categories' , c)
        return createdCategory.data;
    }catch(err){
        console.log(err);
    }
}

// edit method
export const editCategory = async(id : string | number,c : object)=>{
    try{
        const editedCategory = await callInstance.put(`/categories/${id}` , c);
        return editedCategory.data;
    }catch(err){
        console.log(err);
    }
}

export const deleteCategory = async(id : string | number)=>{
    try{
        const deleteCategory = await callInstance.delete(`/categories/${id}`);
        return deleteCategory.data;
    }catch(err){
        console.log(err);
    }
}