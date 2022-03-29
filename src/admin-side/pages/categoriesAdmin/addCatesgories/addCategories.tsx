import { Box, Grid, TextField, Button } from "@mui/material";
import './addCategories.css';
import React, { ChangeEvent } from "react";
import * as yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { NavbarAdmin } from "../../../components/navbar/navbar";
import uploadPhoto from "../../../services/uploadPhoto";
import { callInstance } from "../../../network/connection";
import { createCategory } from "../../../services/apiCall/categories";


interface props {

}
export const AddCategoriesAdmin: React.FC<props> = () => {
    const [img, setImg] = React.useState<File | null>(null);
    const [imgSrc, setImgSrc] = React.useState<string>("");
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
            console.log(vals);
            console.log(imgSrc);
            const createdCat = await createCategory({
                name: vals.name,
                description: vals.description,
                photourl: imgSrc
            })
            console.log(createdCat);
        } catch (err) {
            console.log(err);
        }
        /*callInstance.post('/categories' , {
            name : vals.name,
            description : vals.description,
            photoUrl : imgSrc
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))*/

    }
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        setImg(e.target.files![0]);
    }
    const upload = () => {
        console.log(img);
        uploadPhoto(img)
            .then((res) => setImgSrc(res?.data.data.display_url))
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
    </>)
}  