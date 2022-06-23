import React from 'react'
import styled from 'styled-components'

var Nav = styled.nav`
  z-index: 0;
`

function Search(){
  return (
    <Nav>
       <div className="nav-wrapper ">
        <form>
          <div className="input-field">
            <input 
              id="search" 
              type="search" 
              placeholder="search"
            />
          </div>
        </form>
      </div>
    </Nav>
  )
}

export {Search}