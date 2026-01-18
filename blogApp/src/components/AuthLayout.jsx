import React, {use, useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({children, authentication= true  }){
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector((state) => state.auth);

    useEffect(() => {
        if(loader){
            if(authentication){
                if(!authStatus.user){
                    navigate('/login');
                }
            } else {
                if(authStatus.user){
                    navigate('/');
                }
            }
            setLoader(false);
        }
    }, [authStatus, navigate, authentication, loader]);

  return loader ? <h1>Loading... </h1> : (  
    <>
      {children}
    </>
  ) 
}

