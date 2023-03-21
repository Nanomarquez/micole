const { Router } = require("express");
const router = Router();
const { Pais } = require("../db.js");


//------- PEDIR TODOS LOS COLEGIOS A LA BD--------
router.get("/", async (req, res) => {
  try {
    let pais;
    pais = await Pais.findAll({
      attributes: ["id", "nombre_pais"],
    });

    res.send(pais);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//------- POST A ALMACEN--------
router.post("/", async (req, res) => {
  const { nombre_pais } = req.body;
  try {
    const [pais, created] = await Pais.findOrCreate({
      where: {
        nombre_pais: nombre_pais,
      },
    });
    if (created) {
      console.log("Pais creado exitosamente");
      pais.nombre_pais = nombre_pais;
      pais.save();
      res.status(200).json(pais);
    } else {
      res.status(500).json([{ error: "Pais existente" }]);
    }
  } catch (err) {
    res.status(500).json({ err });
  }
});

//--------------------PUT  UN PRODUCTO DEL ALMACEN--------------------
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_pais } = req.body;
    const editedPais = await Pais.update(
      {
        nombre_pais: nombre_pais,
      },
      { where: { id: id } }
    );
    res.json(editedPais);
  } catch (err) {
    res.status(500).send({ err });
  }
});
//--------------------DELETE UN PAIS--------------------

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletePais = awaiPais.findOne({ where: { id: id } });
    await deletePais.destroy();
    res.status(200).send({ message: "País borrado" });
  } catch (err) {
    res.status(500).send({
      message: "El país no pudo ser borrado",
    });
  }
});
module.exports = router;
