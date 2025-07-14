
interface  DatePickerProps{
    setSelectedDate: (d: string)=> string
    selectedDate: string

}

export default function DatePicker({ selectedDate,  setSelectedDate }: DatePickerProps) {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isoDate = e.target.value;
    setSelectedDate(isoDate);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white shadow-xl rounded-2xl w-fit mb-5">
      <input
        type="date"
        defaultValue={selectedDate}
        onChange={handleChange}
        className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
