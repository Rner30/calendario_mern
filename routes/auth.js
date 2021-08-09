// Rutas de usuario 
// Host + /api/auth

const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const {crearUsuario,loginUsuario,revalidarToken} = require('../controllers/authController')
const { validarCampos } = require('../middlewares/Validar-campos')
const {validarJWT} = require('../middlewares/validar-jwt-')
router.post('/new', [
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    check('password','El password es obligatorio y debe tener minimo 6 caracteres').isLength({min:6}),
    validarCampos
] ,crearUsuario)

router.post('/',[
    check('email','El email es obligatorio').isEmail(),
    check('password','El password es obligatorio y debe tener minimo 6 caracteres').isLength({min:6}),
    validarCampos
],loginUsuario)

router.get('/renew',validarJWT,revalidarToken)

module.exports = router




