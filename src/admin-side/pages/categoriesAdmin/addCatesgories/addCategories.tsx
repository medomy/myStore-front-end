import { Box, Grid, TextField, Button, LinearProgress } from "@mui/material";
import './addCategories.css';
import React, { ChangeEvent } from "react";
import * as yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { NavbarAdmin } from "../../../components/navbar/navbar";
import uploadPhoto from "../../../services/uploadPhoto";
import { createCategory } from "../../../services/apiCall/categories";


interface props {

}
export const AddCategoriesAdmin: React.FC<props> = () => {
    const [img, setImg] = React.useState<File | null>(null);
    const [imgSrc, setImgSrc] = React.useState<string>("");
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [uploading, setUploading] = React.useState<boolean>(false);
    const validationSchema = yup.object().shape({
        name: yup.string().required('required field').min(5, 'not less than 5 charachters'),
        description: yup.string().required('required field')
    })
    const initialValues = {
        name: "",
        description: ""
    }
    const onSubmit = async (vals: { name: string, description: string }) => {
        try {
            setUploading(true);
            const createdCat = await createCategory({
                name: vals.name,
                description: vals.description,
                photourl: imgSrc
            })
            setUploading(false);
            console.log(createdCat);
        } catch (err) {
            console.log(err);
        }
    }
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        setImg(e.target.files![0]);
    }
    const upload = () => {
        setIsLoading(true);
        uploadPhoto(img)
            .then((res) => {
                setImgSrc(res?.data.data.display_url)
                setIsLoading(false);})
            .catch(err => console.log(err))
    }
    return (<>
        <NavbarAdmin />
        <Box sx={{ flexGrow: 1 }}>
            <Grid container className="myGrid" justifyContent="center">
                <Grid item lg={4} sm={8} xs={12} className='form-wrapper'>
                    <h3>Add Category</h3>
                    <Formik
                        initialValues={initialValues}
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
                                <label htmlFor="contained-button-file">upload here</label>
                                <input accept="image/*" id="contained-button-file" multiple type="file" onChange={handleFileChange} />
                                <Button variant="contained" component="span" onClick={upload}>
                                    Upload photo
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
    </>)
}  