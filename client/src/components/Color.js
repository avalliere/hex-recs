const Color = ({ selectedColor, setSelectedColor, colorHex }) => {
  const isSelected = selectedColor === colorHex;

  return (
    <div
      className="color-square"
      style={{
        backgroundColor: colorHex,
        boxShadow: isSelected ? 'white 0px 0px 9px 2px' : '',
      }}
      onClick={() => setSelectedColor(colorHex)}
    ></div>
  );
};
export default Color;
