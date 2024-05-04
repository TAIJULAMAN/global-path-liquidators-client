import React, { useState } from 'react';

interface MonthPickerProps {
    onChange: (selectedMonth: Date) => void;
}

const MonthPicker: React.FC<MonthPickerProps> = ({ onChange }) => {
    const [selectedMonth, setSelectedMonth] = useState(new Date());

    const handlePreviousMonth = () => {
        const prevMonth = new Date(selectedMonth);
        prevMonth.setMonth(prevMonth.getMonth() - 1);
        setSelectedMonth(prevMonth);
        onChange(prevMonth);
    };

    const handleNextMonth = () => {
        const nextMonth = new Date(selectedMonth);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        setSelectedMonth(nextMonth);
        onChange(nextMonth);
    };

    const formattedMonth = selectedMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

    return (
        <div>
            <button onClick={handlePreviousMonth}>Previous</button>
            <span>{formattedMonth}</span>
            <button onClick={handleNextMonth}>Next</button>
        </div>
    );
};

export default MonthPicker;