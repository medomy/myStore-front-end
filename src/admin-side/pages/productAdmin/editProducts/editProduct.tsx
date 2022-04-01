import React from "react";
import { useParams } from "react-router-dom";
import { Box, Grid, TextField, Button, MenuItem, LinearProgress } from "@mui/material";
import { Formik, Form, Field } from 'formik';
import Category from "../../../../models/category";
import Product from "../../../../models/product";
import * as yup from 'yup';
import { getAllCategories } from "../../../services/apiCall/categories";
import { editProduct, getOneProduct } from "../../../services/apiCall/products";
import uploadPhoto from "../../../services/uploadPhoto";
import { NavbarAdmin } from "../../../components/navbar/navbar";
import './editProduct.css';

interface props {

}

export const EditProductPage: React.FC<props> = () => {
    const [product, setProduct] = React.useState<Product>({
        title: "",
        price: 0,
        description: "",
        categoryid: 1,
        company: "",
        photosrc: "",
    })
    const [categories, setCategories] = React.useState<Category[]>([]);
    const [img, setImg] = React.useState<File | null>(null);
    const [imgSrc, setImgSrc] = React.useState<string>("");
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [uploading, setUploading] = React.useState<boolean>(false);
    const [initialValues, setInitialValues] = React.useState<{
        title: string,
        price: number,
        description: string,
        category: string | number,
        company: string,
    }>({
        title: "",
        price: 0,
        description: "",
        category: 1,
        company: "",
    })
    const validationSchema = yup.object().shape({
        title: yup.string().required('field required').min(5, "at least 5 charachters"),
        price: yup.number().required('field required'),
        company: yup.string().required('field required').min(5, "at least 5 charachters"),
        category: yup.string().required('field required'),
        description: yup.string().required('field required'),
    })
    const id = useParams().id;
    const onSubmit = async (vals: {
        title: string,
        price: number,
        description: string,
        category: string | number,
        company: string,
    }) => {
        try {
            console.log(vals);
            setUploading(true);
            if (img) {
                const edittedProduct = await editProduct(Number(id), {
                    title: vals.title,
                    price: vals.price,
                    company: vals.company,
                    categoryid: vals.category,
                    description: vals.description,
                    photosrc: imgSrc
                })
                console.log(edittedProduct);
                setUploading(false);
            }
            else if (!img) {
                const edittedProduct = await editProduct(Number(id), {
                    title: vals.title,
                    price: vals.price,
                    company: vals.company,
                    categoryid: vals.category,
                    description: vals.description,
                })
                console.log(edittedProduct);
                setUploading(false);
            }

        } catch (err) {
            console.log(err)
        }

    }
    const callApis = async () => {
        try {
            const comingCategories = await getAllCategories();
            setCategories(comingCategories);
            const comingproduct = await getOneProduct(Number(id));
            setProduct(comingproduct);
            setInitialValues({
                title: comingproduct.title,
                price: comingproduct.price,
                description: comingproduct.description,
                category: comingproduct.categoryid,
                company: comingproduct.company
            })
        } catch (err) {
            console.log(err);
        }
    }

    React.useEffect(() => {
        callApis();
    }, [])
    const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImg(e.target.files![0]);
    }
    const upload = () => {
        console.log(img);
        setIsLoading(true);
        uploadPhoto(img)
            .then((res) => {
                setImgSrc(res?.data.data.display_url);
                setIsLoading(false);
            })
            .catch(err => console.log(err))
    }
    console.log("product" , product);
    return (
        <>
            <NavbarAdmin />
            <Box sx={{ flexGrow: 1 }}>
                <Grid container className="myGrid" justifyContent="center">
                    <Grid item lg={4} sm={8} xs={12} className='form-wrapper'>
                        <h3>edit Product</h3>
                        <Formik
                            initialValues={initialValues}
                            enableReinitialize
                            validationSchema={validationSchema}
                            onSubmit={onSubmit}>
                            <Form>
                                <div className='field-wrapper'>
                                    <Field name='title' id='title'>
                                        {
                                            (props: { field: any; form: any; meta: any; }) => {
                                                const { field, form, meta } = props
                                                return <TextField
                                                    fullWidth
                                                    label="title"
                                                    variant="filled"
                                                    {...field}
                                                    error={meta.touched && meta.error ? true : false}
                                                    helperText={meta.touched && meta.error ? meta.error : ""} />
                                            }
                                        }
                                    </Field>
                                </div>
                                <div className='field-wrapper'>
                                    <Field name="price" id='price'>
                                        {
                                            (props: { field: any; form: any; meta: any; }) => {
                                                const { field, form, meta } = props
                                                return <TextField
                                                    fullWidth
                                                    type='number'
                                                    label="price"
                                                    variant="filled"
                                                    {...field}
                                                    error={meta.touched && meta.error ? true : false}
                                                    helperText={meta.touched && meta.error ? meta.error : ""} />
                                            }
                                        }
                                    </Field>
                                </div>
                                <div className='field-wrapper'>
                                    <Field name="company" id='company'>
                                        {
                                            (props: { field: any; form: any; meta: any; }) => {
                                                const { field, form, meta } = props
                                                return <TextField
                                                    fullWidth
                                                    label="company"
                                                    variant="filled"
                                                    {...field}
                                                    error={meta.touched && meta.error ? true : false}
                                                    helperText={meta.touched && meta.error ? meta.error : ""} />
                                            }
                                        }
                                    </Field>
                                </div>
                                <div className='field-wrapper'>
                                    <Field name="category" id='category'>
                                        {
                                            (props: { field: any; form: any; meta: any; }) => {
                                                const { field, form, meta } = props
                                                return <TextField
                                                    fullWidth
                                                    select
                                                    label="category"
                                                    variant="filled"
                                                    {...field}
                                                    error={meta.touched && meta.error ? true : false}
                                                    helperText={meta.touched && meta.error ? meta.error : ""} >
                                                    {categories.map((category) => {
                                                        return (
                                                            <MenuItem key={category.id} value={category.id}>
                                                                {category.name}
                                                            </MenuItem >
                                                        )
                                                    })}
                                                </TextField>
                                            }
                                        }
                                    </Field>
                                </div>
                                <div className='field-wrapper'>
                                    <Field name="description" id='description'>
                                        {
                                            (props: { field: any; form: any; meta: any; }) => {
                                                const { field, form, meta } = props
                                                return <TextField
                                                    fullWidth
                                                    multiline
                                                    label="description"
                                                    variant="filled"
                                                    {...field}
                                                    error={meta.touched && meta.error ? true : false}
                                                    helperText={meta.touched && meta.error ? meta.error : ""} />
                                            }
                                        }
                                    </Field>
                                </div>
                                <div className='field-wrapper'>
                                    <figure>
                                        <img src={product.photosrc} alt="product-pic" />
                                    </figure>
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
                            </Form>
                        </Formik>
                    </Grid>
                </Grid>
            </Box>

        </>
    )
}