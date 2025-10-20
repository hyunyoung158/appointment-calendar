import logo from './logo.svg';
import './App.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './event-utils'

function handleDateSelect(selectInfo) {
  let title = prompt('Please enter a new title for your event')
  let calendarApi = selectInfo.view.calendar

  calendarApi.unselect() // clear date selection

  if (title) {
    calendarApi.addEvent({
      id: createEventId(),
      title,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay
    })
  }
}

function App() {
  return (
    <div className="App">
      <div>
        <FullCalendar
          plugins={[ dayGridPlugin, interactionPlugin ]}
          initialView='dayGridMonth'
          editable={true}
          selectable={true}
          selectMirror={true}
          select={handleDateSelect}
        />
      </div>
    </div>
  );
}

export default App;
