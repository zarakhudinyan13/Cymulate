import user from  '../fixtures/user.json';

const username = user.username
const password = user.password

describe(' Web Application Firewall Reports Test', { testIsolation: false },  () => {
  before(() => {
    cy.login(username , password);
  })

  it('Validates WAF report details and downloads CSV', () => {
    cy.wait(5000)
    cy.contains('Reports').click();
    cy.xpath( '//a[@href="/cym/waf_reports/?client=prod1"]/div[text()="History "]').click();
    // XPath to click on the first element containing "Completed"
    cy.xpath(`//*[@id="assessment-history"]/div[2]/div/div[4]/div[1]/div/div/div[2]/div[1]/div/div/div[2]/div`).first().click();
    // Validate the WAF URL 
    cy.xpath("//div[text()='https://ekslabs.cymulatedev.com']").should('exist');
    
      // Validate the assessment status is completed
    cy.contains('Assessment Status').next().should('have.text', 'Completed');

    // Validate the overall score is  X In this case it's 100
    cy.contains('Assessment Score').next().invoke('text').then((text) => {
      // Extracts the numeric score from the text
      const score = text.match(/\b100\b/);  // depends on a requirements
    });
    
    // Generates the CSV report and validates validate that the file has been added to the download manager
    cy.contains('Generate Report').click();
    cy.contains('CSV').click( {force: true} );
    cy.xpath(`//*[@id="cym-app"]/div[14]/div[5]`).should('exist')
   })


})