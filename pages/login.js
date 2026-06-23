exports.LoginPage = class LoginPage {

    constructor(page) {

        this.page = page
        this.username_textbox = page.getByLabel('Username')
        this.password_textbox = page.getByLabel('Password')
        this.login_button = page.getByRole('button', { name: 'Login' })
    }

    async gotoLoginPage(){
        console.log('Opening The Internet login page')
        await this.page.goto('https://the-internet.herokuapp.com/login');
    }

    async login(username, password){
        console.log(`Entering username: ${username}`)
        await this.username_textbox.fill(username)
        console.log('Entering password')
        await this.password_textbox.fill(password)
        console.log('Submitting login form')
        await this.login_button.click()
    }
}
