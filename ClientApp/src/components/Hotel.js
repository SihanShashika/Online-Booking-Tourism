import React, {useState,useEffect} from 'react'

const defaultImageSrc ='/img/download.JPG'

const initialFieldvalues ={
    hotelId:0,
    hotelName:'',
    place:'',
    acNoneac:'',
    price:null,
    imageName:'',
    imageSrc:defaultImageSrc,
    imageFile:null
}



export default function Hotel(props) {

    
    const { addOrEdit, recordForEdit } = props

    const [values,setValues]=useState(initialFieldvalues)
    const [errors,setErrors]=useState({})
  
    useEffect(() => {
        if (recordForEdit != null)
            setValues(recordForEdit);
    }, [recordForEdit])

  
    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
    })
   } 

   const showPreview = e =>{
       if(e.target.files && e.target.files[0]){
           let imageFile = e.target.files[0];
           const reader = new FileReader();
           reader.onload = x=>{
            setValues({
                   ...values,
                   imageFile,
                   imageSrc: x.target.result
               })
           }
           reader.readAsDataURL(imageFile)
       }

   
   else{
    setValues({
        ...values,
        imageFile: null,
        imageSrc: defaultImageSrc
      })
    }
}
const validate =()=>{
    let temp={}
    temp.hotelName = values.hotelName ==""?false:true;
    temp.imageSrc =values.imageSrc ==defaultImageSrc?false:true;
    setErrors(temp)
    return Object.values(temp).every(x => x==true)

}

const resetForm = ()=>{
    setValues(initialFieldvalues)
    document.getElementById('image-uploader').value =null;
     setErrors({})

}

const handleFormSubmit = e =>{
    e.preventDefault()
    if(validate){
          const formData = new FormData()
          formData.append('hotelId',values.hotelId)
          formData.append('hotelName',values.hotelName)
          formData.append('place',values.place)
          formData.append('acNoneac',values.acNoneac)
          formData.append('price',values.price)
          formData.append('imageName',values.imageName)
          formData.append('imageFile',values.imageFile)
          addOrEdit(formData, resetForm)

    }
}

const applyErrorClass = field =>((field in errors && errors[field]==false)?' invalid-field':'')
  
    return (
 <>
        <div className="container text-center">
            <p className="lead">Hotel</p>
            
        </div>
         
       <form autoComplete="off" noValidate onSubmit={handleFormSubmit}>
            <div className="card">
                <img src={values.imageSrc} className="card-img-top" />
                  <div className="card-body">
                      <div className="form-group">
                          <input type="file" accept="image/*" className={"form-control-file"+applyErrorClass('imageSrc')} 
                            onChange={showPreview} id="image-uploader" />
                      </div>

                         <div className="form-group">
                                <input className={"form-control"+applyErrorClass('hotelName')} placeholder="Hotel Name" name="hotelName"
                                     value={values.hotelName}
                                     onChange ={handleInputChange} />
                         </div>  
                         <div className="form-group">
                                <input className={"form-control"+applyErrorClass('place')} placeholder="Place" name="place"
                                     value={values.place} 
                                     onChange ={handleInputChange}/>
                         </div> 
                         <div className="form-group">
                                <input className={"form-control"+applyErrorClass('acNoneac')} placeholder="Ac Noneac" name="acNoneac"
                                     value={values.acNoneac} 
                                     onChange ={handleInputChange}/>
                         </div>
                         <div className="form-group">
                                <input className={"form-control"+applyErrorClass('price')} placeholder="Price For A Day" name="price"
                                     value={values.price} 
                                     onChange ={handleInputChange}/>
                         </div>    
                         <div className="form-group text-center">
                              <button type="submit" className="btn btn-light">submit</button>    
                         </div>             
                    </div>    
             </div>

       </form>
</>

    )
}
