'use strict'

const colors = require('colors')
const read = require('readline-sync')
const menu = ['Alta de Alumno', 'Consulta', 'Editar Alumno', 'Eliminar Alumno']
const Alumno = require('./alumno')

console.log(`${colors.white.bold('================')}`)
console.log(`${colors.white.bold('MENU DE OPCIONES')}`)
console.log(`${colors.white.bold('================')}`)

let opcion = 1
let alumno = new Alumno()
while (menu[opcion] !== undefined) {
  opcion = read.keyInSelect(menu, `${colors.yellow.bold('Elige una opcion del menu?')}`)
  switch (menu[opcion]) {
    case 'Alta de Alumno':
      alumno.estatus = 'Altas'
      alumno.getDatos()
      alumno.agregar()
      break
    case 'Consulta': alumno.consultar()
    // console.log(`${alumno.getNombreCompleto()}`)
      // console.log(`${alumno.getEdad()}`)
      break
    case 'Editar Alumno' :
      alumno.estatus = 'Editar'
      alumno.modificar()
      break
    case 'Eliminar Alumno':
      alumno.estatus = 'Eliminar'
      alumno.Eliminar()
      break
  }
}
read.question(`${colors.red.bold('Haz salido del sistema, presiona cualquier tecla para terminar !!!')}`)
/*
const colors = require('colors')
const read = require('readline-sync')
const menu = ['Alta de Alumno', 'Consulta']
const _ = require('lodash')

console.log(`${colors.white.bold('================')}`)
console.log(`${colors.white.bold('MENU DE OPCIONES')}`)
console.log(`${colors.white.bold('================')}`)

let opcion = 1
let listaAlumnos = []

while (menu[opcion] !== undefined) {
  opcion = read.keyInSelect(menu, `${colors.yellow.bold('Elige una opción del menu?')}`)
  console.log('Ok, tu seleccionste la opción ' + menu[opcion] + ' del Menu.')

  let matricula = 0
  let curp = ''
  let nombre = ''
  let apellidoPaterno = ''
  let apellidoMaterno = ''
  let genero = ''
  let fechaNacimiento = ''
  let alumno = {}

  switch (menu[opcion]) {
    case 'Alta de Alumno':
      matricula = read.question('Matrícula: ')
      curp = read.question('CURP: ')
      nombre = read.question('Nombre: ')
      apellidoPaterno = read.question('Apellido Paterno: ')
      apellidoMaterno = read.question('Apellido Materno: ')
      genero = read.question('Genero: ')
      fechaNacimiento = read.question('Fecha de Nacimiento: ')

      alumno = {
        matricula,
        curp,
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        genero,
        fechaNacimiento
      }

      altaAlumno(alumno)
      break
    case 'Consulta':
      matricula = read.question('Matrícula: ')
      consulta(matricula)
      break
  }
}

read.question(`${colors.red.bold('Haz salido del sistema, presiona cualquier tecla para terminar !!!')}`)

function altaAlumno (alumno) {
  let yesNot = read.question(`¿ Esta seguro de ${colors.green.bold('Guardar los datos')} capturados [${colors.green.bold('Y')}/${colors.red.bold('N')}]?`)
  if (yesNot.toUpperCase() === 'Y') {
    listaAlumnos.push(alumno)
    console.log(`Los datos se han ${colors.green.bold('Guardado Correctamente !!!')}`)
  } else {
    console.log(`Se ha ${colors.red.bold('Cancelado')} la captura del ${colors.yellow.bold('Alumno')}`)
  }
  read.question(`${colors.yellow.bold('Presiona cualquier tecla para regresar al Menu Principal !!!')}`)
}

function consulta (matricula) {
  console.log(`${colors.green.bold('Estas en la función Consulta')}`)
  let alumno = _.find(listaAlumnos, function (alumno) { return alumno.matricula === matricula })
  if (alumno === undefined) {
    console.log(`La matrícula ${colors.red.bold('NO SE ENCUENTRA')} dada de alta. Favor de verificar...`)
  } else {
    console.log(alumno)
  }
  read.question(`${colors.yellow.bold('Presiona cualquier tecla para regresar al Menu Principal !!!')}`)
}
*/
