import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './CustomSelect.css';

const CustomSelect = ({
  options,
  onChange,
  multiple = false,
  asyncLoad = false,
  loadOptions = null,
  placeholder = 'Select...',
  searchEnabled = false,
  customRenderOption = null,
  customDropdownPosition = null,
}) => {
  const [selectedValues, setSelectedValues] = useState(multiple ? [] : null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (asyncLoad && loadOptions) {
      loadOptions().then(fetchedOptions => {
        setFilteredOptions(fetchedOptions);
      });
    } else {
      setFilteredOptions(options);
    }
  }, [asyncLoad, loadOptions, options]);

  const handleSelect = option => {
    if (multiple) {
      setSelectedValues(prev => {
        const newValues = prev.includes(option)
          ? prev.filter(val => val !== option)
          : [...prev, option];
        onChange(newValues);
        return newValues;
      });
    } else {
      setSelectedValues(option);
      onChange(option);
      setShowDropdown(false);
    }
  };

  const handleRemove = option => {
    if (multiple) {
      setSelectedValues(prev => {
        const newValues = prev.filter(val => val !== option);
        onChange(newValues);
        return newValues;
      });
    } else {
      setSelectedValues(null);
      onChange(null);
    }
  };

  const handleSearch = event => {
    setSearchTerm(event.target.value);
    setFilteredOptions(options.filter(option =>
      option.toLowerCase().includes(event.target.value.toLowerCase())
    ));
  };

  return (
    <div className="select-container">
      <div
        className="select"
        onClick={() => setShowDropdown(prev => !prev)}
      >
        {multiple
          ? selectedValues.length > 0
            ? selectedValues.map(value => (
                <span key={value} className="selected-item">
                  {value}
                  <button
                    className="remove-selected-item-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(value);
                    }}
                  >
                    &times;
                  </button>
                </span>
              ))
            : placeholder
          : selectedValues !== null
            ? <span className="selected-item">
                {selectedValues}
                <button
                  className="remove-selected-item-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(selectedValues);
                  }}
                >
                  &times;
                </button>
              </span>
            : placeholder}
      </div>
      {showDropdown && (
        <div
          className="dropdown"
          style={customDropdownPosition}
        >
          {searchEnabled && (
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search..."
              className="search-input"
            />
          )}
          {filteredOptions.map(option => (
            <div
              key={option}
              className={`dropdown-option ${multiple && selectedValues.includes(option) ? 'selected' : ''}`}
              onClick={() => handleSelect(option)}
            >
              {customRenderOption ? customRenderOption(option) : option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

CustomSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
  asyncLoad: PropTypes.bool,
  loadOptions: PropTypes.func,
  placeholder: PropTypes.string,
  searchEnabled: PropTypes.bool,
  customRenderOption: PropTypes.func,
  customDropdownPosition: PropTypes.object,
};

export default CustomSelect;
