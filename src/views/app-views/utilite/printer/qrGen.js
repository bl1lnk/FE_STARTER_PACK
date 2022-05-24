import React from 'react'
import QRCode from 'qrcode'

export default function qrGen() {

   const generateQr = () =>{
    let str = 'My first QR!'

   }
    
  return (
   <>
    <div> <canvas id="canvas" align="center" /></div>
    <button onClick={generateQr}>
    Generate QR!
</button>
</>
  )
}
