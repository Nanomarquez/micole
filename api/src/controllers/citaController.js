const { Cita, Colegio } = require('../db');

const getCitas = async (req, res, next) => {
  const tokenUser = req.user;
  try {
    const user = await Colegio.findOne({ where: { idAuth: tokenUser.id } });
    if (!user) {
      return next({
        statusCode: 400,
        message: 'El usuario no es un Colegio',
      });
    }
    const CitasByUser = await Cita.findAll({
      where: { ColegioId: user.id },
      include: {
        model: Colegio,
      },
    });
    res.status(200).send(CitasByUser);
  } catch (error) {
    return next(error);
  }
};

const getCitaById = async (req, res, next) => {
  const { idCita } = req.params;
  try {
    const cita = await Cita.findByPk(idCita, {
      include: {
        model: Colegio,
      },
    });
    if (!cita) {
      return next({
        statusCode: 400,
        message: 'El registro no existe.',
      });
    }
    res.status(200).send(cita);
  } catch (error) {
    return next(error);
  }
};

const createCita = async (req, res, next) => {
  const { celular, correo, date, time, modo, nombre, ColegioId } = req.body;
  try {
    const ifExists = await Cita.findOne({
      where: { email: correo, fecha_cita: date, ColegioId },
    });
    if (ifExists) {
      return next({
        statusCode: 400,
        message: 'El email ya cuenta con una cita con este Colegio.',
      });
    }
    const newCita = await Cita.create({
      fecha_cita: date,
      hora_cita: time,
      modalidad: modo,
      nombre: nombre,
      email: correo,
      telefono: celular,
      ColegioId,
    });
    res.status(200).json(newCita);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const changeStatusCita = async (req, res, next) => {
  const { idCita } = req.params;
  const { estado } = req.body;
  try {
    const cita = await Cita.findByPk(idCita);
    if (!cita) {
      return next({
        statusCode: 400,
        message: 'El registro no existe.',
      });
    }
    await Cita.update(
      {
        estado,
      },
      { where: { id: idCita } }
    );
    res.status(200).send('El estado de la cita se ha modificado.');
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getCitas,
  getCitaById,
  createCita,
  changeStatusCita,
};