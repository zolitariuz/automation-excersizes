describe('Ejercicio de Pruebas', () => {
  it('Prueba 1 - Dar de alta un usuario', () => {
    cy.clearCookies(); // Limpiar cookies
    cy.clearLocalStorage(); // Limpiar almacenamiento local

    cy.visit('https://www.demoblaze.com', { timeout: 30000, force: true });
    cy.document().its('readyState').should('equal', 'complete');
    cy.log('Página cargada con éxito');

    //Cerrar modal si es que está abierto
    cy.get('#signInModal.modal.fade').then(($modal) => {
      if ($modal.is(':visible')) {
        cy.log('Sign Up modal está abieerto');
        // Si el modal está abierto, hacer clic en el botón que lo cierra (ajusta el selector según tu página)
        cy.get('#signInModal.modal.fade:visible .close').click();
      }
    });

    // Abrir formulario de registro
    cy.get('#signin2').click();
    cy.log('Sign In clickeado');
    cy.get('#signInModal.modal.fade').should('be.visible');

    // Interactuar con el formulario de registro
    cy.get('#sign-username').type('testraulv3');
    cy.get('#sign-password').type('password');
    cy.get('#signInModal .btn-primary').click();

    // Escuchar el evento 'window:alert' y manejar el alert
    // cy.on('window:alert', (alertText) => {
    //   expect(alertText).to.equal('Usuario creado correctamente');  // Ajusta el mensaje según lo que muestra el alert
    // });

    // Asegurarse de que el alert se maneje antes de continuar con otras acciones
    //cy.get('body').should('not.contain', 'Usuario creado correctamente');  // Espera a que el alert desaparezca
  });

  it('Prueba 2 - Login y logout con el usuario dado de alta', () => {
    cy.visit('https://www.demoblaze.com');

    // Abrir formulario de login
    cy.get('#login2').click(); // Hacer clic en el botón "Login"
    cy.log('Log in clickeado');
    cy.get('#logInModal.modal.fade').should('be.visible');

    // Interacuar con el formulario de login
    cy.get('#loginusername').type('testraulv3');
    cy.get('#loginpassword').type('password');
    cy.get('#logInModal .btn-primary').click(); // Hacer clic en el botón "Log in"
    cy.get('#logInModal.modal.fade').should('not.be.visible');

    // Verificar que el usuario ha iniciado sesión
    cy.get('#nameofuser').should('exist');
    cy.contains('Welcome ').should('exist');

    // Realizar logout
    cy.get('#logout2').click(); // Hacer clic en el botón "Logout"

    // Verificar que el usuario ha cerrado sesión
    cy.contains('Welcome').should('not.exist');
  });

  it('Prueba 3 - Agregar una laptop al carrito', () => {
    cy.visit('https://www.demoblaze.com');

    // Encuentra y haz clic en el botón "Agregar al carrito" de una laptop específica (ajusta el selector según tu página)
    cy.get('#contcont .list-group #itemc:nth-child(3)').click();

    cy.wait(4000);

    cy.get('.col-lg-4.col-md-6.mb-4').first().click();

    cy.wait(4000);

    // Encuentra y haz clic en el botón "Agregar al carrito" de una laptop específica (ajusta el selector según tu página)
    cy.contains('Add to cart').click();

    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('Product added'); // Ajusta el texto según el mensaje de tu alert
    });
  });

  it('Prueba 4 - Comprobar que se agregó al carrito', () => {
    // Tu código de prueba aquí
  });
});
