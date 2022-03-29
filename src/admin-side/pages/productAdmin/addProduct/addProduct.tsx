import React from 'react'
import { NavbarAdmin } from '../../../components/navbar/navbar';
import { Grid, Box, Button, TextField } from '@mui/material';
import './addProduct.css'
import { useFormik } from 'formik';
interface props {

}

export const AddProductAdmin: React.FC<props> = () => {
    const initialValues = {
        title : "",
        price : 0,
        company : "",
        category : "",
        description : ""
    }
    const onSubmit =(vals: { title: string; price: number; company: string; category: string; description: string; })=>{
        console.log(vals);
    }
    const validate =(vals: { title: string; price: number; company: string; category: string; description: string; })=>{
        let errors ={
            title : "",
            price : "",
            company : "",
            category : "",
            description : ""
        };
        // title errors
        if(!vals.title){
            errors.title = "Required field"
        }else if(vals.title.length< 5){
            errors.title = "not enough charachters , at least 5 charachters"
        }
        // price errors
        if(!vals.price){
            errors.price = "Required field";
        }
        // company errors
        if(!vals.company){
            errors.company = "Required field"
        }else if(vals.company.length< 5){
            errors.company = "not enough charachters , at least 5 charachters"
        }
        // category errors
        if(!vals.category){
            errors.category = "Required field"
        }
        // description errors
        if(!vals.description){
            errors.description = "Required field"
        }
        return errors;
    }
    const formik = useFormik({
        initialValues,
        onSubmit,
        validate
    });
    console.log("values",formik.values)
    return (
        <>
            <NavbarAdmin />
            <Box sx={{ flexGrow: 1 }}>
                <Grid container className="myGrid" justifyContent="center">
                    <Grid item className='form-wrapper' lg={6} sm={9} xs={12}>
                        <h3>add a Product</h3>
                        <form onSubmit={formik.handleSubmit}>
                            <div className='field-wrapper'>
                                <TextField
                                    fullWidth
                                    label="title"
                                    variant="filled"
                                    error = {formik.errors.title && formik.touched.title? true : false}
                                    onChange={formik.handleChange("title")}
                                    onBlur={formik.handleBlur("title")}
                                    value={formik.values.title}
                                    helperText= {formik.errors.title && formik.touched.title ? formik.errors.title : ""} />
                            </div>
                            <div className='field-wrapper'>
                                <TextField
                                    fullWidth
                                    label="price"
                                    variant="filled"
                                    error = {formik.errors.price && formik.touched.price? true : false}
                                    type='number'
                                    onChange={formik.handleChange("price")}
                                    onBlur={formik.handleBlur("price")}
                                    value={formik.values.price}
                                    helperText= {formik.errors.price && formik.touched.price ? formik.errors.price : ""} />
                            </div>
                            <div className='field-wrapper'>
                                <TextField
                                    fullWidth
                                    label="company"
                                    variant="filled"
                                    error = {formik.errors.company && formik.touched.company? true : false}
                                    onChange={formik.handleChange("company")}
                                    onBlur={formik.handleBlur("company")}
                                    value={formik.values.company}
                                    helperText= {formik.errors.company && formik.touched.company ? formik.errors.company : ""} />
                            </div>
                            <div className='field-wrapper'>
                                <TextField
                                    fullWidth
                                    label="category"
                                    variant="filled"
                                    error = {formik.errors.category && formik.touched.category ? true : false}
                                    onChange={formik.handleChange("category")}
                                    onBlur={formik.handleBlur("category")}
                                    value={formik.values.category}
                                    helperText={formik.errors.category && formik.touched.category ? formik.errors.category : ""} />
                            </div>
                            <div className='field-wrapper'>
                                <TextField
                                    fullWidth
                                    label="description"
                                    multiline
                                    variant="filled"
                                    error = {formik.errors.description && formik.touched.description  ? true : false}
                                    onChange={formik.handleChange("description")}
                                    onBlur={formik.handleBlur("description")}
                                    value={formik.values.description}
                                    helperText={formik.errors.description && formik.touched.description ? formik.errors.description : ""} />
                            </div>
                            <div className='field-wrapper'>
                                <label htmlFor="contained-button-file">
                                    <input accept="image/*" id="contained-button-file" multiple type="file" />
                                    <Button variant="contained" component="span">
                                        Upload
                                    </Button>
                                </label>
                            </div>
                            <div className='btn-wrapper'>
                                <Button variant="outlined" color="primary" type='submit'>
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </Grid>
                </Grid>

            </Box>
        </>
    )
}