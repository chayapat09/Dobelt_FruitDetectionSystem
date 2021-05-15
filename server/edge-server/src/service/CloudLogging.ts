import axios from 'axios';
import FormData from 'form-data';
const cloud_server_url = 'http://161.200.199.2:5002';

export const cloudLoggingService = async (imageFile : Express.Multer.File , predictionResult : number , model_id : string) => {
    
    const response1 = await axios.post(cloud_server_url + '/edge/detection' , {model_id : model_id , result :predictionResult});
    const log_id = response1.data.log_id;

    const formData = new FormData();
    formData.append('image' , imageFile.buffer  , {filename : imageFile.originalname , contentType: imageFile.mimetype} );
    formData.append('log_id' , log_id);
    formData.submit(cloud_server_url + '/api/gallery/upload');
    // const response2 = await axios.post(cloud_server_url + '/api/gallery/upload')
}


// import React from 'react'
// import axios, { post } from 'axios';

// class SimpleReactFileUpload extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state ={
//       file:null
//     }
//     this.onFormSubmit = this.onFormSubmit.bind(this)
//     this.onChange = this.onChange.bind(this)
//     this.fileUpload = this.fileUpload.bind(this)
//   }

//   onFormSubmit(e){
//     e.preventDefault() // Stop form submit
//     this.fileUpload(this.state.file).then((response)=>{
//       console.log(response.data);
//     })
//   }

//   onChange(e) {
//     this.setState({file:e.target.files[0]})
//   }

//   fileUpload(file){
//     const url = 'http://example.com/file-upload';
//     const formData = new FormData();
//     formData.append('file',file)
//     const config = {
//         headers: {
//             'content-type': 'multipart/form-data'
//         }
//     }
//     return  post(url, formData,config)
//   }

//   render() {
//     return (
//       <form onSubmit={this.onFormSubmit}>
//         <h1>File Upload</h1>
//         <input type="file" onChange={this.onChange} />
//         <button type="submit">Upload</button>
//       </form>
//    )
//   }
// }



// export default SimpleReactFileUpload