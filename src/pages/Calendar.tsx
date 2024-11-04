import React from 'react';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';

const events = [
  {
    id: 1,
    title: 'Equipment Maintenance',
    date: '2024-03-20',
    type: 'maintenance',
  },
  {
    id: 2,
    title: 'Team Meeting',
    date: '2024-03-22',
    type: 'meeting',
  },
  {
    id: 3,
    title: 'Safety Inspection',
    date: '2024-03-25',
    type: 'inspection',
  },
];

export default function Calendar() {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getEventType = (type: string) => {
    switch (type) {
      case 'maintenance':
        return 'bg-blue-100 text-blue-800';
      case 'meeting':
        return 'bg-green-100 text-green-800';
      case 'inspection':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
          <p className="mt-1 text-sm text-gray-500">
            Schedule and manage workshop activities
          </p>
        </div>
        <button className="btn">
          <Plus className="h-5 w-5 mr-2" />
          Add Event
        </button>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="p-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-3 py-1 text-sm bg-brand-100 text-brand-600 rounded-md hover:bg-brand-200"
            >
              Today
            </button>
            <button
              onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="border-t border-gray-200">
          <div className="grid grid-cols-7 gap-px">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div
                key={day}
                className="py-2 text-center text-sm font-medium text-gray-500 bg-gray-50"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-px bg-gray-200">
            {days.map((day, dayIdx) => (
              <div
                key={day.toString()}
                className={`min-h-[120px] bg-white p-2 ${
                  !isSameMonth(day, currentDate)
                    ? 'bg-gray-50 text-gray-400'
                    : 'text-gray-900'
                }`}
              >
                <time
                  dateTime={format(day, 'yyyy-MM-dd')}
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-sm ${
                    isToday(day)
                      ? 'bg-brand-600 text-white'
                      : 'text-gray-900'
                  }`}
                >
                  {format(day, 'd')}
                </time>
                <div className="mt-2 space-y-1">
                  {events
                    .filter((event) => event.date === format(day, 'yyyy-MM-dd'))
                    .map((event) => (
                      <div
                        key={event.id}
                        className={`px-2 py-1 text-xs rounded-md ${getEventType(
                          event.type
                        )}`}
                      >
                        {event.title}
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}