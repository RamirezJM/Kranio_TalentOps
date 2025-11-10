console.log("=== SISTEMA DE GESTIÓN DE BIBLIOTECA ===\n");

// Base de datos de libros (agrego más para evitar conflictos en las demostraciones)
const libros = [
  { id: 1, titulo: "JavaScript: The Good Parts", autor: "Douglas Crockford", genero: "Programación", disponible: true, prestamos: 0 },
  { id: 2, titulo: "Clean Code", autor: "Robert C. Martin", genero: "Programación", disponible: false, prestamos: 0 },
  { id: 3, titulo: "The Pragmatic Programmer", autor: "Andrew Hunt", genero: "Programación", disponible: true, prestamos: 0 },
  { id: 4, titulo: "1984", autor: "George Orwell", genero: "Ficción", disponible: true, prestamos: 0 },
  { id: 5, titulo: "To Kill a Mockingbird", autor: "Harper Lee", genero: "Ficción", disponible: false, prestamos: 0 },
  { id: 6, titulo: "You Don't Know JS Yet", autor: "Kyle Simpson", genero: "Programación", disponible: true, prestamos: 0 },
  { id: 7, titulo: "Brave New World", autor: "Aldous Huxley", genero: "Ficción", disponible: true, prestamos: 0 },
  { id: 8, titulo: "Sapiens: A Brief History of Humankind", autor: "Yuval Noah Harari", genero: "Historia", disponible: true, prestamos: 0 },
  { id: 9, titulo: "Atomic Habits", autor: "James Clear", genero: "Desarrollo Personal", disponible: true, prestamos: 0 },
  { id: 10, titulo: "The Art of War", autor: "Sun Tzu", genero: "Estrategia", disponible: true, prestamos: 0 }
];

// Sistema de usuarios  ========  nueva funcionalidad  ===========
const usuarios = [
  { id: 1, nombre: "Ana", historial: [] },
  { id: 2, nombre: "Juan", historial: [] },
];


// Sistema de gestión
const biblioteca = {
  // Obtener libros disponibles
  obtenerDisponibles() {
    return libros.filter(libro => libro.disponible);
  },

  // Buscar libros por título o autor
  buscar(criterio) {
    const termino = criterio.toLowerCase();
    return libros.filter(libro =>
      libro.titulo.toLowerCase().includes(termino) ||
      libro.autor.toLowerCase().includes(termino)
    );
  },

  // Buscar libros con múltiples criterios  ========  nueva funcionalidad  ===========
  buscarAvanzado({ titulo, autor, genero, disponible }) {
    return libros.filter(libro => {
      return (
        (!titulo || libro.titulo.toLowerCase().includes(titulo.toLowerCase())) &&
        (!autor || libro.autor.toLowerCase().includes(autor.toLowerCase())) &&
        (!genero || libro.genero === genero) &&
        (disponible === undefined || libro.disponible === disponible)
      );
    });
  },

  // Prestar libro
  prestar(id) {
    const libro = libros.find(l => l.id === id);
    if (!libro) return { exito: false, mensaje: "Libro no encontrado" };
    if (!libro.disponible) return { exito: false, mensaje: "Libro no disponible" };

    libro.disponible = false;
    return { exito: true, mensaje: `Libro "${libro.titulo}" prestado exitosamente` };
  },

  // Prestar Libro a usuario  ========  nueva funcionalidad  ===========
  prestarLibroAUsuario(idLibro, idUsuario, dias = 7) {
    const libro = libros.find(l => l.id === idLibro);
    const usuario = usuarios.find(u => u.id === idUsuario);

    if (!libro) return { exito: false, mensaje: "Libro no encontrado" };
    if (!usuario) return { exito: false, mensaje: "Usuario no encontrado" };
    if (!libro.disponible) return { exito: false, mensaje: "Libro no disponible" };

    libro.disponible = false;
    if (typeof libro.prestamos !== "number") {
      libro.prestamos = 0;
    }
    libro.prestamos++;
    const fechaPrestamo = new Date();
    const fechaDevolucion = new Date(fechaPrestamo);
    fechaDevolucion.setDate(fechaPrestamo.getDate() + dias);

    usuario.historial.push({ idLibro, fechaPrestamo, fechaDevolucion, devuelto: false });
    return { exito: true, mensaje: `${usuario.nombre} tiene pedido "${libro.titulo}" hasta el ${fechaDevolucion.toLocaleDateString()}` };
  },

  // Devolver libro
  devolver(id) {
    const libro = libros.find(l => l.id === id);
    if (!libro) return { exito: false, mensaje: "Libro no encontrado" };
    if (libro.disponible) return { exito: false, mensaje: "Este libro ya está disponible" };

    libro.disponible = true;
    return { exito: true, mensaje: `Libro "${libro.titulo}" devuelto exitosamente` };
  },


  // Devolver libro con calculo de multa   ========  nueva funcionalidad  ===========
  devolverLibro(idLibro, idUsuario) {
    const libro = libros.find(l => l.id === idLibro);
    const usuario = usuarios.find(u => u.id === idUsuario);
    if (!libro || !usuario) return { exito: false, mensaje: "Libro o usuario no encontrado" };

    const prestamo = usuario.historial.find(p => p.idLibro === idLibro && !p.devuelto);
    if (!prestamo) return { exito: false, mensaje: "No se encontró un préstamo activo" };

    const hoy = new Date();
    const retraso = Math.ceil((hoy - prestamo.fechaDevolucion) / (1000 * 60 * 60 * 24)); // días
    const multa = retraso > 0 ? retraso * 200 : 0;

    prestamo.devuelto = true;
    prestamo.fechaRealDevolucion = hoy;
    libro.disponible = true;

    return {
      exito: true,
      mensaje: multa > 0
        ? `Libro "${libro.titulo}" devuelto con ${retraso} días de retraso. Multa: $${multa}.`
        : `Libro "${libro.titulo}" devuelto sin retrasos.`
    };
  },

  // Reporte de popularidad (por número de préstamos)   ========  nueva funcionalidad  ===========
  reportePopularidad() {
    const ordenados = [...libros].sort((a, b) => b.prestamos - a.prestamos);
    return ordenados.map(({ titulo, prestamos }) => `${titulo}: ${prestamos} préstamos`);
  },

  // Estadísticas
  obtenerEstadisticas() {
    const total = libros.length;
    const disponibles = libros.filter(l => l.disponible).length;
    const prestados = total - disponibles;

    // Agrupar por género usando reduce
    const porGenero = libros.reduce((acc, libro) => {
      acc[libro.genero] = (acc[libro.genero] || 0) + 1;
      return acc;
    }, {});

    return { total, disponibles, prestados, porGenero };
  }
};

// Demostraciones prácticas
console.log("📚 LIBROS DISPONIBLES:");
biblioteca.obtenerDisponibles().forEach(({ titulo, autor }) => {
  console.log(`- "${titulo}" por ${autor}`);
});

console.log("\n🔍 BÚSQUEDA 'JavaScript':");
biblioteca.buscar("JavaScript").forEach(({ titulo, autor }) => {
  console.log(`- "${titulo}" por ${autor}`);
});

console.log("\n📊 ESTADÍSTICAS:");
const stats = biblioteca.obtenerEstadisticas();
console.log(`Total de libros: ${stats.total}`);
console.log(`Disponibles: ${stats.disponibles}`);
console.log(`Prestados: ${stats.prestados}`);
console.log("Por género:", stats.porGenero);

console.log("\n📖 OPERACIONES DE PRÉSTAMO:");
console.log(biblioteca.prestar(1).mensaje);
console.log(biblioteca.prestar(1).mensaje); // Intento fallido
console.log(biblioteca.devolver(1).mensaje);

console.log("\n=== DEMOSTRACIÓN DE DESTRUCTURING ===\n");

// Función que usa destructuring extensivamente
function procesarPrestamo({ id, titulo, autor, disponible }) {
  if (!disponible) {
    return `❌ "${titulo}" no está disponible`;
  }

  const resultado = biblioteca.prestar(id);
  return resultado.exito ? `✅ ${resultado.mensaje}` : `❌ ${resultado.mensaje}`;
}

// Procesar múltiples libros con destructuring
const librosParaProcesar = [
  { id: 1, titulo: "JavaScript: The Good Parts", autor: "Douglas Crockford", disponible: true },
  { id: 4, titulo: "1984", autor: "George Orwell", disponible: true }
];

librosParaProcesar.forEach(libro => {
  console.log(procesarPrestamo(libro));
});

// Destructuring en bucles
console.log("\n📋 LISTADO DE LIBROS CON DESTRUCTURING:");
for (const { titulo, autor, genero, disponible } of libros) {
  const estado = disponible ? "✅ Disponible" : "❌ Prestado";
  console.log(`${titulo} - ${autor} (${genero}) ${estado}`);
}

// Estadísticas avanzadas usando métodos modernos
console.log("\n🎯 ANÁLISIS AVANZADO:");
const librosPorGenero = libros.reduce((acc, { genero, disponible }) => {
  if (!acc[genero]) acc[genero] = { total: 0, disponibles: 0 };
  acc[genero].total++;
  if (disponible) acc[genero].disponibles++;
  return acc;
}, {});

Object.entries(librosPorGenero).forEach(([genero, stats]) => {
  console.log(`${genero}: ${stats.disponibles}/${stats.total} disponibles`);
});

// Demostración nuevas funcionalidades

console.log("BÚSQUEDA AVANZADA (Programación + disponibles):");
console.log(biblioteca.buscarAvanzado({ genero: "Programación", disponible: true }));

console.log("\n PRÉSTAMOS DE USUARIOS:");
console.log(biblioteca.prestarLibroAUsuario(6, 1).mensaje);
console.log(biblioteca.prestarLibroAUsuario(9, 2, 3).mensaje);

console.log("\n HISTORIAL DE USUARIOS:");
usuarios.forEach(({ nombre, historial }) => {
  console.log(`\n${nombre}:`);
  historial.forEach(({ idLibro, devuelto, fechaPrestamo, fechaDevolucion }) => {
    const libro = libros.find(l => l.id === idLibro);
    const estado = devuelto ? "Devuelto" : "Pendiente";
    console.log(`- ${libro.titulo} (${estado})`);
  });
});

console.log("\n DEVOLUCIÓN CON MULTA SIMULADA:");
usuarios[1].historial[0].fechaDevolucion = new Date(Date.now() - 3 * 86400000); // retraso de 3 días
console.log(biblioteca.devolverLibro(9, 2).mensaje);

console.log("\n REPORTE DE POPULARIDAD:");
biblioteca.reportePopularidad().forEach(linea => console.log(linea));

