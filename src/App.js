  import React,{ useEffect,useState } from 'react';
  import axios from "axios";
  import {ACCESS_KEY} from "./config/constant"
export const App = () => {
  const [imageList , setImageList]= useState([]);
  const [tempImageList , setTempImageList] = useState([]);
  const [isLoading , setIsLoading] = useState(true);

  useEffect(()=>{
    axios.get(`https://api.unsplash.com/photos/?client_id=${ACCESS_KEY}&per_page=30`)
    .then((response) => {
      setImageList(response.data);
      setTempImageList(response.data);
      setIsLoading(false);
    })
    .catch((error) => console.error('Error fetching data:', error));
  },[])

  const searchImage = (query)=> {
    if(query === ""){
      setImageList(tempImageList)
    }else{
      const filteredImage = imageList.filter(image => {
        return image.alt_description.includes(query)
      })
      setImageList(filteredImage);
    }
  }

  return (
    <div className='bg-light'>
      <h4 className='text-center text-muted py-4 fw-bold'>Image Gallery</h4>
        <div className='container d-flex justify-content-center'>
          <input className='form-control' placeholder='Search Images......'
            onChange={(e)=> searchImage(e.target.value)}/>
        </div>
       <div className='py-4 mt-3 container d-flex flex-wrap justify-content-center gap-3'>
        {imageList.length > 0 ?imageList.map((image)=>{
          return(
        <div key={image.id} className='card shadow-lg border-0'>
          <div className='img-thumbnail'>
            <img src={image.urls.small} alt={image.alt_description}></img>
          </div>
          <div className='card-body'>
            <p className='text-center fst-italic text-muted'>{image.alt_description}</p>
          </div>
        </div>
          )
        }):isLoading?<h3>Loading...</h3>:<h3>No Result</h3>}
      </div>
    </div>
  )
}