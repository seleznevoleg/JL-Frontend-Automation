const selectorsData = require('../../fixtures/selectorsStartPage.json')

export class StartPage {

    verifyKeywordSuggestionList(){
        cy.get(selectorsData.keyWordField).clear().type('Ver')
        cy.get(selectorsData.dropdownElement).should('be.visible')
        cy.get(selectorsData.suggestionList).then(suggestionList => {
            cy.wrap(suggestionList).should('contain', 'Ver')
        })
    }

    verifyLocationSuggestionList(){
        cy.get(selectorsData.locationField).clear().type('Da')
        cy.get(selectorsData.dropdownElement).should('be.visible')
        cy.get(selectorsData.suggestionList).then(suggestionList => {
            cy.wrap(suggestionList).should('contain', 'Da') 
        })
    }

    // compareNumberOfRegions(){
        
    // }
    regionCount() {
        let count1;
        let count2;
      
        cy.get(selectorsData.regionItemPills).children().its('length').then(length => {
          count2 = length;
        });
      
        cy.get(selectorsData.regionItemsList).children().its('length').then(length => {
          count1 = length;
        });
      
        return cy.wrap().then(() => {
          return {
            count1: count1,
            count2: count2
          };
        });
    }
    
    // checkVideoElement(selector) {
    //     //Check comapny logo
    //     cy.checkImageHealth(selector)
    //     //Check company link
    //     cy.checkElementLinkHealth(selector)
    // }

    //clear all fav job ads
    clearAllFavoriteJobAds(){
      cy.get(body).find('')
    }

    //click of on fav icon and check if it is changed
    clickFavAndCheck(){
      //If needed, fav button could be the function parameter
      cy.get(selectorsData.favButton).click()
      
    }
    
}

export const onStartPage = new StartPage ()