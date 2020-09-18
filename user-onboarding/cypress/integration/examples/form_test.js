describe("My First Test", function () {
  //act
  it("Does not do much", function () {
    //assert
    expect(true).to.equal(true);
  });
});
describe("Input Navigation", function () {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  const nameInput = () => cy.get("input[name=name]");
  const emailInput = () => cy.get("input[name=email]");
  const passwordInput = () => cy.get("input[name=password]");
  const checkbox = () => cy.get("input[name=terms]");
  const submitBtn = () => cy.get(".btn");

  it("Submit btn should be disabled at first", function () {
    submitBtn().should("have.class", "disabled");
  });
  it("nameInput works", function () {
    nameInput()
      .should("exist")
      .type("John Smith")
      .should("have.value", "John Smith");
  });
  it("emailInput works", function () {
    emailInput()
      .should("exist")
      .type("john@smith.io")
      .should("have.value", "john@smith.io");
  });
  it("passwordInput works", function () {
    passwordInput()
      .should("exist")
      .type("123456")
      .should("have.value", "123456");
  });
  it("checkbox works", function () {
    checkbox().should("exist").check().should("be.checked");
  });
  it("user should be able to submit a form", function () {
    nameInput().type("John Smith").should("have.value", "John Smith");

    emailInput().type("john@smith.io").should("have.value", "john@smith.io");

    passwordInput().type("123456").should("have.value", "123456");

    checkbox().check().should("be.checked");

    submitBtn().should("have.class", "active");
    submitBtn().click();
    cy.contains(/John Smith/).should("exist");

    emailInput().should("have.value", "");
    checkbox().should("not.be.checked");
  });
  it("user should not be able to submit a form if the form is not complete", function () {
    nameInput().type("Johnny Smith").should("have.value", "Johnny Smith");

    passwordInput().type("123456").should("have.value", "123456");

    checkbox().check().should("be.checked");

    submitBtn().should("have.class", "disabled");
    submitBtn().click();
    cy.contains(/Johnny Smith/).should("not.exist");
  });
});
