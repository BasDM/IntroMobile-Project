import { useState } from "react";
import { Button, View, Platform, Text } from "react-native";
import DateTimePicker, {
	DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

type Mode = "time" | "date" | "datetime";

export default function DatePicker() {
	const [date, setDate] = useState(new Date());
	const [show, setShow] = useState(false);
	const [mode, setMode] = useState<Mode>("date");

	const onChange = (e: DateTimePickerEvent, selectedDate?: Date) => {
		if (selectedDate) {
			setDate(selectedDate);
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
					value={date.toISOString().slice(0, 16)}
					onChange={(e) => setDate(new Date(e.target.value))}
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
							value={date}
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
