import React from 'react'
import './index.css'
import herosection from './herosection.webp'
import FoodCard from '../FoodCard'
const Index = () => {
  return (
    <div>
      <div className='herosection'>
        <img style={{ width: "100%", height: "56vh" }} src={herosection} alt="" />
      </div>
      <div className='foodCard'>
        <FoodCard />
      </div>
    </div>
  )
}

export default Index
