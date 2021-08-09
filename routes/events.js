//events routes
// /api/events
const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar-jwt-");
const {
	crearEvento,
	eliminarEvento,
	actualizarEvento,
	getEventos,
} = require("../controllers/eventsController");
const { check } = require("express-validator");
const router = Router();
const { validarCampos } = require("../middlewares/Validar-campos");
const { isDate } = require("../helpers/isDate");
router.use(validarJWT);

router.get(
	"/",

	getEventos
);

router.post(
	"/",
	[
		check("title", "El titulo es obligatorio").not().isEmpty(),
		check("start", "Fecha de inicio es obligatoria").custom(isDate),
		check("end", "Fecha de finalizacion es obligatoria").custom(isDate),
		validarCampos,
	],
	crearEvento
);

router.put(
	"/:id",
	[
		check("title", "El titulo es obligatorio").not().isEmpty(),
		check("start", "Fecha de inicio es obligatoria").custom(isDate),
		check("end", "Fecha de finalizacion es obligatoria").custom(isDate),
		validarCampos,
	],
	actualizarEvento
);

router.delete("/:id", eliminarEvento);

module.exports = router;
