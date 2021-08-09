const express = require("express");
const { validationResult } = require("express-validator");
const Usuario = require("../models/Usuario");

const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");

const crearUsuario = async (req, res = express.response) => {
	const { email, password } = req.body;
	try {
		let usuario = await Usuario.findOne({
			email: email,
		});
		if (usuario) {
			return res.status(400).json({
				ok: false,
				msg: "El usuario ya existe con ese correo",
			});
		}

		usuario = new Usuario(req.body);

		//encriptar password
		const salt = bcrypt.genSaltSync();
		usuario.password = bcrypt.hashSync(password, salt);

		await usuario.save();
		//generar jwt
		const token = await generarJWT(usuario.id, usuario.name);

		res.status(201).json({
			ok: true,
			uid: usuario.id,
			name: usuario.name,
			user: req.body,
			token: token,
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
			msg: "Por favor hable con el admin",
		});
	}
};

const loginUsuario = async (req, res = express.response) => {
	const { email, password } = req.body;

	try {
		const usuario = await Usuario.findOne({
			email: email,
		});
		if (!usuario) {
			return res.status(400).json({
				ok: false,
				msg: "El usuario no existe",
			});
		}

		//confirmar passwords
		const validPassword = bcrypt.compareSync(password, usuario.password);

		//generar jwt
		const token = await generarJWT(usuario.id, usuario.name);

		if (!validPassword) {
			return res.status(400).json({
				ok: false,
				msg: "Password no valida",
			});
		}

		res.json({
			ok: true,
			msg: "login",
			uid: usuario.id,
			name: usuario.name,
            token: token
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
			msg: "Por favor hable con el admin",
		});
	}
};

const revalidarToken = async (req, res = express.response) => {
	
    const {uid,name} = req
    const token = await generarJWT(req.uid, req.name);

    res.json({
		ok: true,
		token,
		name,
		uid: uid,
	});
};

module.exports = {
	crearUsuario,
	loginUsuario,
	revalidarToken,
};
