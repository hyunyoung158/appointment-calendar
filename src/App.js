import React, { useState } from 'react';
import './App.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './event-utils'

function App() {
  const [selectedColor, setSelectedColor] = useState('red');
  const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'purple'];

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
        allDay: selectInfo.allDay,
        backgroundColor: selectedColor,
        borderColor: selectedColor
      })
    }
  }

  return (
    <div className="App">
      <div>
        <h3>이벤트 색상 선택:</h3>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
          {colors.map(color => (
            <button
              key={color}
              style={{
                backgroundColor: color,
                width: '30px',
                height: '30px',
                margin: '5px',
                border: selectedColor === color ? '3px solid black' : '1px solid grey',
                cursor: 'pointer'
              }}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </div>
        <FullCalendar
          plugins={[ dayGridPlugin, interactionPlugin ]}
          initialView='dayGridMonth'
          editable={true}
          selectable={true}
          selectMirror={true}
          initialEvents={INITIAL_EVENTS}
          select={handleDateSelect}
        />
      </div>
    </div>
  );
}

export default App;
