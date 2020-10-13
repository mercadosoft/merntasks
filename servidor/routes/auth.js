// Rutas para autenticar usuarios 
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require("../middleware/auth");
const authController = require('../controllers/authController');

// Iniciar Sesión
// api/auth
router.post('/',
    authController.autenticarUsuario
);

router.get('/',
    auth,
    authController.usuarioAutenticado
)
module.exports = router;