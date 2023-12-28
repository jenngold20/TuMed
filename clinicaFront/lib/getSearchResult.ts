export async function getSpecialitiesResults() {
 
  const response = await fetch("https://api.tumed.com.ar/specialities")
  return (
    response.json()
  )
}
export async function getDoctorsResults() {
 
  const response = await fetch("https://api.tumed.com.ar/doctors/" )
  return (
    response.json()
  )
}
export async function getDoctorsResultsBySpeciality(speciliesId: string) {

                                                        

  const response = await fetch(`https://api.tumed.com.ar/specialities/specialities?categoriaIds=${speciliesId}`)
  return (
    response.json()
  )
}

/*
export async function getDoctorAppointments(doctorId: number, date: string) {

  //console.log(`Fecha ${date}`)
  //const response = await fetch(`https://api.tumed.com.ar/doctors/${doctorId}/appointments?date=${date}`)
  const response = await fetch(`https://api.tumed.com.ar/doctors/1/appointments?date=2023-09-06`)
  console.log("getDoctorAppointments")
  console.log(response)
  const mockResponse = ["08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30"]
  console.log(`MockResponse ${mockResponse}`)
  return (
    response.json()
    //mockResponse

    
  )
}
*/
export async function fetchAppointments(id: string, date: string) {
  try {
      const response = await fetch(`https://api.tumed.com.ar/doctors/${id}/appointments?date=${date}`);
      if (response.ok) {
          const data = await response.json();
          console.log(`Soy la data en el fetch ${data}`);
          return data;
      } else {
          console.error("Error en la solicitud HTTP:", response.status, response.statusText);
      }
  } catch (error) {
      console.error("Error al obtener los datos:", error);
  }
}
// Llamar a la función para obtener y mostrar las citas médicas
export async function fetchDoctorsByAppointments(startDate: string, endDate: string) {
  try {
      const response = await fetch(`https://api.tumed.com.ar/doctors/search?endDate=${endDate}&startDate=${startDate}`);
      if (response.ok) {
          const data = await response.json();
          console.log(`Soy la data en el fetch dba ${data}`);
          return data;
      } else {
          console.error("Error en la solicitud HTTP:", response.status, response.statusText);
      }
  } catch (error) {
      console.error("Error al obtener los datos:", error);
  }
}

