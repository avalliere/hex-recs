const Color = ({selectedColor, setSelectedColor, colorHex}) => {
  const isSelected = selectedColor === colorHex; 

  return (
    <div 
      className='color-square'  
      style={{backgroundColor: colorHex, border: isSelected ? '1px solid red' : ''}} 
      onClick={() => setSelectedColor(colorHex)}>
    </div>
  )
}
export default Color;