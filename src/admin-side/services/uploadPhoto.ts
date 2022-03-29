import uploadiImgInstance from "../network/imgupload";

const uploadPhoto = async (img: File | null) => {
    try {
        const formData = new FormData();
        formData.append('image', img ? img : "");
        const photoUpload = await uploadiImgInstance.post('',formData);
        return photoUpload;
    } catch (err) {
        console.log(err)
    }
}

export default uploadPhoto; 