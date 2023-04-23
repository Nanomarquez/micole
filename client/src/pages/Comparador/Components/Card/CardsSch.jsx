import { Rating } from "@mui/material";
import React, { useState } from "react";
import style from "./cardSch.module.css";
import SwComparador from "../Swipper/SwComparador";
import Pincon from "./svg/PinIcon";

const colegios = [
  {
    Metodos: ["Montessori", "Reggio Emilia"],
    Dificultades: [
      "Dislexia (Dificultad para leer)",
      "Disgrafía (Dificultad para escribir)",
    ],
    area: 2500,
    numero_estudiantes: 60,
    Categoria: [
      {
        id: 8,
        nombre_categoria: "Mixto",
        imagen_categoria:
          "https://uploads-ssl.webflow.com/628021db5f1eee1db790ab78/62b3f782b03ee569be526697_Mixto.jpg",
        logo_categoria:
          "https://uploads-ssl.webflow.com/628021db5f1eee1db790ab78/62b558429a3cf14cd6a06c76_Mixto.png",
      },
      {
        id: 10,
        nombre_categoria: "Privado",
        imagen_categoria:
          "https://uploads-ssl.webflow.com/628021db5f1eee1db790ab78/62b544d64c3ed0b9f10d7b66_Privado.jpg",
        logo_categoria:
          "https://uploads-ssl.webflow.com/628021db5f1eee1db790ab78/62b5583418c0ba591e37979e_Private.png",
      },
    ],
    id: "c350d70f-5b30-4526-af77-2c5f223c4e04",
    nombre_colegio: "Colegio Notable Santísima de las Mercedes",
    direccion: "Calle las Guindas 367",
    telefono: "970887130",
    isActive: true,
    primera_imagen:
      "https://res.cloudinary.com/de4i6biay/image/upload/v1681328620/micole/ccbic4h9x4zsqmf4khtb.png",

    galeria_fotos:
      '["https://res.cloudinary.com/de4i6biay/image/upload/v1681328761/micole/cyrtjiwttmbelongpcvz.jpg","https://res.cloudinary.com/de4i6biay/image/upload/v1681328761/micole/ht3dxupxpglh12ourrcf.jpg"]',
    logo: "https://res.cloudinary.com/de4i6biay/image/upload/v1681328767/micole/gsoapol4zctvggljwbsg.png",
    createdAt: "2022-11-23",
    Plan_Pago: {
      id: 3,
      nombre_plan_pago: "Estandar",
    },
    Distrito: {
      id: 11,
      nombre_distrito: "El Agustino",
    },
    Provincium: {
      id: 180,
      nombre_provincia: "Lima",
    },
    Vacantes: [
      {
        id: "f3e62ea0-46a2-42ac-988c-3171d111af0e",
        alumnos_matriculados: 20,
        matricula: "340",
        cuota_pension: "340",
        cuota_ingreso: "0",
        capacidad: 30,
        año: 2023,
        ColegioId: "c350d70f-5b30-4526-af77-2c5f223c4e04",
        GradoId: 4,
      },
      {
        id: "b44b79f9-4fa6-4aa3-a2d9-fb6193e7f1ec",
        alumnos_matriculados: 20,
        matricula: "340",
        cuota_pension: "340",
        cuota_ingreso: "0",
        capacidad: 30,
        año: 2023,
        ColegioId: "c350d70f-5b30-4526-af77-2c5f223c4e04",
        GradoId: 6,
      },
      {
        id: "6b81ab95-ad1f-4c61-9791-64e2b43a9a66",
        alumnos_matriculados: 20,
        matricula: "340",
        cuota_pension: "340",
        cuota_ingreso: "0",
        capacidad: 30,
        año: 2023,
        ColegioId: "c350d70f-5b30-4526-af77-2c5f223c4e04",
        GradoId: 7,
      },
      {
        id: "72215475-736f-4174-ae95-30d17589b142",
        alumnos_matriculados: 20,
        matricula: "340",
        cuota_pension: "340",
        cuota_ingreso: "0",
        capacidad: 30,
        año: 2023,
        ColegioId: "c350d70f-5b30-4526-af77-2c5f223c4e04",
        GradoId: 8,
      },
      {
        id: "80667dde-5dad-48f1-982a-de2942b8d99b",
        alumnos_matriculados: 20,
        matricula: "340",
        cuota_pension: "340",
        cuota_ingreso: "0",
        capacidad: 30,
        año: 2023,
        ColegioId: "c350d70f-5b30-4526-af77-2c5f223c4e04",
        GradoId: 9,
      },
      {
        id: "ba3a7ead-3209-4ad2-bdf6-325aa39a87e0",
        alumnos_matriculados: 20,
        matricula: "340",
        cuota_pension: "340",
        cuota_ingreso: "0",
        capacidad: 30,
        año: 2023,
        ColegioId: "c350d70f-5b30-4526-af77-2c5f223c4e04",
        GradoId: 10,
      },
      {
        id: "df768d85-60e5-48b5-bc71-0ca7b400c4ac",
        alumnos_matriculados: 20,
        matricula: "340",
        cuota_pension: "340",
        cuota_ingreso: "0",
        capacidad: 30,
        año: 2023,
        ColegioId: "c350d70f-5b30-4526-af77-2c5f223c4e04",
        GradoId: 11,
      },
      {
        id: "16c90731-2c8e-43c3-a1cd-2eca8ff5235b",
        alumnos_matriculados: 24,
        matricula: "340",
        cuota_pension: "340",
        cuota_ingreso: "0",
        capacidad: 30,
        año: 2023,
        ColegioId: "c350d70f-5b30-4526-af77-2c5f223c4e04",
        GradoId: 5,
      },
      {
        id: "d5c068de-5f36-4b95-ac26-32348d339f68",
        alumnos_matriculados: 20,
        matricula: "340",
        cuota_pension: "340",
        cuota_ingreso: "0",
        capacidad: 30,
        año: 2023,
        ColegioId: "c350d70f-5b30-4526-af77-2c5f223c4e04",
        GradoId: 12,
      },
      {
        id: "e109b794-0d8d-4ad4-a700-d4478317656f",
        alumnos_matriculados: 20,
        matricula: "340",
        cuota_pension: "340",
        cuota_ingreso: "0",
        capacidad: 30,
        año: 2023,
        ColegioId: "c350d70f-5b30-4526-af77-2c5f223c4e04",
        GradoId: 13,
      },
      {
        id: "cf890770-d74a-4fbf-b906-1f1d5556a9ab",
        alumnos_matriculados: 20,
        matricula: "340",
        cuota_pension: "340",
        cuota_ingreso: "0",
        capacidad: 30,
        año: 2023,
        ColegioId: "c350d70f-5b30-4526-af77-2c5f223c4e04",
        GradoId: 14,
      },
      {
        id: "ca04b756-a1ac-4748-a651-d3b643c6a548",
        alumnos_matriculados: 20,
        matricula: "340",
        cuota_pension: "340",
        cuota_ingreso: "0",
        capacidad: 30,
        año: 2023,
        ColegioId: "c350d70f-5b30-4526-af77-2c5f223c4e04",
        GradoId: 15,
      },
      {
        id: "8aa82df9-a9d2-4ee5-81b8-af42f8dc3ac1",
        alumnos_matriculados: 20,
        matricula: "340",
        cuota_pension: "340",
        cuota_ingreso: "0",
        capacidad: 30,
        año: 2023,
        ColegioId: "c350d70f-5b30-4526-af77-2c5f223c4e04",
        GradoId: 16,
      },
      {
        id: "516790fe-f569-4d60-877c-ebcd60a0517b",
        alumnos_matriculados: 20,
        matricula: "340",
        cuota_pension: "340",
        cuota_ingreso: "0",
        capacidad: 30,
        año: 2023,
        ColegioId: "c350d70f-5b30-4526-af77-2c5f223c4e04",
        GradoId: 17,
      },
    ],
    Nivels: [
      {
        id: 3,
        nombre_nivel: "Secundaria",
        Colegio_Nivel: {
          ColegioId: "c350d70f-5b30-4526-af77-2c5f223c4e04",
          NivelId: 3,
        },
      },
      {
        id: 2,
        nombre_nivel: "Primaria",
        Colegio_Nivel: {
          ColegioId: "c350d70f-5b30-4526-af77-2c5f223c4e04",
          NivelId: 2,
        },
      },
      {
        id: 1,
        nombre_nivel: "Inicial",
        Colegio_Nivel: {
          ColegioId: "c350d70f-5b30-4526-af77-2c5f223c4e04",
          NivelId: 1,
        },
      },
    ],
  },

  {
    Metodos: ["Montessori", "Reggio Emilia"],
    Dificultades: [
      "Dislexia (Dificultad para leer)",
      "Disgrafía (Dificultad para escribir)",
    ],
    area: 2500,
    numero_estudiantes: 60,
    Categoria: [
      {
        id: 8,
        nombre_categoria: "Mixto",
        imagen_categoria:
          "https://uploads-ssl.webflow.com/628021db5f1eee1db790ab78/62b3f782b03ee569be526697_Mixto.jpg",
        logo_categoria:
          "https://uploads-ssl.webflow.com/628021db5f1eee1db790ab78/62b558429a3cf14cd6a06c76_Mixto.png",
      },
      {
        id: 10,
        nombre_categoria: "Privado",
        imagen_categoria:
          "https://uploads-ssl.webflow.com/628021db5f1eee1db790ab78/62b544d64c3ed0b9f10d7b66_Privado.jpg",
        logo_categoria:
          "https://uploads-ssl.webflow.com/628021db5f1eee1db790ab78/62b5583418c0ba591e37979e_Private.png",
      },
    ],
    id: "bf85405d-3796-464a-987c-735b3099bf25",
    nombre_colegio: "Colegio Juan Pablo Peregrino",
    direccion: "A.h Jesus Oropeza Chonta Lima",
    telefono: "977400689",
    isActive: true,
    primera_imagen:
      "https://res.cloudinary.com/de4i6biay/image/upload/v1681351188/micole/wuy9g4xgqfyzxmjgokpn.png",

    galeria_fotos:
      '["https://res.cloudinary.com/de4i6biay/image/upload/v1681350823/micole/zdcvkw4c6tbld4uykv0h.jpg","https://res.cloudinary.com/de4i6biay/image/upload/v1681350823/micole/q7r4uxcivb5fowxhvjyx.jpg","https://res.cloudinary.com/de4i6biay/image/upload/v1681350823/micole/vds5whnsjskpz0yjybxl.jpg"]',

    logo: "https://res.cloudinary.com/de4i6biay/image/upload/v1681350803/micole/j7n5hpxz9ntfe8dd2n69.png",
    createdAt: "2022-12-23",
    Plan_Pago: {
      id: 1,
      nombre_plan_pago: "Free",
    },
    Distrito: {
      id: 32,
      nombre_distrito: "San Juan de Lurigancho",
    },
    Provincium: {
      id: 180,
      nombre_provincia: "Lima",
    },
    Vacantes: [
      {
        id: "38d23c76-24c4-4380-be68-34d89e64b9a6",
        alumnos_matriculados: 20,
        matricula: "354",
        cuota_pension: "354",
        cuota_ingreso: "0",
        capacidad: 30,
        año: 2023,
        ColegioId: "bf85405d-3796-464a-987c-735b3099bf25",
        GradoId: 4,
      },
      {
        id: "af23514f-9672-48c4-be4b-37b94834ba86",
        alumnos_matriculados: 20,
        matricula: "354",
        cuota_pension: "354",
        cuota_ingreso: "0",
        capacidad: 30,
        año: 2023,
        ColegioId: "bf85405d-3796-464a-987c-735b3099bf25",
        GradoId: 5,
      },
      {
        id: "71ad11ff-4545-4280-adca-6c1f8789ef75",
        alumnos_matriculados: 20,
        matricula: "354",
        cuota_pension: "354",
        cuota_ingreso: "0",
        capacidad: 30,
        año: 2023,
        ColegioId: "bf85405d-3796-464a-987c-735b3099bf25",
        GradoId: 6,
      },
      {
        id: "ea33de20-5d1d-4555-b68b-a8ee5efdf6f5",
        alumnos_matriculados: 20,
        matricula: "354",
        cuota_pension: "354",
        cuota_ingreso: "0",
        capacidad: 30,
        año: 2023,
        ColegioId: "bf85405d-3796-464a-987c-735b3099bf25",
        GradoId: 7,
      },
      {
        id: "a2789f05-f5e9-4c84-9682-272237aab03b",
        alumnos_matriculados: 20,
        matricula: "354",
        cuota_pension: "354",
        cuota_ingreso: "0",
        capacidad: 30,
        año: 2023,
        ColegioId: "bf85405d-3796-464a-987c-735b3099bf25",
        GradoId: 8,
      },
      {
        id: "f4e11147-1088-4fef-9f12-2695ae4f27a7",
        alumnos_matriculados: 20,
        matricula: "354",
        cuota_pension: "354",
        cuota_ingreso: "0",
        capacidad: 30,
        año: 2023,
        ColegioId: "bf85405d-3796-464a-987c-735b3099bf25",
        GradoId: 9,
      },
      {
        id: "d5131b12-dffa-4d57-a864-775d09d2c60d",
        alumnos_matriculados: 20,
        matricula: "354",
        cuota_pension: "354",
        cuota_ingreso: "0",
        capacidad: 30,
        año: 2023,
        ColegioId: "bf85405d-3796-464a-987c-735b3099bf25",
        GradoId: 10,
      },
      {
        id: "d66f6c4d-2fdc-44ac-92ff-418504283324",
        alumnos_matriculados: 20,
        matricula: "354",
        cuota_pension: "354",
        cuota_ingreso: "0",
        capacidad: 30,
        año: 2023,
        ColegioId: "bf85405d-3796-464a-987c-735b3099bf25",
        GradoId: 11,
      },
      {
        id: "674c2cf6-65f4-4ded-b11d-2e527b0d9bb2",
        alumnos_matriculados: 20,
        matricula: "354",
        cuota_pension: "354",
        cuota_ingreso: "0",
        capacidad: 30,
        año: 2023,
        ColegioId: "bf85405d-3796-464a-987c-735b3099bf25",
        GradoId: 12,
      },
      {
        id: "14f9e75c-849a-4b70-a7c3-6145c6422c71",
        alumnos_matriculados: 20,
        matricula: "354",
        cuota_pension: "354",
        cuota_ingreso: "0",
        capacidad: 30,
        año: 2023,
        ColegioId: "bf85405d-3796-464a-987c-735b3099bf25",
        GradoId: 13,
      },
      {
        id: "b262d62d-5252-456e-aac2-a4f6e2f5cd64",
        alumnos_matriculados: 20,
        matricula: "354",
        cuota_pension: "354",
        cuota_ingreso: "0",
        capacidad: 30,
        año: 2023,
        ColegioId: "bf85405d-3796-464a-987c-735b3099bf25",
        GradoId: 14,
      },
      {
        id: "1e554be0-0214-4323-83c5-6e35f83ab9f8",
        alumnos_matriculados: 20,
        matricula: "354",
        cuota_pension: "354",
        cuota_ingreso: "0",
        capacidad: 30,
        año: 2023,
        ColegioId: "bf85405d-3796-464a-987c-735b3099bf25",
        GradoId: 15,
      },
      {
        id: "d5f340ae-609b-4b6b-bcd6-008bda07491f",
        alumnos_matriculados: 20,
        matricula: "354",
        cuota_pension: "354",
        cuota_ingreso: "0",
        capacidad: 30,
        año: 2023,
        ColegioId: "bf85405d-3796-464a-987c-735b3099bf25",
        GradoId: 16,
      },
      {
        id: "0a5c700a-d272-45c3-a25c-5efa30ce8f44",
        alumnos_matriculados: 20,
        matricula: "354",
        cuota_pension: "354",
        cuota_ingreso: "0",
        capacidad: 30,
        año: 2023,
        ColegioId: "bf85405d-3796-464a-987c-735b3099bf25",
        GradoId: 17,
      },
    ],
    Nivels: [
      {
        id: 3,
        nombre_nivel: "Secundaria",
        Colegio_Nivel: {
          ColegioId: "bf85405d-3796-464a-987c-735b3099bf25",
          NivelId: 3,
        },
      },
      {
        id: 2,
        nombre_nivel: "Primaria",
        Colegio_Nivel: {
          ColegioId: "bf85405d-3796-464a-987c-735b3099bf25",
          NivelId: 2,
        },
      },
      {
        id: 1,
        nombre_nivel: "Inicial",
        Colegio_Nivel: {
          ColegioId: "bf85405d-3796-464a-987c-735b3099bf25",
          NivelId: 1,
        },
      },
    ],
  },

  {
    Metodos: ["Montessori", "Reggio Emilia"],
    Dificultades: [
      "Dislexia (Dificultad para leer)",
      "Disgrafía (Dificultad para escribir)",
    ],
    area: 2500,
    numero_estudiantes: 60,
    Categoria: [
      {
        id: 8,
        nombre_categoria: "Mixto",
        imagen_categoria:
          "https://uploads-ssl.webflow.com/628021db5f1eee1db790ab78/62b3f782b03ee569be526697_Mixto.jpg",
        logo_categoria:
          "https://uploads-ssl.webflow.com/628021db5f1eee1db790ab78/62b558429a3cf14cd6a06c76_Mixto.png",
      },
      {
        id: 10,
        nombre_categoria: "Privado",
        imagen_categoria:
          "https://uploads-ssl.webflow.com/628021db5f1eee1db790ab78/62b544d64c3ed0b9f10d7b66_Privado.jpg",
        logo_categoria:
          "https://uploads-ssl.webflow.com/628021db5f1eee1db790ab78/62b5583418c0ba591e37979e_Private.png",
      },
    ],
    id: "23e46126-65b3-4bbd-9f72-552bcfd96ffb",
    nombre_colegio: "San Ignacio del Progreso II",
    direccion: "Urb el Progreso Sector 2 Perú",
    telefono: "941558641",
    isActive: true,
    primera_imagen:
      "https://res.cloudinary.com/de4i6biay/image/upload/v1681405959/micole/ztos5vgiavbwdzjktvsj.jpg",
    galeria_fotos:
      '["https://res.cloudinary.com/de4i6biay/image/upload/v1681405974/micole/fcrvknhvwu6wizo8ta6z.jpg","https://res.cloudinary.com/de4i6biay/image/upload/v1681405974/micole/utpxvmejjml83y2l6i1i.jpg"]',

    logo: "https://res.cloudinary.com/de4i6biay/image/upload/v1681405738/micole/pftwllckxakvumpevdhz.jpg",
    createdAt: "2023-04-13",
    Plan_Pago: {
      id: 1,
      nombre_plan_pago: "Free",
    },
    Distrito: {
      id: 5,
      nombre_distrito: "Carabayllo",
    },
    Provincium: {
      id: 180,
      nombre_provincia: "Lima",
    },
    Vacantes: [
      {
        id: "a51199fa-9c03-4bb9-a0e8-df702a5a2bb8",
        alumnos_matriculados: 20,
        matricula: "150",
        cuota_pension: "180",
        cuota_ingreso: "0",
        capacidad: 30,
        año: 2023,
        ColegioId: "23e46126-65b3-4bbd-9f72-552bcfd96ffb",
        GradoId: 1,
      },
      {
        id: "74aa346c-96b9-4edf-81a5-1372c5dc88b2",
        alumnos_matriculados: 20,
        matricula: "150",
        cuota_pension: "180",
        cuota_ingreso: "0",
        capacidad: 30,
        año: 2023,
        ColegioId: "23e46126-65b3-4bbd-9f72-552bcfd96ffb",
        GradoId: 2,
      },
      {
        id: "8b8453fb-7d7c-4126-91ca-3403a72b3108",
        alumnos_matriculados: 20,
        matricula: "150",
        cuota_pension: "180",
        cuota_ingreso: "0",
        capacidad: 30,
        año: 2023,
        ColegioId: "23e46126-65b3-4bbd-9f72-552bcfd96ffb",
        GradoId: 3,
      },
      {
        id: "e76d4f39-9ff7-4ffc-be7a-b74dd258c273",
        alumnos_matriculados: 20,
        matricula: "150",
        cuota_pension: "180",
        cuota_ingreso: "0",
        capacidad: 30,
        año: 2023,
        ColegioId: "23e46126-65b3-4bbd-9f72-552bcfd96ffb",
        GradoId: 4,
      },
      {
        id: "21e00140-638c-43da-8c3e-755401f886e9",
        alumnos_matriculados: 20,
        matricula: "150",
        cuota_pension: "180",
        cuota_ingreso: "0",
        capacidad: 30,
        año: 2023,
        ColegioId: "23e46126-65b3-4bbd-9f72-552bcfd96ffb",
        GradoId: 5,
      },
      {
        id: "0827606e-9a1d-4c03-bbfb-7d869248e3ce",
        alumnos_matriculados: 20,
        matricula: "150",
        cuota_pension: "180",
        cuota_ingreso: "0",
        capacidad: 30,
        año: 2023,
        ColegioId: "23e46126-65b3-4bbd-9f72-552bcfd96ffb",
        GradoId: 6,
      },
      {
        id: "2fdacc18-6f7a-4c3e-aee8-1bf14f687dc9",
        alumnos_matriculados: 20,
        matricula: "150",
        cuota_pension: "180",
        cuota_ingreso: "0",
        capacidad: 30,
        año: 2023,
        ColegioId: "23e46126-65b3-4bbd-9f72-552bcfd96ffb",
        GradoId: 7,
      },
      {
        id: "ae91529a-eacc-41f4-8afe-6dd546f8f4b8",
        alumnos_matriculados: 20,
        matricula: "150",
        cuota_pension: "180",
        cuota_ingreso: "0",
        capacidad: 30,
        año: 2023,
        ColegioId: "23e46126-65b3-4bbd-9f72-552bcfd96ffb",
        GradoId: 8,
      },
      {
        id: "9d19aa3a-e7ed-4ae9-96bb-78849fb30c07",
        alumnos_matriculados: 20,
        matricula: "150",
        cuota_pension: "180",
        cuota_ingreso: "0",
        capacidad: 30,
        año: 2023,
        ColegioId: "23e46126-65b3-4bbd-9f72-552bcfd96ffb",
        GradoId: 9,
      },
      {
        id: "63c80e58-a001-4316-9b75-04a8c1ea9551",
        alumnos_matriculados: 20,
        matricula: "150",
        cuota_pension: "180",
        cuota_ingreso: "0",
        capacidad: 30,
        año: 2023,
        ColegioId: "23e46126-65b3-4bbd-9f72-552bcfd96ffb",
        GradoId: 10,
      },
      {
        id: "7732bdae-e91c-4293-a9d2-1b03a10a21fa",
        alumnos_matriculados: 20,
        matricula: "150",
        cuota_pension: "180",
        cuota_ingreso: "0",
        capacidad: 30,
        año: 2023,
        ColegioId: "23e46126-65b3-4bbd-9f72-552bcfd96ffb",
        GradoId: 11,
      },
      {
        id: "66158a9f-9520-4ca8-bb21-599f4a70c79f",
        alumnos_matriculados: 20,
        matricula: "150",
        cuota_pension: "180",
        cuota_ingreso: "0",
        capacidad: 30,
        año: 2023,
        ColegioId: "23e46126-65b3-4bbd-9f72-552bcfd96ffb",
        GradoId: 12,
      },
      {
        id: "e734186e-85cc-466a-9051-58e239aa4a2d",
        alumnos_matriculados: 20,
        matricula: "150",
        cuota_pension: "180",
        cuota_ingreso: "0",
        capacidad: 30,
        año: 2023,
        ColegioId: "23e46126-65b3-4bbd-9f72-552bcfd96ffb",
        GradoId: 13,
      },
      {
        id: "f75f4472-d812-47e5-9a03-e7872ca185e6",
        alumnos_matriculados: 20,
        matricula: "150",
        cuota_pension: "180",
        cuota_ingreso: "0",
        capacidad: 30,
        año: 2023,
        ColegioId: "23e46126-65b3-4bbd-9f72-552bcfd96ffb",
        GradoId: 14,
      },
      {
        id: "0b84efee-b9ca-4504-b454-8227cd216706",
        alumnos_matriculados: 20,
        matricula: "150",
        cuota_pension: "180",
        cuota_ingreso: "0",
        capacidad: 30,
        año: 2023,
        ColegioId: "23e46126-65b3-4bbd-9f72-552bcfd96ffb",
        GradoId: 15,
      },
      {
        id: "4dcffe05-4515-4f8c-aa81-e97b03d053f2",
        alumnos_matriculados: 20,
        matricula: "150",
        cuota_pension: "180",
        cuota_ingreso: "0",
        capacidad: 30,
        año: 2023,
        ColegioId: "23e46126-65b3-4bbd-9f72-552bcfd96ffb",
        GradoId: 16,
      },
      {
        id: "55dd68cb-da69-42fc-982a-562cf400fdb0",
        alumnos_matriculados: 20,
        matricula: "150",
        cuota_pension: "180",
        cuota_ingreso: "0",
        capacidad: 30,
        año: 2023,
        ColegioId: "23e46126-65b3-4bbd-9f72-552bcfd96ffb",
        GradoId: 17,
      },
    ],
    Nivels: [
      {
        id: 2,
        nombre_nivel: "Primaria",
        Colegio_Nivel: {
          ColegioId: "23e46126-65b3-4bbd-9f72-552bcfd96ffb",
          NivelId: 2,
        },
      },
      {
        id: 3,
        nombre_nivel: "Secundaria",
        Colegio_Nivel: {
          ColegioId: "23e46126-65b3-4bbd-9f72-552bcfd96ffb",
          NivelId: 3,
        },
      },
      {
        id: 1,
        nombre_nivel: "Inicial",
        Colegio_Nivel: {
          ColegioId: "23e46126-65b3-4bbd-9f72-552bcfd96ffb",
          NivelId: 1,
        },
      },
    ],
  },
];
export default function CardsSch() {
  const [rating, setRating] = React.useState(null);
  return (
    <div className={style.layout}>
      {colegios.map((c) => {
        return (
          <>
            <div className={style.containerCard}>
              {/* HEAD */}
              <div className={style.cardHead}>
                <img src={c.logo} alt={c.nombre_colegio} />
                <div className={style.cardHead_info}>
                  <p
                    style={{
                      fontWeight: "700",
                      color: "#0D263B",
                      fontSize: "1.8vh",
                    }}
                  >
                    {c.nombre_colegio}
                  </p>
                  <p>{c.Distrito.nombre_distrito}</p>
                  <div className="drop-shadow-md">
                    <Rating
                      name="simple-controlled"
                      value={c.rating / 2}
                      readOnly
                      max={5}
                    />
                  </div>
                </div>
              </div>
              <div>
                {/* SW*/}
                <div className={style.SW}>
                  <SwComparador
                    galeria={c.galeria_fotos}
                    primeraFoto={c.primera_imagen}
                  />
                </div>
                {/* BODY*/}
                <div className={style.bodyCard}>
                  <div className={style.bodyInfo}>
                  <div className={style.div}>
                      <p>{c.direccion}</p>
                  </div>
                  
                    {/* Tipo de escuela: */}
                    <div className={style.div}>
                      {c.Categoria.map((ca) => {
                        return (
                          <>
                            <div
                              style={{
                                display: "flex",
                                gap: "1vh",
                                fontSize: "1.6vh",
                              }}
                            >
                              <Pincon />
                              <p>{ca.nombre_categoria}</p>
                            </div>
                          </>
                        );
                      })}
                    </div>

                    {/* Cant. Alumnos: */}
                    <div className={style.div}>
                      <p>{c.numero_estudiantes}</p>
                    </div>

                    {/* Área */}
                    <div className={style.div}>
                      <p>{c.area}</p>
                    </div>

                    {/* Métodos de Aprendizaje: */}
                    <div className={style.div}>
                      {c.Metodos.map((m) => {
                        return (
                          <>
                            <div
                              key={m}
                              style={{
                                display: "flex",
                                gap: "1vh",
                                fontSize: "1.6vh",
                              }}
                            >
                              <Pincon />
                              <p>{m}</p>
                            </div>
                          </>
                        );
                      })}
                    </div>

                    {/* Neurodiversidad : */}
                    <div className={style.div}>
                      {c.Dificultades.map((d) => {
                        return (
                          <>
                            <div
                              key={d}
                              style={{
                                display: "flex",
                                gap: "1vh",
                                fontSize: "1.6vh",
                              }}
                            >
                              <Pincon />
                              <p>{d}</p>
                            </div>
                          </>
                        );
                      })}
                    </div>

                    {/* Acreditaciones: */}
                    {/*Infraestructura:: */}
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
}
