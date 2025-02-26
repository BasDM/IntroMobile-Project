import { useState } from "react";
import { Button, View, Platform } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";

type Mode = "time" | "date" | "datetime";

interface DatePickerProps {
    selectedDate: Date;
    onDateChange: (date: Date) => void;
}

export default function DatePicker({ selectedDate, onDateChange }: DatePickerProps) {
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState<Mode>("date");

    const onChange = (e: DateTimePickerEvent, selectedDate?: Date) => {
        if (selectedDate) {
            onDateChange(selectedDate); // Pass selected date to add form to add it to a sighting
            setShow(false);
        }
    };

    const showMode = (modeToShow: Mode) => {
        setShow(true);
        setMode(modeToShow);
    };

    return (
		//If platform is web you need to use native date-time input
        <View className="border border-gray-300 bg-white rounded p-2">
            {Platform.OS === "web" ? (
                <input
                    type="datetime-local"
                    value={selectedDate.toISOString().slice(0, 16)}
                    onChange={(e) => onDateChange(new Date(e.target.value))}
                />
            ) 
			: 
			//If platform is another than web, you can use DateTimePicker
			(
                <>
                    <Button title="Select Date" onPress={() => showMode("date")} />
                    <Button title="Select Time" onPress={() => showMode("time")} />
                    {show && (
                        <DateTimePicker
                            value={selectedDate}
                            mode={mode === "datetime" ? "date" : mode}
                            is24Hour={true}
                            onChange={onChange}
                        />
                    )}
                </>
            )}
        </View>
    );
}
