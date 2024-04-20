import { Dropdown } from 'primereact/dropdown';
import { useState } from 'react';

const colorTemplate = ({ value }: { label: string; value: string }) => {
  return (
    <>
      <div
        style={{
          backgroundColor: value,
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          display: 'inline-block',
          margin: '5px'
        }}
      ></div>
      <span>{value}</span>
    </>
  );
};
export const ColorSelector = ({ colors }: { colors: string[] }) => {
  const options = colors.map((color) => {
    return {
      label: color,
      value: color
    };
  });
  const [selectedColor, setSelectedColor] = useState({
    label: 'white',
    value: 'white'
  });

  return (
    <>
      <Dropdown
        value={selectedColor.value}
        options={options}
        optionLabel="label"
        onChange={(e) => setSelectedColor(e.value)}
        itemTemplate={colorTemplate}
        placeholder="Seleccione Color"
      />
      <div
        style={{
          backgroundColor: selectedColor.value ?? 'white',
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          display: 'inline-block',
          margin: '5px'
        }}
      ></div>
    </>
  );
};
