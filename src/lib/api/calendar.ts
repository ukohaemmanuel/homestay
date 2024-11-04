import api from './index';
import { CalendarEvent, CreateEventInput, UpdateEventInput } from '../../types';

export const calendarApi = {
  getEvents: async (start: Date, end: Date) => {
    const { data } = await api.get<CalendarEvent[]>('/calendar/events', {
      params: { start, end },
    });
    return data;
  },

  createEvent: async (input: CreateEventInput) => {
    const { data } = await api.post<CalendarEvent>('/calendar/events', input);
    return data;
  },

  updateEvent: async (id: string, input: UpdateEventInput) => {
    const { data } = await api.patch<CalendarEvent>(`/calendar/events/${id}`, input);
    return data;
  },

  deleteEvent: async (id: string) => {
    await api.delete(`/calendar/events/${id}`);
  },
};