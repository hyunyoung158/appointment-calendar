import React, { useState, useEffect } from 'react';
import './App.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'
import { db } from './firebase'; // Firebase 설정 import
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';

function App() {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [selectedColor, setSelectedColor] = useState('red');
  const colors = ['red', 'orange', '#E3C500', 'green', 'blue', 'purple', '#D47B95'];

  // Firestore에서 이벤트 불러오기
  useEffect(() => {
    const fetchEvents = async () => {
      const eventsCollection = collection(db, 'events');
      const eventSnapshot = await getDocs(eventsCollection);
      const eventList = eventSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCurrentEvents(eventList);
    };

    fetchEvents();
  }, []);

  // 새 이벤트 추가
  async function handleDateSelect(selectInfo) {
    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      try {
        const newEvent = {
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay,
          backgroundColor: selectedColor,
          borderColor: selectedColor
        };
        const docRef = await addDoc(collection(db, "events"), newEvent);
        setCurrentEvents([...currentEvents, { id: docRef.id, ...newEvent }]);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  }

  // 이벤트 삭제
  async function handleEventClick(clickInfo) {
    if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      try {
        await deleteDoc(doc(db, "events", clickInfo.event.id));
        setCurrentEvents(currentEvents.filter(event => event.id !== clickInfo.event.id));
      } catch (e) {
        console.error("Error removing document: ", e);
      }
    }
  }

  return (
    <div className="App">
      <div>
        <h3>빨강:현/주황:밍/노랑:용/초록:모/파랑:줜/보라:쪼/분홍:졔</h3>
        <p>꾹~~~ 눌렀다 떼거나 드래그하고 떼면 일정 등록되고, 등록된 일정을 누르면 삭제 가능, 등록된 일정을 꾹 누르고 이동시 이동 가능</p>
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
          events={currentEvents} // Firestore에서 가져온 이벤트로 설정
          select={handleDateSelect}
          eventClick={handleEventClick} // 이벤트 클릭 핸들러 추가
          aspectRatio={0.5} // 가로세로 칸 비율
        />
      </div>
    </div>
  );
}

export default App;
