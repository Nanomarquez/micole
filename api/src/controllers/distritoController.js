const { Distrito } = require('../db');

const getDistritos = async (req, res, next) => {
  try {
    const distritos = await Distrito.findAll(
      {order:[["nombre_distrito","ASC"]]}
    );
    res.status(200).send(distritos);
  } catch (error) {
    return next(error);
  }
};

const getDistritoById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const distrito = await Distrito.findByPk(id);
    if (!distrito) {
      return next({
        statusCode: 404,
        message: 'El distrito solicitado no existe',
      });
    }
    res.status(200).send(distrito);
  } catch (error) {
    return next(error);
  }
};

const createDistrito = async (req, res, next) => {
  const { ProvinciaId, nombre_distrito } = req.body;
  try {
    const idDistrito = await Distrito.count();
    const newDistrito = await Distrito.create({
      id: idDistrito + 1,
      nombre_distrito,
      ProvinciaId,
    });
    res.status(200).send(newDistrito);
  } catch (error) {
    return next(error);
  }
};

const updateDistrito = async (req, res, next) => {
  const { id } = req.params;
  const { ProvinciaId, nombre_distrito } = req.body;
  try {
    const distrito = await Distrito.findByPk(id);
    if (!distrito) {
      return next({
        statusCode: 400,
        message: 'El registro solicitado no existe',
      });
    }
    const updatedDistrito = await Distrito.update({
      nombre_distrito,
      ProvinciaId
    },
    {where:{id}});
    res.status(200).json(updatedDistrito);
  } catch (error) {
    return next(error);
  }
};

const deleteDistritoById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const distrito = await Distrito.findByPk(id);
    if (!distrito) {
      return next({
        statusCode: 404,
        message: 'El distrito solicitado no existe',
      });
    }
    await Distrito.destroy({ where: { id } });
    res.status(200).send(distrito);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getDistritos,
  getDistritoById,
  createDistrito,
  deleteDistritoById,
  updateDistrito
};
