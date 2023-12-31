const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require("cors");

app.use(cors());
app.use(express.json()); 

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "rols",
});

db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos: ' + err.message);
    } else {
        console.log('Conexión a la base de datos establecida');
    }
});

app.post("/create", (req, res) => {
    const nombre = req.body.nombre;
    const nombre_usuario = req.body.nombre_usuario;
    const email = req.body.email;
    const contraseña = req.body.contraseña;
    const id_rol = req.body.id_rol; // Agrega el parámetro id_rol

    db.query('INSERT INTO usuarios(nombre, nombre_usuario, email, contraseña, id_rol) VALUES(?, ?, ?, ?, ?)',
        [nombre, nombre_usuario, email, contraseña, id_rol],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error al registrar el empleado");
            } else {
                res.send("Empleado registrado con éxito!!");
            }
        }
    );
});

//crear ruta para /login para dar acceso si el usuario existe en la bd
app.post("/login", (req, res) => {
    const nombre_usuario = req.body.nombre_usuario;
    const contraseña = req.body.contraseña;

    // Consulta la base de datos para verificar las credenciales
    db.query('SELECT * FROM usuarios WHERE nombre_usuario = ? AND contraseña = ?',
        [nombre_usuario, contraseña],
        (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error en la base de datos");
            } else {
                if (results.length > 0) {
                    // Credenciales válidas, el usuario está autenticado
                    res.status(200).json({ authenticated: true, message: 'Inicio de sesión exitoso' });
                } else {
                    // Credenciales incorrectas
                    res.status(401).json({ authenticated: false, message: 'Credenciales incorrectas' });
                }
            }
        }
    );
});



app.listen(3001, () => {
    console.log("Escuchando en el puerto 3001");
});
