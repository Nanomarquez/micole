const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Cita',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      fecha_cita: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'El campo fecha_cita no puede estar vacío',
          },
          validarFecha: function (fecha) {
            if (fecha < new Date()) {
              throw new Error(
                'La fecha de la cita debe ser en días posteriores al actual'
              );
            }
          },
        },
      },
      hora_cita: {
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'El campo hora_cita no puede estar vacío',
          },
          validarHora: function (hora) {
            if (hora < '00:00' || hora > '23:59') {
              throw new Error(
                'La hora de la cita debe estar entre 00:00 y 23:59'
              );
            }
          },
        },
      },
      modalidad: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Presencial',
        validate: {
          customValidator: (value) => {
            const enums = ['Presencial', 'Virtual'];
            if (!enums.includes(value)) {
              // Use Array.includes() to validate.
              throw new Error('not a valid option');
            }
          },
        },
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          is: {
            args: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
            msg: 'El nombre solo puede contener letras, acentos, tildes y espacios',
          },
          len: {
            args: [2, 60],
            msg: 'El nombre debe tener entre 2 y 60 letras',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            args: true,
            msg: 'Ingresa un email valido',
          },
        },
      },
      telefono: {
        type: DataTypes.BIGINT,
        unique: true,
        validate: {
          isInt: {
            args: true,
            msg: 'El número telefónico solo debe contener números',
          },
        },
      },
    },
    {
      timestamps: false,
    }
  );
};
