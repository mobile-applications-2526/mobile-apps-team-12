import React from 'react';

const DateTimePicker = ({ value, mode, onChange, testID, ...props }) => {
  return (
    <div 
      data-testid={testID || "date-picker"}
      style={{ padding: '10px', border: '1px solid #ccc', margin: '10px 0' }}
    >
      <div>Mocked DateTimePicker</div>
      <div>Mode: {mode}</div>
      <div>Value: {value?.toLocaleDateString()}</div>
      <button onClick={() => onChange && onChange({ type: 'set' }, new Date())}>
        Change Date
      </button>
    </div>
  );
};

export default DateTimePicker;