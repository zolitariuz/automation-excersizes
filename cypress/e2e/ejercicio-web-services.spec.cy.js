// Importa el módulo 'chai' para realizar afirmaciones
import chai from 'chai';

// Configura chai para trabajar con Cypress
chai.use(require('chai-json-schema'));

// Establece la expectativa global para el esquema JSON
const expect = chai.expect;

describe('Ejercicio de Automatización de API', () => {
  it('Agregar una mascota mediante POST y validar el response', () => {
    // Definir la nueva mascota
    const newPet = {
      id: 1,
      name: 'Fido',
      status: 'available',
    };

    // Realizar la solicitud POST para agregar la mascota
    cy.request({
      method: 'POST',
      url: 'https://petstore.swagger.io/v2/pet',
      body: newPet,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      // Validar el código de estado esperado
      expect(response.status).to.equal(200);

      // Validar el esquema del response
      expect(response.body).to.be.jsonSchema({
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          status: { type: 'string' },
        },
        required: ['id', 'name', 'status'],
      });

      // Almacenar el ID de la mascota para usarlo en las siguientes operaciones
      cy.wrap(response.body.id).as('petId');
    });
  });

  it('Obtener una mascota existente mediante GET y validar el response', function () {
    // Utilizar el ID de la mascota almacenado en el paso anterior
    const petId = this.petId;

      cy.log(petId);

    // Realizar la solicitud GET para obtener la mascota
    cy.request(`https://petstore.swagger.io/v2/pet/${petId}`).then((response) => {
      // Validar el código de estado esperado
      expect(response.status).to.equal(200);

      // Validar el esquema del response
      expect(response.body).to.be.jsonSchema({
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          status: { type: 'string' },
        },
        required: ['id', 'name', 'status'],
      });
    });
  });

  it('Modificar una mascota existente mediante PUT y validar el response', function () {
    // Utilizar el ID de la mascota almacenado en el primer paso
    const petId = this.petId;

    // Definir los datos actualizados de la mascota
    const updatedPet = {
      id: petId,
      name: 'Fido Actualizado',
      status: 'sold',
    };

    // Realizar la solicitud PUT para modificar la mascota
    cy.request({
      method: 'PUT',
      url: `https://petstore.swagger.io/v2/pet`,
      body: updatedPet,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      // Validar el código de estado esperado
      expect(response.status).to.equal(200);

      // Validar el esquema del response
      expect(response.body).to.be.jsonSchema({
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          status: { type: 'string' },
        },
        required: ['id', 'name', 'status'],
      });
    });
  });
});
