import React from 'react'

const SelectBox = ({ options, onChange }) => {
  return (
    <div className="absolute top-0 right-5 mt-5 border-box">
      <label htmlFor="voices" className="mr-4 text-cyan-500 font-bold">Choose Voices</label>
      <select
        id="voices"
        className="p-2 border-solid border-cyan-500 outline-none"
        defaultValue={options[0]?.name}
        onChange={onChange}>
        {options.map(((option, index) => {
          return <option key={index} value={option.name}>{option.name}</option>
        }))}
      </select>
    </div>
  )
}

export default SelectBox