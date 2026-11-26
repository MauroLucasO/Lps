describe("Funcionalidade de Cadastro e Autenticação de Administrador", () => {
  const sufixo = Date.now();
  const loginValido = `admin.${sufixo}@teste.com`;
  const senhaValida = "admin123";
  const cpfValido = "12345678901";

  it("Caso 01 - Deve navegar da tela de Login para a tela de Cadastro de Administrador", () => {
    cy.visit("/login");
    cy.contains("button", "Cadastrar").click();

    cy.url().should("include", "/cadastro-admin");
    cy.contains("Cadastro de Administrador").should("be.visible");
  });

  it("Caso 02 - Deve cadastrar um novo administrador com dados válidos", () => {
    cy.visit("/cadastro-admin");

    cy.get("#inputCpf").type(cpfValido);
    cy.get("#inputLogin").type(loginValido);
    cy.get("#inputSenha").type(senhaValida);
    cy.get("#inputSenhaRepeticao").type(senhaValida);

    cy.contains("button", "Cadastrar").click();

    cy.contains(`Administrador ${loginValido} cadastrado com sucesso!`).should("be.visible");
    cy.url().should("eq", `${Cypress.config("baseUrl")}/`);
  });

  it("Caso 03 - Deve exibir erro quando as senhas não conferem no cadastro", () => {
    cy.visit("/cadastro-admin");

    cy.get("#inputCpf").type(cpfValido);
    cy.get("#inputLogin").type(`dif.${sufixo}@teste.com`);
    cy.get("#inputSenha").type("senha123");
    cy.get("#inputSenhaRepeticao").type("outraSenha");

    cy.contains("button", "Cadastrar").click();

    cy.contains("Senhas não conferem").should("be.visible");
    cy.url().should("include", "/cadastro-admin");
  });

  it("Caso 04 - Deve exibir erro ao tentar cadastrar com campos obrigatórios em branco", () => {
    cy.visit("/cadastro-admin");

    cy.contains("button", "Cadastrar").click();

    cy.get(".toast-error").should("be.visible");
    cy.url().should("include", "/cadastro-admin");
  });

  it("Caso 05 - Deve autenticar com credenciais válidas, salvar token e redirecionar", () => {
    cy.visit("/login");

    cy.get("#inputLogin").type(loginValido);
    cy.get("#inputSenha").type(senhaValida);
    cy.contains("button", "Entrar").click();

    cy.url().should("eq", `${Cypress.config("baseUrl")}/`);
    cy.window().then((win) => {
      const token = win.localStorage.getItem("meu_token");
      expect(token).to.be.a("string").and.not.be.empty;
    });
  });

  it("Caso 06 - Deve exibir alerta de erro e limpar campos com credenciais inválidas ou botão Cancelar", () => {
    cy.visit("/login");

    cy.get("#inputLogin").type(loginValido);
    cy.get("#inputSenha").type("senhaErrada");

    const stubAlert = cy.stub().as("alertaLogin");
    cy.on("window:alert", stubAlert);

    cy.contains("button", "Entrar").click();

    cy.get("@alertaLogin").should("have.been.calledWith", "Erro ao logar. Verifique seu login e senha.");

    cy.contains("button", "Cancelar").click();
    cy.get("#inputLogin").should("have.value", "");
    cy.get("#inputSenha").should("have.value", "");
  });
});