console.log("=== To-Do List ===\n");

function crearToDoList(){
  let tareas = []
  let contador = 0

  function agregarTarea(descripcion, prioridad = 'media'){
    const tarea = {
      id: contador++,
      descripcion,
      prioridad, 
      completada: false
    }
    tareas.push(tarea)
    console.log(`Tarea agregada: ${descripcion} - prioridad: ${prioridad}`)
  }

  function marcarCompletada(id){
    const tarea = tareas.find(tar => tar.id === id)
    if(tarea){
      tarea.completada = true
      console.log(`Tarea ${id} está completada.`)
    }else{
      console.log(`No se encontró la tarea con id ${id}`)
    }
  }

  function eliminarTarea(id){
    const indexTarea = tareas.findIndex(tar => tar.id === id)
    if(indexTarea !== -1){
      const [eliminada] = tareas.splice(indexTarea, 1)
      console.log(`Tarea eliminada: ${eliminada.descripcion}`)
    }else{
      console.log(`No se encontró la tarea con id ${id}`)
    }
  }

  function filtrarTarea(estado = 'todas'){
    if(estado === 'todas') return [...tareas]
    const completadas = estado === 'completadas'
    return tareas.filter(tar => tar.completada === completadas)
  }

  function estadisticasTareas(){
    const total = tareas.length
    const completadas = tareas.filter(tar => tar.completada).length
    const pendientes = total - completadas
    return {total, completadas, pendientes}
  }

  return {agregarTarea, marcarCompletada, eliminarTarea, filtrarTarea, estadisticasTareas}
}

// usar el toDoList

const todo = crearToDoList()

todo.agregarTarea('Estudiar Javascript', 'alta')
todo.agregarTarea('Hacer el almuerzo')
todo.agregarTarea('Ir de compras', 'baja')

todo.marcarCompletada(2)
todo.eliminarTarea(3)

console.log('\n Tareas completadas:', todo.filtrarTarea('completadas'))
console.log('Tareas pendientes:', todo.filtrarTarea('pendientes'))
console.log('Estadísticas:', todo.estadisticasTareas())
