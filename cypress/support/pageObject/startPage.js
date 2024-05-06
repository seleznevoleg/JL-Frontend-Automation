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
      const clearFavJobFromTheList = () => {
        cy.get(selectorsData.favJobListDropdown).click()
        cy.get(selectorsData.favJobAdTrashIcon).each(($icon) => {
          cy.wrap($icon).click()
        })
      }
      cy.checkIfElementExists(selectorsData.favJobListDropdown, clearFavJobFromTheList)
    }

    //click of on fav icon and check if it is changed
    clickFavAndCheck(){
      //If needed, fav button could be the function parameter
      
      let favCount = 0

      //Defining function: click on job ad, assert favicon
      const favClickandCheck = (element) => {
        cy.wrap(element).click()
        cy.wrap(element).find('.bi-heart-fill').should('exist')
        favCount++
      }
      
      cy.checkIfElementExists(selectorsData.favButton, favClickandCheck)
      
      cy.get('.FavoritedJobs__text').invoke('text').then((text) => {
        // Extract the numeric value using regular expression
        const numericValue = parseInt(text.match(/\d+/)[0]);
      
        // Assert the numeric value with the existing variable favCount
        cy.wrap(numericValue).should('eq', favCount);
      });
      
    }
    
}

export const onStartPage = new StartPage ()