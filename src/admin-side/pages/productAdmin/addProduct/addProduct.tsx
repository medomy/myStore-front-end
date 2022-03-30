import React from 'react'
import { NavbarAdmin } from '../../../components/navbar/navbar';
import { Grid, Box, Button, TextField, MenuItem, LinearProgress } from '@mui/material';
import * as yup from 'yup';
import './addProduct.css'
import { useFormik } from 'formik';
import Category from '../../../../models/category';
import { getAllCategories } from '../../../services/apiCall/categories';
import uploadPhoto from "../../../services/uploadPhoto";
import { createProduct } from '../../../services/apiCall/products';

interface props {

}

export const AddProductAdmin: React.FC<props> = () => {
    const [categories, setCategories] = React.useState<Category[]>([]);
    const [img, setImg] = React.useState<File | null>(null);
    const [imgSrc, setImgSrc] = React.useState<string>("");
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [uploading , setUploading] = React.useState<boolean>(false);
    const initialValues = {
        title: "",
        price: 0,
        company: "",
        category: "",
        description: "",
    }
    const onSubmit = async (vals: { title: string; price: number; company: string; category: string | number; description: string; }) => {
        console.log(vals);
        console.log(imgSrc);
        setUploading(true);
        const createdProduct =await createProduct({
            title : vals.title,
            price : vals.price,
            company : vals.company,
            categoryid : vals.category,
            description : vals.description,
            photosrc : imgSrc
        })
        setUploading(false);
        console.log("sbmit");
    }
    const validationSchema = yup.object().shape({
        title: yup.string().required('field required').min(5, "at least 5 charachters"),
        price: yup.number().required('field required'),
        company: yup.string().required('field required').min(5, "at least 5 charachters"),
        category: yup.string().required('field required'),
        description: yup.string().required('field required'),
    })

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    });
    const handleImgChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setImg(e.target.files![0]);
    }
    React.useEffect(() => {
        getAllCategories()
            .then(res => setCategories(res))
            .catch(err => console.log(err))

    }, [])
    const upload = () => {
        setIsLoading(true);
        uploadPhoto(img)
            .then((res) => {
                setIsLoading(false);
                setImgSrc(res?.data.data.display_url);
            })
            .catch(err => console.log(err));
    }

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
                                    name="title"
                                    id="title"
                                    error={formik.errors.title && formik.touched.title ? true : false}
                                    onChange={formik.handleChange("title")}
                                    onBlur={formik.handleBlur("title")}
                                    value={formik.values.title}
                                    helperText={formik.errors.title && formik.touched.title ? formik.errors.title : ""} />
                            </div>
                            <div className='field-wrapper'>
                                <TextField
                                    fullWidth
                                    label="price"
                                    variant="filled"
                                    name="price"
                                    id="price"
                                    error={formik.errors.price && formik.touched.price ? true : false}
                                    type='number'
                                    onChange={formik.handleChange("price")}
                                    onBlur={formik.handleBlur("price")}
                                    value={formik.values.price}
                                    helperText={formik.errors.price && formik.touched.price ? formik.errors.price : ""} />
                            </div>
                            <div className='field-wrapper'>
                                <TextField
                                    fullWidth
                                    label="company"
                                    variant="filled"
                                    name="company"
                                    id="company"
                                    error={formik.errors.company && formik.touched.company ? true : false}
                                    onChange={formik.handleChange("company")}
                                    onBlur={formik.handleBlur("company")}
                                    value={formik.values.company}
                                    helperText={formik.errors.company && formik.touched.company ? formik.errors.company : ""} />
                            </div>
                            <div className='field-wrapper'>
                                <TextField
                                    fullWidth
                                    label="category"
                                    name="category"
                                    id="category"
                                    select
                                    variant="filled"
                                    error={formik.errors.category && formik.touched.category ? true : false}
                                    onChange={formik.handleChange("category")}
                                    onBlur={formik.handleBlur("category")}
                                    value={formik.values.category}
                                    helperText={formik.errors.category && formik.touched.category ? formik.errors.category : ""} >
                                    {categories.map((category) => {
                                        return (
                                            <MenuItem key={category.id} value={category.id}>
                                                {category.name}
                                            </MenuItem >
                                        )
                                    })}
                                </TextField>
                            </div>
                            <div className='field-wrapper'>
                                <TextField
                                    fullWidth
                                    label="description"
                                    multiline
                                    variant="filled"
                                    name="description"
                                    id="description"
                                    error={formik.errors.description && formik.touched.description ? true : false}
                                    onChange={formik.handleChange("description")}
                                    onBlur={formik.handleBlur("description")}
                                    value={formik.values.description}
                                    helperText={formik.errors.description && formik.touched.description ? formik.errors.description : ""} />
                            </div>
                            <div className='field-wrapper'>
                                <label htmlFor="img">
                                    <input accept="image/*"
                                        id="img"
                                        multiple
                                        type="file"
                                        name='img'
                                        onChange={handleImgChange}
                                    />
                                </label>
                                <Button variant="contained" component="span" onClick={upload}>
                                    Upload
                                </Button>
                                {
                                    isLoading && <Box sx={{ width: '100%' }} marginY={1}>
                                    <LinearProgress />
                                </Box>
                                }
                                
                            </div>
                            <div className='btn-wrapper'>
                                <Button variant="outlined" color="primary" type='submit'>
                                    Submit
                                </Button>
                            </div>
                            {
                                    uploading && <Box sx={{ width: '100%' }} marginY={1}>
                                    <LinearProgress />
                                </Box>
                                }
                        </form>
                    </Grid>
                </Grid>

            </Box>
        </>
    )
}