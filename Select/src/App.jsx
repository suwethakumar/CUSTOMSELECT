import React from 'react';
import CustomSelect from './CustomSelect';

const App = () => {
  const handleSelectChange = (selectedOption) => {
    console.log('Selected option:', selectedOption);
  };

  return (
    <div>
      <h1>Custom Select Component</h1>
      <CustomSelect
        options={['First', 'Second', 'Third', 'Fourth']}
        onChange={handleSelectChange}
        multiple={true} // Set to true if you want to select multiple options
        placeholder="Select an option..."
      />
    </div>
  );
};

export default App;
