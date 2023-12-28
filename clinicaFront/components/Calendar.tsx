import React, { useEffect, useState } from 'react';
import { es } from 'date-fns/locale';
import { add, differenceInCalendarDays, format } from 'date-fns';
import { DayPicker, Row, RowProps } from 'react-day-picker';
import { addMonths, isSameMonth } from 'date-fns';
import 'react-day-picker/dist/style.css';
import { fetchAppointments } from '@/lib/getSearchResult';

type Props = {
  daySelected: (value: boolean)=>void;
  setAppointments: (value: string[])=>void;
  doctorIdFromParams: string;
};
const css = `
  .my-selected:not([disabled]) { 
    font-weight: bold; 
    border: 2px solid currentColor;
  }
  .my-selected:hover:not([disabled]) { 
    border-color: blue;
    color: blue;
  }
  .my-today { 
    font-weight: bold;
    font-size: 140%; 
    color: red;
  }
  `;
  
  const Calendar = ({daySelected,setAppointments,doctorIdFromParams}: Props) => {
    const today = new Date();
    const nextMonth = addMonths(new Date(), 1);
    const [month, setMonth] = useState<Date>(today);
    const [selected, setSelected] = useState<Date | undefined>(undefined);
    const [footer, setFooter] = useState<JSX.Element>(<p>Por favor seleccione el dia de su consulta.</p>);
    const [freeAppointments, setFreeAppointments] = useState<any[]>([]);
    
    const disabledDays = [
      new Date(2023, 8, 10),
      new Date(2023, 8, 12),
      new Date(2023, 8, 20),
      //{ from: new Date(2023, 8, 25), to: new Date(2023, 9, 1) },
    ];
    
    {/*
      // Crear una función para verificar si una fecha debe estar habilitada o deshabilitada
      function isDateEnabled(date) {
        // Días de la semana: 0 = Domingo, 1 = Lunes, 2 = Martes, ..., 6 = Sábado
        const dayOfWeek = date.getDay();

        // Habilitar solo los lunes (1) y sábados (6)
        return dayOfWeek === 1 || dayOfWeek === 6;
      }

      // Crear un rango de fechas para deshabilitar (por ejemplo, del 1 de enero de 2023 al 31 de diciembre de 2023)
      const startDate = new Date(2023, 0, 1);
      const endDate = new Date(2023, 11, 31);
      const disabledDays = [];

      // Iterar a través de las fechas en el rango y agregar las deshabilitadas
      for (let currentDate = new Date(startDate); currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
        if (!isDateEnabled(currentDate)) {
          disabledDays.push(new Date(currentDate));
        }
      }

      // Ahora `disabledDays` contiene todas las fechas deshabilitadas (todos los días excepto los lunes y sábados)
        

        */
      }
function isPastDate(date: Date) {
  return differenceInCalendarDays(date, add(new Date(), {
    days: 1,
  })) < 0;
}

function OnlyFutureRow(props: RowProps) {
  const isPastRow = props.dates.every(isPastDate);
  if (isPastRow) return <></>;
  return <Row {...props} />;
}

const selectedDayStyle = {
  backgroundColor: '#57B6C6',
  color: '#fff',
}; 
const modifiersStyles = {
  selected: selectedDayStyle,
  today: { backgroundColor: '#f0f0f0' },
};
useEffect(() => {
  if (selected) {
    const formattedDate = format(selected, 'yyyy-MM-dd', { locale: es });
    fetchAppointments(doctorIdFromParams, formattedDate)
    .then((appointments) => {
      console.log(appointments);
      setFreeAppointments(appointments);
      daySelected(true);
      setAppointments(appointments);
      setFooter(<p> Has seleccionado el dia {formattedDate}.</p>);
    })
    .catch((error) => {
      console.error(error);
    });
  } else {
    daySelected(false);
    setAppointments([]);
    setFooter(<p>Por favor seleccione el dia de su consulta.</p>);
  }
}, [selected]);

return (
  <>
    <div className=''></div>
      <div>
        <DayPicker      
        modifiersStyles={modifiersStyles}        
        mode="single"
        locale={es}
        disabled={disabledDays}
        selected={selected}
        onSelect={(e) => setSelected(e)}
        footer={""}
        month={month}
        fromMonth={today}
        toMonth={new Date(2023, 10)}
        onMonthChange={setMonth}
        captionLayout="dropdown-buttons"
        showOutsideDays
        fixedWeeks
        hidden={isPastDate}
        
        />
      </div>
      {/*
      <button disabled={isSameMonth(today, month)} onClick={() => setMonth(today)}>
        Hoy
      </button>
      
      */}
    </>
  );
};

export default Calendar;