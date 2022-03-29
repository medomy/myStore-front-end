import React from "react";
import { Box, Grid, TextField, Button } from "@mui/material";
import { Params, useParams } from "react-router-dom";
import * as yup from 'yup';
import { Formik, Form, Field } from 'formik';
import Category from "../../../../models/category";
import { NavbarAdmin } from "../../../components/navbar/navbar";
import { editCategory, getOneCategory } from "../../../services/apiCall/categories";
import uploadPhoto from "../../../services/uploadPhoto";
import './editCategory.css';

interface props {

}

export const EditCategoryPage: React.FC = () => {
    const [category, setCategory] = React.useState<Category>({
        name : "",
        description : "",
        photourl : ""
    });
    const [initialValues, setInitialValues] = React.useState<{ name: string, description: string }>({
        name: "",
        description: ""
    })
    const [img, setImg] = React.useState<File | null>(null);
    const [imgSrc, setImgSrc] = React.useState<string>("");
    const params = useParams();
    const id = Number(params.id);
    const validationSchema = yup.object().shape({
        name: yup.string(),
        description: yup.string()
    })

    const onSubmit = async (vals: { name: string, description: string }) => {
        try {
            if(img){
                const editedCategory = await editCategory(id , {
                    name : vals.name,
                    description : vals.description,
                    photourl: imgSrc
                })
                setCategory(editedCategory);
                console.log(editedCategory);
            }
            else if(!img){
                const editedCategory = await editCategory(id , {
                    name : vals.name,
                    description : vals.description,
                })
                setCategory(editedCategory);
                console.log(editedCategory);
            }

        } catch (err) {
            console.log(err);
        }
        console.log(category);
    }
    React.useEffect(() => {
        getOneCategory(id)
            .then((res) => {
                setCategory(res);
                setInitialValues({
                    name: category?.name || res.name,
                    description: category?.description || res.description
                })
            })
            .catch(err => console.log(err));
    }, [])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImg(e.target.files![0]);
    }
    const upload = () => {
        console.log(img);
        uploadPhoto(img)
            .then((res) => setImgSrc(res?.data.data.display_url))
            .catch(err => console.log(err))
    }
    return (
        <>
            <NavbarAdmin />
            <Box sx={{ flexGrow: 1 }}>
                <Grid container className="myGrid" justifyContent="center">
                    <Grid item lg={4} sm={8} xs={12} className='form-wrapper'>
                        <h3>Add Category</h3>
                        <Formik
                            initialValues={initialValues}
                            enableReinitialize 
                            validationSchema={validationSchema}
                            onSubmit={onSubmit}>
                            <Form>
                                <div className='field-wrapper'>
                                    <Field name='name' id='name'>
                                        {
                                            (props: { field: any; form: any; meta: any; }) => {
                                                const { field, form, meta } = props
                                                return <TextField
                                                    fullWidth
                                                    label="name"
                                                    variant="filled"
                                                    {...field}
                                                    error={meta.touched && meta.error ? true : false}
                                                    helperText={meta.touched && meta.error ? meta.error : ""} />
                                            }
                                        }

                                    </Field>
                                </div>
                                <div className='field-wrapper'>
                                    <Field name='description' id='description'>
                                        {
                                            (props: { field: any; form: any; meta: any; }) => {
                                                const { field, form, meta } = props
                                                return <TextField
                                                    fullWidth
                                                    label="description"
                                                    multiline
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
                                        <img src={category.photourl} alt="category-pic" />
                                    </figure>
                                </div>
                                <div className='field-wrapper'>
                                    <label htmlFor="contained-button-file">
                                    <input accept="image/*" id="contained-button-file" multiple type="file" onChange={handleFileChange} />
                                    upload here
                                    </label>
                                    <Button variant="contained" component="span" onClick={upload}>
                                        Upload photo
                                    </Button>

                                </div>
                                <div className='btn-wrapper'>
                                    <Button variant="outlined" color="primary" type='submit'>
                                        Submit
                                    </Button>
                                </div>

                            </Form>

                        </Formik>

                    </Grid>
                </Grid>
            </Box>
        </>
    )
}