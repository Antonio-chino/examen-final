'use strict'
const colors = require('colors')
const read = require('readline-sync')
const moment = require('moment')
const mongoose = require('mongoose')

const dbURI = 'mongodb://localhost:27017/control-escolar'
mongoose.Promise = global.Promise

const Schema = mongoose.Schema
let alumnoSchema = new Schema({
  matricula: Number,
  curp: String,
  nombre: String,
  apellidoPaterno: String,
  apellidoMaterno: String,
  genero: String,
  edad: Number,
  estatus: String
})

class alumno {
  constructor () {
    this.matricula = 0
    this.curp = ''
    this.nombre = ''
    this.apellidoPaterno = ''
    this.apellidoMaterno = ''
    this.genero = ''
    this.fechaNacimiento = ''
    this.estatus = ''

    // Abrir la conexion a la base de datos
    // mongoose.connect('mongodb://localhost:27017/control-escolar', { useNewUrlParser: true }, (err) => {
    // if (err) {
    // console.error('Error de conexion', err)
    // return
    // }

    // console.log('La conexion a MongoDB se realizo correctamente!!!')
    // })
  }

  getEdad () {
    let nacimiento = moment(this.fechaNacimiento, 'DD/MM/YYYY').format('YYYY-MM-DD')
    let hoy = moment()
    let anios = hoy.diff(nacimiento, 'years')

    // return `${anios.toString()} `
    return anios
  }
  getNombreCompleto () {
    return `${this.nombre} ${this.apellidoPaterno} ${this.apellidoMaterno}`
  }

  getDatos () {
    let objAlumno = {}
    // Matricula
    console.log(`${colors.grey.bold('Matricula: ')} ${this.estatus === 'Editar' ? colors.white.bold(this.matricula) : ''}`)
    objAlumno.matricula = read.question()
    this.matricula = objAlumno.matricula !== '' ? objAlumno.matricula : this.matricula
    // Curp
    console.log(`${colors.grey.bold('Curp: ')} ${this.estatus === 'Editar' ? colors.white.bold(this.curp) : ''}`)
    objAlumno.curp = read.question()
    this.curp = objAlumno.curp !== '' ? objAlumno.curp : this.curp
    // Nombre
    console.log(`${colors.grey.bold('Nombre(s)')} ${this.estatus === 'Editar' ? colors.white.bold(this.nombre) : ''}`)
    objAlumno.nombre = read.question()
    this.nombre = objAlumno.nombre !== '' ? objAlumno.nombre : this.nombre
    // ApellidoPaterno
    console.log(`${colors.grey.bold('Apellido Paterno')} ${this.estatus === 'Editar' ? colors.white.bold(this.apellidoPaterno) : ''}`)
    objAlumno.apellidoPaterno = read.question()
    this.apellidoPaterno = objAlumno.apellidoPaterno !== '' ? objAlumno.apellidoPaterno : this.apellidoPaterno
    // ApellidoMaterno
    console.log(`${colors.grey.bold('Apellido Materno')} ${this.estatus === 'Editar' ? colors.white.bold(this.apellidoMaterno) : ''}`)
    objAlumno.apellidoMaterno = read.question()
    this.apellidoMaterno = objAlumno.apellidoMaterno !== '' ? objAlumno.apellidoMaterno : this.apellidoMaterno
    // Genero
    console.log(`${colors.grey.bold('Genero')} ${this.estatus === 'Editar' ? colors.white.bold(this.genero) : ''}`)
    objAlumno.genero = read.question()
    this.genero = objAlumno.genero !== '' ? objAlumno.genero : this.genero
    // FechaNacimiento
    console.log(`${colors.grey.bold('Fecha De Nacimiento: ')} ${this.estatus === 'Editar' ? colors.white.bold(this.fechaNacimiento) : ''}`)
    objAlumno.fechaNacimiento = read.question()
    this.fechaNacimiento = objAlumno.fechaNacimiento !== '' ? objAlumno.fechaNacimiento : this.fechaNacimiento

    // Abrir conexion a base de datos
    mongoose.connect(dbURI, { useNewUrlParser: true})
    // Control de eventos de la base de datos
    mongoose.connection.on('connected', function () {
      console.log('Mongoose default connection is open to ', dbURI)
    })
    mongoose.connection.on('disconnected', function () {
      console.log('Mongoose default connection is disconnected')
    })
    mongoose.connection.on('error', function (err) {
      console.error('Mongoose default connection has occured', +err + ' error')
    })
  }

  consultar () {
    // Abrir conexion a base de datos
    mongoose.connect(dbURI, { useNewUrlParser: true})
    // Control de eventos de la base de datos
    mongoose.connection.on('connected', function () {
      console.log('Mongoose default connection is open to ', dbURI)
    })
    mongoose.connection.on('disconnected', function () {
      console.log('Mongoose default connection is disconnected')
    })
    mongoose.connection.on('error', function (err) {
      console.error('Mongoose default connection has occured', +err + ' error')
    })
    // Buscar en la base de datos
    let AlumnoModel = mongoose.model('alumno', alumnoSchema)
    let mat = read.question('Matricula:')
    AlumnoModel.findOne({ // findOne es para buscar en la base de datos
      'matricula': parseInt(mat)
    }, (err, result) => { // la => es igual que function
      // console.log(result)
      this.matricula = result.matricula
      this.curp = result.curp
      this.nombre = result.nombre
      this.apellidoPaterno = result.apellidoPaterno
      this.apellidoMaterno = result.apellidoMaterno
      this.genero = result.genero
      this.fechaNacimiento = result.fechaNacimiento

      console.log(`Accediste al Metodo ${colors.yellow.bold('Consultar')}`)
      console.log(`${colors.yellow.bold('Matricula')}  ${this.matricula}`)
      console.log(`${colors.yellow.bold('Curp')}  ${this.curp}`)
      console.log(`${colors.yellow.bold('Nombre Completo')}  ${this.getNombreCompleto()}`)
      console.log(`${colors.yellow.bold('Edad')}  ${result.edad}`)
      console.log(`${colors.yellow.bold('Genero')}  ${this.genero}`)
    })
  }
  agregar () {
    console.log(`Accediste al Metodo ${colors.yellow.bold('Agregar')}`)
    let yesNot = read.question(`¿ Esta seguro de ${colors.green.bold('Guardar los datos')} capturados [${colors.green.bold('Y')}/${colors.red.bold('N')}]?`)
    if (yesNot.toUpperCase() === 'Y') {
      // listaAlumnos.push(this)
      // Agregar alumno a bases de datos
      let edad = this.getEdad()
      let AlumnoModel = mongoose.model('alumno', alumnoSchema)
      let model = new AlumnoModel({
        matricula: this.matricula,
        curp: this.curp,
        nombre: this.nombre,
        apellidoMaterno: this.apellidoMaterno,
        apellidoPaterno: this.apellidoPaterno,
        genero: this.genero,
        fechaNacimiento: this.fechaNacimiento,
        edad: edad

      })
      model.save((err, resp) => {
        if (err) {
          console.error('Error al insertar', err)
          return
        }
        console.log('Registro Insertado Correctamente')
        console.log(`Los datos se han ${colors.green.bold('Guardado correctamente !!!')}`)
        mongoose.connection.close()
      })
    } else {
      console.log(`Se ha ${colors.red.bold('Cancelados')} la captura del ${colors.yellow.bold('Alumno')}`)
    }
    read.question(`${colors.yellow.bold('Presione cualquier tecla para regresar al menu principal')}`)
  }

  modificar () {
    console.log('Estas en modificar')
    mongoose.connect(dbURI, { useNewUrlParser: true})
    // Control de eventos de la base de datos
    mongoose.connection.on('connected', function () {
      console.log('Mongoose default connection is open to ', dbURI)
    })
    mongoose.connection.on('disconnected', function () {
      console.log('Mongoose default connection is disconnected')
    })
    mongoose.connection.on('error', function (err) {
      console.error('Mongoose default connection has occured', +err + ' error')
    })
    let AlumnoModel = mongoose.model('alumno', alumnoSchema)
    let mat = read.question('Matricula:')
    AlumnoModel.findOne({ // findOne es para buscar en la base de datos
      'matricula': parseInt(mat)
    }, (err, result) => { // la => es igual que function
      // console.log(result)

      this.matricula = result.matricula
      this.curp = result.curp
      this.nombre = result.nombre
      this.apellidoPaterno = result.apellidoPaterno
      this.apellidoMaterno = result.apellidoMaterno
      this.genero = result.genero
      this.fechaNacimiento = result.fechaNacimiento

      console.log(`Accediste al Metodo ${colors.yellow.bold('Consultar')}`)
      console.log(`${colors.yellow.bold('Matricula')}  ${this.matricula}`)
      console.log(`${colors.yellow.bold('Curp')}  ${this.curp}`)
      console.log(`${colors.yellow.bold('Nombre Completo')}  ${this.getNombreCompleto()}`)
      console.log(`${colors.yellow.bold('Edad')}  ${result.edad}`)
      console.log(`${colors.yellow.bold('Genero')}  ${this.genero}`)

      let respuesta = read.question('¿ Deseas Editar el registro? (Y/N): ')
      if (respuesta.toUpperCase() === 'Y') {
        this.estatus = 'Editar'
        this.getDatos()
        let objAlumno = {
          matricula: this.matricula,
          curp: this.curp,
          nombre: this.nombre,
          apellidoPaterno: this.apellidoPaterno,
          apellidoMaterno: this.apellidoMaterno,
          genero: this.genero,
          fechaNacimiento: this.fechaNacimiento,
          edad: this.getEdad()

        }
        // FinOneUpdate
        AlumnoModel.findOneAndUpdate({'matricula': objAlumno.matricula}, {$set: objAlumno}, function (err, result) {
          console.log(result)
        }),

        console.log('Registro Insertado Correctamente')
        console.log(`Los datos se han ${colors.green.bold('Guardado correctamente !!!')}`)
        mongoose.connection.close()
      }
    })
  }

  Eliminar () {
    // Abrir conexion a base de datos
    mongoose.connect(dbURI, { useNewUrlParser: true})
    // Control de eventos de la base de datos
    mongoose.connection.on('connected', function () {
      console.log('Mongoose default connection is open to ', dbURI)
    })
    mongoose.connection.on('disconnected', function () {
      console.log('Mongoose default connection is disconnected')
    })
    mongoose.connection.on('error', function (err) {
      console.error('Mongoose default connection has occured', +err + ' error')
    })
    // Buscar en la base de datos
    let AlumnoModel = mongoose.model('alumno', alumnoSchema)
    let mat = read.question('Matricula:')
    AlumnoModel.findOneAndDelete({ // findOne es para buscar en la base de datos
      'matricula': parseInt(mat)
    }, (err, result) => { // la => es igual que function
      // console.log(result)
      this.matricula = result.matricula
      this.curp = result.curp
      this.nombre = result.nombre
      this.apellidoPaterno = result.apellidoPaterno
      this.apellidoMaterno = result.apellidoMaterno
      this.genero = result.genero
      this.fechaNacimiento = result.fechaNacimiento

      console.log(`Accediste al Metodo ${colors.yellow.bold('Eliminar')}`)
      console.log(`${colors.yellow.bold('Matricula')}  ${this.matricula}`)
      console.log(`${colors.yellow.bold('Curp')}  ${this.curp}`)
      console.log(`${colors.yellow.bold('Nombre Completo')}  ${this.getNombreCompleto()}`)
      console.log(`${colors.yellow.bold('Edad')}  ${result.edad}`)
      console.log(`${colors.yellow.bold('Genero')}  ${this.genero}`)

      console.log('Registro Insertado Correctamente')
      console.log(`Los datos se han ${colors.green.bold('Guardado correctamente !!!')}`)
      mongoose.connection.close()
    })

    // findOneAndDelete()

    /*
    db.collection.remove()
  {
    {query}

      justOne: {boolean}
      writeConcern: {document}
      collation: {document}
    }
    return remove()
  */
  }
}

module.exports = alumno
