describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "User",
      username: "user",
      password: "pass",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("Login from is shown", function () {
    cy.contains("username");
    cy.contains("password");
  });

  describe("Login", function () {
    it("fails with wrong credentials", function () {
      cy.get("#username").type("wrong");
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();
      cy.contains("Wrong username or password.");
    });
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("user");
      cy.get("#password").type("pass");
      cy.get("#login-button").click();
      cy.contains("User logged in");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.get("#username").type("user");
      cy.get("#password").type("pass");
      cy.get("#login-button").click();
    });

    it("A blog can be created", function () {
      cy.contains("New blog").click();
      cy.get("#title").type("Title");
      cy.get("#author").type("Author");
      cy.get("#url").type("Url");
      cy.get("#createButton").click();
      cy.contains("Title Author");
    });

    it("User can like a blog", function () {
      cy.contains("New blog").click();
      cy.get("#title").type("Title");
      cy.get("#author").type("Author");
      cy.get("#url").type("Url");
      cy.get("#createButton").click();
      cy.contains("View").click();
      cy.get("#like").click();
      cy.contains("View").click();
      cy.contains("Likes 1");
    });

    it("User can remove a blog", function () {
      cy.contains("New blog").click();
      cy.get("#title").type("Title");
      cy.get("#author").type("Author");
      cy.get("#url").type("Url");
      cy.get("#createButton").click();
      cy.visit("http://localhost:3000");
      cy.contains("View").click();
      cy.contains("Remove").click();
    });

    it("Blogs are ordered according to likes with the blog with the most likes being first", function () {
      cy.contains("New blog").click();
      cy.get("#title").type("Title");
      cy.get("#author").type("Author");
      cy.get("#url").type("Url");
      cy.get("#createButton").click();
      cy.contains("View").click();
      cy.get("#like").click();
      cy.contains("New blog").click();
      cy.get("#title").type("Title2");
      cy.get("#author").type("Author2");
      cy.get("#url").type("Url2");
      cy.get("#createButton").click();
      cy.contains("View").click();
      cy.contains("View").click();
      cy.get("#blogLikes").then((blogLikes) => {
        cy.wrap(blogLikes[0]).contains("Likes 1");
      });
    });
  });
});
