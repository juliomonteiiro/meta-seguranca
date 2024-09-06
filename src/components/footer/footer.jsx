import React from 'react'
import './footer.css'
import Maps from '../maps/index'

const Footer = () => {
  return (
   <div className="footer">
          
        <div className="section">
            <div className="sb-section1">
            <h2>Nossa localização:</h2>
                <div className="maps">
                    <Maps/>
                </div>
            </div>
            <div className="sb-section2">
                <h1>Texto</h1>
                <div className="links-container">
                    <div className='links'>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus quis rem explicabo nisi voluptatem qui voluptates ipsum commodi eaque aliquid, quia saepe ab obcaecati voluptatibus quisquam fuga deserunt quo blanditiis!</p>
                    </div>
                    <div className='links'>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias sint nam ab voluptate error illum fugiat ratione, dolore perspiciatis qui aliquam cupiditate sapiente delectus deleniti pariatur obcaecati. Maxime, beatae veniam.</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="section1">
            <p>Copyright 2024</p>
        </div>

   </div>
  )
}

export default Footer