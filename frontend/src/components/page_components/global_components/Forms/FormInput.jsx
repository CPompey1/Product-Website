import React from 'react'

export default function FormInput({ name, placeholder, type, onChangeF, required, value }){
    return (

      <>
        {/* <BuilderComponent model="test-builder-page"></BuilderComponent> */}
        <input
          id={name}
          name={name}
          placeholder={placeholder}
          type={type}
          value={value}
          className={'formInput'}
          required={required}
          onChange={onChangeF}
        />
      </>
    );
};

const InputLabel = ({name}) => {
  return (
    <h2 className={'formLabel'}>{name}</h2>
  )
}

export { InputLabel }
