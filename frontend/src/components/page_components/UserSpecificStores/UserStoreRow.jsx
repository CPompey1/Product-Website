import React from 'react'
import './UserStoreRow.css'
import SubTitleHeaderCustom from '../global_components/stores/SubTitle'
import { useNavigate } from 'react-router-dom'
export default function UserStoreRow({id, logoSrc, title, description, location}) {
  const navigate = useNavigate();
  const handleClick = () => {
    // TODO: Redirect to store page
    navigate('/edit-product-list/' + id);
  }

  return (
    <div className='store-list-item'>

      <div onClick={handleClick} className='store-list-item-image'>
        {logoSrc == undefined ? 
            <SubTitleHeaderCustom title={title} fontSize={'30px'} color={'black'}/>
        : 
            <img src={logoSrc} max-width={300} height={300} alt='store image'/>
        }
      </div>
      <p> {description} </p>
      <p> {location} </p>
    </div>
  )
}
