import users from '../fixtures/users.json'

import loginPage from '../support/pages/LoginPage'
import studentPage from '../support/pages/StudentPage'

describe('Login', () => {
    it('Should login with admin profile', () => {
        const user = users.admin

        loginPage.doLogin(user)
        studentPage.navbar.userLoggedIn(user.name)
    })

    it('Should not login with wrong password', () => {
        const user = users.inv_pass

        loginPage.doLogin(user)
        loginPage.popup.haveText('Suas credenciais são inválidas, por favor tente novamente!')
    })

    it('Should not login with unregistered email', () => {
        const user = users.email_not_found

        loginPage.doLogin(user)
        loginPage.popup.haveText('Suas credenciais são inválidas, por favor tente novamente!')
    })

    it('Should not login with invalid emails', () => {
        const emails = users.inv_emails

        let outputMessages = []
        let expectedMessages = []

        loginPage.go()

        emails.forEach((u) => {
            loginPage.fill(u)
            loginPage.submit()

            loginPage.popup.content()
                .invoke('text')
                .then((t) => {
                    cy.log(t)
                    outputMessages.push(t)
                    expectedMessages.push('Insira um email válido.')
                })
            
                loginPage.popup.back()
        })

        cy.wrap(outputMessages).should('deep.equal', expectedMessages)

    })

    it('Should not login with empty email', () => {
        const user = users.empty_email

        loginPage.doLogin(user)
        loginPage.popup.haveText('Os campos email e senha são obrigatórios.')
    })

    it('Should not login with empty password', () => {
        const user = users.empty_password

        loginPage.doLogin(user)
        loginPage.popup.haveText('Os campos email e senha são obrigatórios.')
    })
})