import React, { useEffect } from 'react'
import './Header.css'
import LogRegHeaderLink, { LogoutHeaderLink } from './LogRegHeaderLink'
import { Avatar, ButtonGroup, Grid2 } from '@mui/material'
import validateUser from '../../util/accounts_manager'
import { useState } from 'react'
import { BorderColor, Dehaze, DehazeSharp } from '@mui/icons-material'
import SlidingPanel from 'react-sliding-side-panel'
import { Button, Drawer } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import sideBarButtons from '../../resources/side_bar_buttons.json'  with { type: 'json' }
export default function Header({isWebview}) {

  const [profileImg,setProfileImg] = useState('')
  const [userLoggedIn,setUserLoggedIn] = useState(false)
  const [sideBarState, setSideBarState] = useState(false);
  const [navigationButtons, setNavigationButtons] = useState([])
  const navigate = useNavigate();


  const handleToolbarClick = (event) => {
      setSideBarState(!sideBarState)
      // setOpenPanel(!openPanel)
      console.log("Toolbar clicked")
  }

  
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const loggedIn = await validateUser()
      setUserLoggedIn(loggedIn)
      fetchData()
    }
    checkUserLoggedIn()
  },[])



  const fetchData = async () => {
    if (userLoggedIn) {
      // TODO: Endpoint needs to be implmeneted
      fetchResult = await fetch ("/get_profile_pic", {
        method: 'POST'
      })

      if (fetchResult.ok){
        setProfileImg(await fetchResult.json()['img'])
      }
    }  
  }
  
  return (
    <>
      {/* {isMobile ? (<></>) : */}
      <header className="main-header">
          <section className="header-content">
            
            {userLoggedIn ? (<></>):(<LogRegHeaderLink isWebview={isWebview}/>)}
            
            {userLoggedIn ? 
              <> 
                <a className="logout-link">
                   <LogoutHeaderLink/> 
                </a>
                <Avatar sx={{cursor: 'pointer'}} onClick={handleToolbarClick} />
              </>
            :<DehazeSharp sx={{ color: 'white', cursor: 'pointer' }} onClick={handleToolbarClick} />}
            
          </section>

           <React.Fragment >
            
              <Drawer
              anchor={'right'}
              open={sideBarState}
              onClose={handleToolbarClick}
              
              >
                <div className="side-bar-items">
                  <Avatar sx={{   width: 56, height: 56, cursor: 'pointer', margin: "5% 0% 5% 0%"}} onClick={() => {navigate('/')}} />
                  
                  <ButtonGroup
                    orientation="vertical"
                    aria-label="Vertical button group"
                    variant="contained"
                    sx={{
                      borderColor: '#00000', // Set the border color
                      ".MuiButtonGroup-grouped:not(:last-of-type)": {
                         borderColor: "black",
                      }
                    }}
                  >
                    {sideBarButtons.map((button, index) => (
                      <Button 
                        key={index}
                        color='black' 
                        onClick={() => {navigate((isWebview ? "/m" : "") + button.path)}}
                        sx={{
                          backgroundColor: 'black', // Set the background color
                          color: 'white', // Set the text color
                          borderColor: 'black',
                          '&:hover': {
                            backgroundColor: 'grey', // Set the hover background color
                          },
                        }}>
                          {button.name}
                      </Button>
                    ))}
                    <Button 
                    color='black' 
                    onClick={() => {setSideBarState(!sideBarState)}}
                    sx={{
                      backgroundColor: 'black', // Set the background color
                      color: 'white', // Set the text color
                      borderColor: 'black',
                      '&:hover': {
                        backgroundColor: 'grey', // Set the hover background color
                      },
                    }}>
                      Close
                  </Button>
                  </ButtonGroup>

                </div>
          
              </Drawer>
              
          </React.Fragment>
      </header>
      
    </>
  )
}
