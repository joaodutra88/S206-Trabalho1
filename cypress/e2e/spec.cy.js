/// <reference types="cypress"/>

describe("Criando cenário de teste para o site Spotify", () => {
   it("Caso de teste: Pesquisando artista especifico com sucesso.", () => {
      //visitando a pagina inicial de test
      cy.viewport(1000, 1300);
      cy.visit("https://open.spotify.com");
      cy.get(
         ":nth-child(2) > .link-subtle > .Type__TypeElement-sc-goli3j-0"
      ).click();
      cy.get('[data-testid="search-input"]').type("Imagine Dragons");
      cy.get(
         ".sm7ZnbOO1Zfg9cupYgPN > .Nqa6Cw3RkDMV8QnYreTr > .Type__TypeElement-sc-goli3j-0"
      ).should("contain.text", "Imagine Dragons");
   });
   it("Caso de teste: Mudando idioma do site com sucesso.", () => {
      //visitando a pagina inicial de test
      cy.viewport(1000, 1300);
      cy.visit("https://open.spotify.com");
      cy.get('[data-testid="language-selection-button"]').click();
      cy.get('[data-testid="language-option-de"]').click();
      cy.get(
         ".GlueDropTarget > .link-subtle > .Type__TypeElement-sc-goli3j-0"
      ).should("contain.text", "Bibliothek");
   });
   it("Caso de teste: Pesquisando música especifica com sucesso.", () => {
      //visitando a pagina inicial de test
      cy.viewport(1000, 1300);
      cy.visit("https://open.spotify.com");
      cy.get(
         ":nth-child(2) > .link-subtle > .Type__TypeElement-sc-goli3j-0"
      ).click();
      cy.get('[data-testid="search-input"]').type("Sharks imagine dragons");
      cy.get(
         '[href="/search/Sharks%20imagine%20dragons/tracks"] > .Chip__ChipComponent-sc-ry3uox-0 > .ChipInner__ChipInnerComponent-sc-1ly6j4j-0'
      ).click();
      cy.get(
         '[aria-rowindex="2"] > [data-testid="tracklist-row"] > .gvLrgQXBFVW6m9MscfFA > .iCQtmPqY0QvkumAOuCjr > a.t_yrXoUO3qGsJS4Y6iXX > .Type__TypeElement-sc-goli3j-0'
      ).should("contain.text", "Sharks");
      cy.get(
         '[aria-rowindex="2"] > [data-testid="tracklist-row"] > .gvLrgQXBFVW6m9MscfFA > .iCQtmPqY0QvkumAOuCjr > .fjvaLo > a'
      ).should("contain.text", "Imagine Dragons");
   });
   it("Caso de teste: Criando um usuário no spotify com erro de e-mail.", () => {
      //visitando a pagina inicial de test
      cy.viewport(1000, 1300);
      cy.visit("https://open.spotify.com");
      cy.get(
         '[data-testid="signup-bar"] > .Button-sc-qlcn5g-0 > .ButtonInner-sc-14ud5tc-0'
      ).click();
      cy.get("#email").type("emailerrado");
      cy.get("#password").type("passworderrada");
      cy.get(".Text-sc-g5kv67-0 > .LinkContainer-sc-1t58wcv-0").should(
         "contain.text",
         "This email is invalid. Make sure it's written like example@email.com"
      );
   });
   it("Caso de teste: Criando um usuário no spotify com erro de dia do nascimento.", () => {
      //visitando a pagina inicial de test
      let info = criarUsuario();
      cy.get("#day").type("90");
      cy.get("#year").type("2010");
      cy.get(
         '[data-testid="dob-error-messages-parent"] > .Help-sc-1xezfve-0 > .Text-sc-g5kv67-0'
      ).should("contain.text", "Enter a valid day of the month.");
   });
   it("Caso de teste: Criando um usuário no spotify com erro do ano de nascimento.", () => {
      //visitando a pagina inicial de test
      let info = criarUsuario();
      cy.get("#day").type("22");
      cy.get("#year").type("2000");
      cy.get(
         ":nth-child(1) > .Label-sc-17gd8mo-0 > .Indicator-sc-hjfusp-0"
      ).click();
      cy.get(
         ":nth-child(6) > .Checkbox-sc-svpvf6-0 > .Label-sc-cpoq-0 > .Indicator-sc-1airx73-0"
      ).click();
      cy.get(
         ":nth-child(8) > .Checkbox-sc-svpvf6-0 > .Label-sc-cpoq-0 > .Indicator-sc-1airx73-0"
      ).click();
      cy.get(
         ".SignupButton__ButtonContainerSignup-cjcq5h-0 > .Button-sc-qlcn5g-0 > .ButtonInner-sc-14ud5tc-0"
      ).click();
      cy.get(
         '[data-testid="dob-error-messages-parent"] > .Help-sc-1xezfve-0 > .Text-sc-g5kv67-0'
      ).should("contain.text", "Select your birth month.");
   });
});

function criarUsuario() {
   let horas = new Date().getHours().toString();
   let min = new Date().getMinutes().toString();
   let seg = new Date().getSeconds().toString();
   let username = "login" + horas + min + seg;
   let password = "pass" + horas + min + seg;

   let userinfo = [username, password];

   cy.viewport(1000, 1300);
   cy.visit("https://open.spotify.com");
   cy.get(
      '[data-testid="signup-bar"] > .Button-sc-qlcn5g-0 > .ButtonInner-sc-14ud5tc-0'
   ).click();
   cy.get("#email").type(`${username}@gmail.com`);
   cy.get("#password").type(password);
   cy.get("#displayname").type(username);

   return userinfo;
}
