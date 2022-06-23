import React from 'react'
import styled from 'styled-components'

var Wrapper = styled.div`
  position:fixed;
  top:0;
  right:0;
  bottom:0;
  left:0;
  display:flex;
  justify-content:center;
  z-index:-1
`

function Preloader({error}){
  return (
  	<Wrapper className="valign-wrapper">
      {!error &&(
        <div className="preloader-wrapper big active">  
        <div className="spinner-layer spinner-blue-only">
          <div className="circle-clipper left">
            <div className="circle"></div>
          </div>
          <div className="gap-patch">
            <div className="circle"></div>
          </div>
          <div className="circle-clipper right">
            <div className="circle"></div>
          </div>
        </div>
        </div>
      )}
      {error && <p>{error.message}</p>}
    </Wrapper>
  )
}

export {Preloader}
