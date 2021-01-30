import React, { useState } from 'react'
import SingleColor from './SingleColor'
import tinycolor from 'tinycolor2'

import Values from 'values.js'
import rgbToHex from './utils'

function App() {
  const [color,setColor] = useState('');
  const [error,setError] = useState(false);
  const [light,setLight] = useState('false');
  const [list,setList] = useState([]);

  const handleSubmit= (e)=>{
    e.preventDefault();
    try{
      let colors=new Values(color).all(10);
      const bcg=colors[10].rgb.join(',');
      setLight(tinycolor(`rgb(${bcg})`).isLight());

      document.body.style.backgroundColor=`rgb(${bcg})`;
      setList(colors);
    }catch(err){
      console.log(err);
      setError(true);
    }
  }
  return (
    <>
    <section className="container">
      <h3 style={{color:`${light ? 'black' : 'white'}`}}>Color Palette Generator</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" value={color} onChange={(e) => setColor(e.target.value)} placeholder="#666" className={`${error?'error':null}`}/>
        <button type="submit" className="btn">Generate</button>
      </form>
    </section>
    <section className="colors">
      {list.map((color,index)=>{
        return <SingleColor key={index} {...color} index={index}/>
      })}
    </section>
    </>
  );
}

export default App
