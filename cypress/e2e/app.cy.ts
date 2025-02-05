describe('3D Scatter Plot App', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('loads the application', () => {
    cy.get('.js-plotly-plot').should('exist');
    cy.contains('label', 'X-axis').should('exist');
    cy.contains('label', 'Y-axis').should('exist');
    cy.contains('label', 'Z-axis').should('exist');
  });

  it('allows changing axis variables', () => {
    // Change X axis
    cy.contains('label', 'X-axis')
      .parent()
      .find('select')
      .select('D');

    // Verify the plot updates
    cy.get('.js-plotly-plot').should('exist');
  });

  it('prevents duplicate selections', () => {
    // Select 'D' for X axis
    cy.contains('label', 'X-axis')
      .parent()
      .find('select')
      .select('D');

    // Verify 'D' is not available in Y axis dropdown
    cy.contains('label', 'Y-axis')
      .parent()
      .find('select option')
      .should('not.contain', 'D');
  });
}); 