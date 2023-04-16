function generarCalendario() {
  const fecha = new Date();
  fecha.setHours(fecha.getHours()-3) // Convertimos la fecha a la zona horaria de Perú/Argentina/Chile
  const anio = fecha.getFullYear();
  const mes = fecha.getMonth();
  const dia = fecha.getDate();

  const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const mesesAbreviados = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  
  const calendario = [];
  
  // Agregamos los días del mes al calendario a partir del día actual y hasta 2 semanas después
  for (let i = dia; i <= dia + 13; i++) {
    const fechaActual = new Date(anio, mes, i);
    const diaSemana = diasSemana[fechaActual.getDay()];
    if (fechaActual.getMonth() === mes) {
      calendario.push({ diaSemana, mes: mesesAbreviados[mes], dia: i });
    } else {
      break; // Si el día ya no pertenece al mes actual, salimos del bucle
    }
  }
  
  // Agregamos los días de la semana del mes actual al principio del array
  for (let i = diasSemana.indexOf(diasSemana[fecha.getDay()]); i < diasSemana.length; i++) {
    calendario.unshift({ diaSemana: diasSemana[i], mes: mesesAbreviados[mes], dia: '' });
  }
  
  // Agregamos los días de la semana del mes anterior al principio del array
  const fechaMesAnterior = new Date(anio, mes, 0);
  for (let i = diasSemana.indexOf(diasSemana[fechaMesAnterior.getDay()]); i >= 0; i--) {
    calendario.unshift({ diaSemana: diasSemana[i], mes: mesesAbreviados[mes - 1], dia: '' });
  }
  
  return calendario.slice(diasSemana.indexOf(diasSemana[fecha.getDay()]));
}



export  default generarCalendario