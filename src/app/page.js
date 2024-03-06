'use client'


import axios from 'axios';
import { useEffect, useState, useRef } from 'react';

import ClipLoader from "react-spinners/ClipLoader";


const Home = () => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(false);
  const myRef = useRef([])

  useEffect(() => {
    const fetchHouses = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://pircelapi.onrender.com/houses'); 
        const processedHouses = response.data.map(house => ({
          ...house,//return the properties of each house object
          houseColours: house.houseColours.split('and').map(color => color.trim()) //and modify the houseColours
        }));
        setHouses(processedHouses);
        
      } catch (error) {
        console.error('Error fetching houses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHouses();  
  }, []);

  useEffect(()=>{
   myRef.current.forEach( ref => 
   {
   if (ref.style.background == ""){ref.style.background = 'linear-gradient(to right, white, black)'}
  });
  },[houses]);


  return (
    <div style={{ fontFamily: 'Verdana'}}>
      {loading ? <ClipLoader loading={loading} size={150} /> :
        houses.map((house, index) => (
          <div key={index} style={{width: '350px',height:'100px',  border:'#ededed solid 1px',
          padding:'5px 10px', borderRadius:'5px' , margin:'20px 20px',
        boxShadow:'0px 2px 5px #ededed'}}>
            <div style={{display:'flex', justifyContent:'space-between'}}>
              <h2 style={{fontWeight:'bold', fontSize:'18px'}}>{house.name}</h2>
              <p style={{fontSize:'14px'}}>{house.animal}</p>
            </div>
            <div id='bg' ref={element => myRef.current[index] = element} style={{margin:'10px 0px',
              background: `linear-gradient(to right, ${house.houseColours.join(', ')})`
            }}></div>
            <p style={{fontSize:'12px'}}>Founder: <span style={{fontWeight:'bold'}}>{house.founder}</span></p>
          </div>
        ))
      }
    </div>
  );
};

export default Home;
