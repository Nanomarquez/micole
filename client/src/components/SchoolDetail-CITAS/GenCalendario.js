function generarCalendario() {
    const fecha = new Date(); // Creamos una instancia de la fecha actual
    const anio = fecha.getFullYear(); // Obtenemos el año actual
    const mes = fecha.getMonth() + 1; // Obtenemos el mes actual
    const dia = fecha.getDate(); // Obtenemos el día actual
    
    const diasEnMes = new Date(anio, mes, 0).getDate(); // Obtenemos la cantidad de días en el mes
    
    const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']; // Array con los días de la semana
    
    const calendario = []; // Array donde almacenaremos el calendario
    
    // Agregamos los días del mes al calendario
    for (let i = 1; i <= diasEnMes; i++) {
      const diaSemana = diasSemana[fecha.getDay()]; // Obtenemos el día de la semana correspondiente a la fecha actual
      if (i === 1) { // Si es el primer día del mes, agregamos los días de la semana anteriores que pertenecen al mes anterior
        for (let j = 0; j < diasSemana.indexOf(diaSemana); j++) {
          calendario.push('');
        }
      }
      calendario.push(i); // Agregamos el día al calendario
      if (i === diasEnMes) { // Si es el último día del mes, agregamos los días de la semana posteriores que pertenecen al mes siguiente
        for (let j = diasSemana.indexOf(diaSemana) + 1; j < 7; j++) {
          calendario.push('');
        }
      }
      fecha.setDate(fecha.getDate() + 1); // Incrementamos la fecha para agregar el siguiente día
    }
    
    // Agregamos los días de la semana del mes actual al principio del array
    for (let i = diasSemana.indexOf(diasSemana[fecha.getDay()]); i < diasSemana.length; i++) {
      calendario.unshift(diasSemana[i]);
    }
    
    // Agregamos los días de la semana del mes anterior al principio del array
    const fechaMesAnterior = new Date(anio, mes - 1, 0);
    for (let i = diasSemana.indexOf(diasSemana[fechaMesAnterior.getDay()]); i >= 0; i--) {
      calendario.unshift('');
    }
    
    return calendario;
  }


  generarCalendario() 