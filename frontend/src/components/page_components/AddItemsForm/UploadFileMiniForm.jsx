import React from 'react'
import Button_b from '../global_components/Button_b/Button_b';

function UploadFileMiniForm({svcUrl}) {
    const [inputs, setInputs] = useState({});
    const [imgInputs, setImgInputs] = useState({
        Description: '',
        image: undefined,
        });

    const handleImgChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
          setImgInputs((prev) => ({
            ...prev,
            [name]: files[0],
          }));
        } else {
          setImgInputs((prev) => ({
            ...prev,
            [name]: value,
          }));
        }
      };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData()
        formData.append("image",imgInputs.image)
        const fetchResult = await fetch(svcUrl, {
            method: "POST",
            body: formData,
        });
        const jsonResult = await fetchResult.json()
        console.log(jsonResult)
    }

  return (
    <>
        <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
            <input type="file" name = "image" value = {inputs.image} onChange={handleImgChange}/>
            <Button_b type="submit">Upload</Button_b>
        </form>
    </>
  )
}

export default UploadFileMiniForm