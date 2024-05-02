/// <reference types="cypress" />

const portalData = require('../../fixtures/portals_staging_full.json')
import addContext from 'mochawesome/addContext';



describe('Verifying that each occupation on each portal has a mfd suffix in title', () => {
    
    //Now only for one portal, than it could be executed for all
    const portal = 'https://route:wipeout@test.muenchenerjobs.de'
        
    it(`Check links on portal MUC`, () => {
        
        cy.visit(portal + '/berufe');
        
        cy.get('.list-group-item > a').each(($link, index) => {
            const href = $link.attr('href'); // Get the href attribute
                
            cy.visit(portal + href);
            cy.checkTextContains('.col-md-8.order-last > :nth-child(1) > .col-12', '(m/w/d)');
            cy.addContext(href)
            cy.go(-1); // Navigate back to the original page
        });
            
    });            
            
})



// describe('Verifying that each occupation on each portal has a mfd suffix in title', () => {
    
//     let totalLinks;
//     let i

//       before(() => {
//         cy.visit(portal + '/berufe');
//         cy.get('.list-group-item > a').then(($links) => {
//           totalLinks = $links.length;
//         });
//       });
  
//       Cypress._.times(totalLinks, () => {
        
//         it(`Check link ${i + 1} on portal MUC`, () => {
//             cy.visit(portal + '/berufe');
//             cy.get('.list-group-item > a').eq(i).click();
//             cy.get('.col-md-8.order-last > :nth-child(1) > .col-12').should('contain', '(m/w/d)');
//             cy.go(-1); // Navigate back to the original page
//             i=+i
//         });

//       })
    
//   });