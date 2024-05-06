// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import addContext from 'mochawesome/addContext';

Cypress.Commands.add('addContext', (context) => {
  cy.once('test:after:run', (test) => addContext({ test }, context));
});


Cypress.Commands.add('checkElementLinkHealth', (selector) => {
  // Get all elements matching the selector
  cy.get(selector).each(($element) => {
    // Get the href attribute of the element
    cy.wrap($element).invoke('attr', 'href').then((href) => {
      // Check if href exists
      if (href) {
        // Make an HTTP request to the link URL
        cy.request(href).then((response) => {
          // Check the response status code
          if (response.status === 200) {
            // Link is alive
            cy.log('Link is alive');
          } else {
            // Link is dead or returned an error status code
            cy.log(`Link is dead or returned status code: ${response.status}`);
          }
        });
      } else {
        // href attribute is not found
        cy.log('Link href attribute is not found');
      }
    });
  });
});

Cypress.Commands.add('checkImageHealth', (selector) => {
  // Get all elements matching the selector
  cy.get(selector).each(($element) => {
    // Get the currentSrc property of the image
    cy.wrap($element).invoke('prop', 'currentSrc').then((src) => {
      // Check if src exists
      if (src) {
        // Make an HTTP request to the image URL
        cy.request(src).then((response) => {
          // Check the response status code
          if (response.status === 200) {
            // Image is loaded
            cy.log('Image is loaded');
          } else {
            // Image failed to load or returned an error status code
            cy.log(`Image failed to load or returned status code: ${response.status}`);
          }
        });
      } else {
        // currentSrc property is not found
        cy.log('Image currentSrc property is not found');
      }
    });
  });
});

Cypress.Commands.add('getElementOrError', (selector) => {
  cy.get(selector)
    .then(($element) => {
      if ($element.length === 0) {
        throw new Error(`Element with selector '${selector}' not found`);
      }
      return $element;
    });
});


Cypress.Commands.add('acceptAllCookies', () => {
  cy.contains('Cookie Einstellungen').click()
  cy.wait(5000)
  cy.contains('Alle akzeptieren').should('be.visible')
  cy.contains('Alle akzeptieren').click()
});

//this is an experemental implementation to cover case when there's no element on the page
Cypress.Commands.add('checkIfElementExists', (selector, callback = null, existMessage = '', notExistMessage = '') => {
  // Use JavaScript DOM manipulation to check if the element exists
  cy.document().then(doc => {
    const elements = doc.querySelectorAll(selector);
    if (elements.length > 0) {
      // Elements exist
      elements.forEach((element, index) => {
        if (typeof callback === 'function') {
          // Execute the callback function for each element
          callback(element, index); 
        } else {
          const logMessage = existMessage ? existMessage : `Element '${selector}' exists`;
          cy.log(logMessage);
        }
      });
    } else {
      // Elements do not exist
      const logMessage = notExistMessage ? notExistMessage : `Element '${selector}' does not exist`;
      cy.log(logMessage);
    }
  });
});





// Cypress.Commands.add('checkIfElementExists', (selector, callback = null) => {
//   // Check if the element exists
//   cy.get(selector).then(($elements) => {
//     if ($elements.length > 0) {
//       // Iterate over each element found by the selector
//       $elements.each((index, element) => {
//         // Check if callback is a function before executing it
//         if (typeof callback === 'function') {
//           // Execute the callback function for each element
//           callback(element); 
//         } else {
//           cy.log(`Element exists`);
//         }
//       });
//     } else {
//       cy.log(`Element does not exist`);
//     }
//   });
// });

Cypress.Commands.add('softAssert', (condition, message) => {
  if (!condition) {
    cy.log(`Soft assertion failed: ${message}`);
  }
});

Cypress.Commands.add('checkTextContains', (selector, expectedText) => {
  cy.get(selector).invoke('text').then((text) => {
    try {
      expect(text).to.include(expectedText);
      cy.addContext('Test passed, here is additional info:')
    } catch (error) {
      cy.addContext('Test failed, here is additional info:')
    }
  });
});

Cypress.Commands.add('executeScriptForPortals', (scenario, portalNames) => {
  
    const executeScriptForPortal = (portal) => {
      // Execute your script here for the provided portal
      console.log(`Executing script for portal: ${portal.name}`);
      // Replace the console.log statement with your actual script execution logic
    };
  
    switch (scenario) {
      case 'all':
        portalsData.portals.forEach((portal) => {
          executeScriptForPortal(portal);
        });
        break;
      case 'random':
        const randomIndex = Math.floor(Math.random() * portalsData.portals.length);
        executeScriptForPortal(portalsData.portals[randomIndex]);
        break;
      case 'list':
        portalNames.forEach((portalName) => {
          const portal = portalsData.portals.find((p) => p.name === portalName);
          if (portal) {
            executeScriptForPortal(portal);
          } else {
            console.log(`Portal with name "${portalName}" not found.`);
          }
        });
        break;
      case 'type':
        const type = portalNames[0];
        const portalsOfType = portalsData.portals.filter((portal) => portal.type === type);
        portalsOfType.forEach((portal) => {
          executeScriptForPortal(portal);
        });
        break;
      default:
        console.log('Invalid scenario');
    }
  });
  