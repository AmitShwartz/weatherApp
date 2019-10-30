import React from 'react';

const footer ={
  position:'fixed',
  bottom: 0,
  height:'40px',
  width: '100%',
  padding: '10px 0px',
  backgroundColor: 'black',
  color: '#fff',
  fontWeight: 700,
  textAlign: 'center',
  zIndex:100
}




const creditText = ' כל הזכויות שמורות לעמית שוורץ';
export default () => (
    <footer style={footer}>
        <span>&#9400;{' '}{creditText}</span>
    </footer>
)