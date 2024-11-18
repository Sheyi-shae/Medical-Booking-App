'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer, Event as BigCalendarEvent } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { AppointmentProps } from '@/lib/types';

const localizer = momentLocalizer(moment);

interface MyEvent extends BigCalendarEvent {
  title: string;
  start: Date; 
  end: Date;   
}

const PatientCalendar = ({ appointments }: AppointmentProps) => {
  const [events, setEvents] = useState<MyEvent[]>([]);

  // Transform appointments into calendar events
  useEffect(() => {
    const formattedEvents = appointments.map(appointment => {
      const appointmentDate = new Date(appointment.appointmentDate);
      const appointmentTime = moment(appointment.appointmentTime, 'h:mm A');
      const start = moment(appointmentDate).set({
        hour: appointmentTime.hour(),
        minute: appointmentTime.minute(),
      }).toDate();

      const end = moment(start).add(1, 'hour').toDate(); // Assuming events are 1 hour long

      return {
        title: `${appointment.reason}`,
        start,
        end,
      } as MyEvent;
    });
    setEvents(formattedEvents);
  }, [appointments]);

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    const title = window.prompt('New Event name');
    if (title) {
      const newEvent: MyEvent = { start, end, title };
      setEvents([...events, newEvent]);
    }
  };

  const handleSelectEvent = (event: MyEvent) => {
    const confirmDelete = window.confirm(`Delete event: ${event.title}?`);
    if (confirmDelete) {
      setEvents(events.filter(e => e.title !== event.title || e.start !== event.start));
    }
  };

  return (
    <div>
      
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 400, margin: '10px' }}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
      />
     
    </div>
  );
};

export default PatientCalendar;
