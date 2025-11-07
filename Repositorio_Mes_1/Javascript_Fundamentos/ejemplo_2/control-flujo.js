console.log("=== VALIDACIÓN DE FORMULARIO DE REGISTRO ===\n")

// Comienzo el formulario con datos inválidos que permitan ver los mensajes de validación fallida.

const formulario = {
  nombre: '',
  email: 'correo_invalido',
  edad: 17,
  password: 1234,
}

// Validaciones individuales para cada campo

function validarNombre(nombre) {
  if (!nombre || nombre.trim() === '') {
    throw new Error('El nombre no puede estar vacío')
  }
}

function validarEmail(email) {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //uso de Regex simple para validar email
  if (!regexEmail.test(email)) {
    throw new TypeError('El email no tiene un formato válido')
  }
}

function validarEdad(edad) {
  if (typeof edad !== 'number' || edad < 18 || edad > 99) {
    throw new Error('La edad debe estar entre 18 y 99 años')
  }
}

function validarPassword(password) {
  const regexPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/ //uso de Regex simple para validar password
  if (!regexPassword.test(password)) {
    throw new TypeError("El password debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo")
  }
}

//Función que acumula errores

function validarFormulario(data) {
  const errores = []

  try {
    validarNombre(data.nombre)
  }
  catch (error) {
    errores.push(`Nombre: ${error.message}`)
  }

  try {
    validarEmail(data.email)
  }
  catch (error) {
    errores.push(`Email: ${error.message}`)
  }

  try {
    validarEdad(data.edad)
  }
  catch (error) {
    errores.push(`Edad: ${error.message}`)
  }

  try {
    validarPassword(data.password)
  }
  catch (error) {
    errores.push(`Password: ${error.message}`)
  }

  // Resultados por consola

  if (errores.length > 0) {
    console.log('Se encontraron errores de validación:\n')
    errores.forEach(err => console.error(`- ${err}`))
  } else {
    console.log('Formulario válido. Registro exitoso.')
  }
  console.log('\n Proceso de validación finalizado \n')

}

validarFormulario(formulario)