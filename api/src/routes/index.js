const { Router } = require("express");
const { readdirSync } = require("fs");
const pkg = require("../../package.json");
const router = Router();

const PATH = __dirname;

/**
 * Remueve la extension de todos los archivos que se encuentran en la carpera ruta
 * @param {*} filename example: colegio.js
 * @returns colegio
 */
const removeExtension = (filename) => {
    return filename.split(".").shift();
};

/**
 hace un filter de los archivos en el directorio actual para que el router use como nombre el mismo nombre del archivo sin la extension y requira ese mismo archivo, para que las rutas sean dinamicas. 
 */
readdirSync(PATH).filter((filename) => {
    const name = removeExtension(filename);

    if (name !== "index") {
      //usa el nombre del archivo y require esa ruta para usarla 
        router.use(`/${name}`, require(`./${filename}`));
    }
});

router.get("/", (req, res) =>
  res.json({ name: pkg.name, version: pkg.version })
);

module.exports = router;

//para que funcione correctamente es nesesario que los archivos tengan los nombres que realmente quieras que se reflejen en las rutas ejemplo si en el directorio routes hay un archivo llamado auth.js como las rutas son dinamicas para acceder a ese archivo seria http://localhost/3000/auth esa seria la familia de esa ruta y si en auth tienes por ejemplo: router.get('/signin') 
// la ruta seria http://localhost/3000/auth/signin.
//cabe destacar que si en app.js tienes un prefijo para la api 
//ejemplo: app.use('/api') seria lo mismo lo unico es que todas usaran el prefijo
//http://localhost/3000/api/auth/signin 
//aunque en este caso veo que no tiene prefijo.
//solo tendrias que cambiarle los nombres a los archivos de routes para que usen ese nombre y listo asi como esta ahora, funciona perfectamente pero para que todo sea igual y el frontend no haya que cambiarle nada solo habria que cambiale los nombres y listo.

//lo bueno de esto es que ya no nesesitas requerir nada lo hace totalmente dinamico y mas entendible en pocas lineas de codigo.

// const authRouter = require("./authRoutes.js");
// const colegioRouter = require("./colegio.js");
// const departamentoRouter = require("./departamento.js");
// const provinciaRouter = require("./provincia.js");
// const distritoRouter = require("./distritoRouter.js");
// const paisRouter = require("./pais.js");
// const userRouter = require("./userRoutes.js");
// const categoriaRouter = require("./categoria.js");
// const vacanteRouter = require("./vacanteRouter.js");
// const horarioRouter = require("./horarioRoutes.js");
// const infraestructuraRouter = require("./infraestructura.js");
// const gradoRouter = require("./grado.js");
// const nivelRouter = require("./nivel.js");
// const afiliacionRouter = require("./AfiliacionRoutes.js");
// const citaRouter = require("./citaRouter");
// const paymentRouter = require("./payment");
// const ventasRouter = require("./ventas");
// const reviewRouter = require("./reviewRouter");
// const informeRouter = require("./informeRouter");
// const metodosRouter = require("./metodos");
// const dificultadesRouter = require("./dificultades");
// const eventoRouter = require("./eventoRoutes");

// router.use("/colegios", colegioRouter);
// router.use("/departamentos", departamentoRouter);
// router.use("/provincias", provinciaRouter);
// router.use("/distritos", distritoRouter);
// router.use("/paises", paisRouter);
// router.use("/categorias", categoriaRouter);
// router.use("/vacantes", vacanteRouter);
// router.use("/horarios", horarioRouter);
// router.use("/infraestructuras", infraestructuraRouter);
// router.use("/grados", gradoRouter);
// router.use("/niveles", nivelRouter);
// router.use("/afiliaciones", afiliacionRouter);
// router.use("/citas", citaRouter);
// router.use("/reviews", reviewRouter);
// router.use("/payments", paymentRouter);
// router.use("/ventas", ventasRouter);
// router.use("/metodos", metodosRouter);
// router.use("/dificultades", dificultadesRouter);
// router.use("/informes", informeRouter);
// router.use("/eventos", eventoRouter);


// router.use("/auth", authRouter);
// router.use("/users", userRouter);


