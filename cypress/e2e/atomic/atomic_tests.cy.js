import { Dashboard } from "../page-objects/dashboard_page";
import { LoginPage } from "../page-objects/login_page";


const testData = {
        user: Cypress.env("tegb_user_atomic"),
        passWord: Cypress.env("tegb_password_atomic")
}

const text = {
    menu: {
        home: 'Domů',
        accounts: 'Účty',
        transaction: 'Transakce',
        support: 'Podpora'
    },
    profilDetail: {
        profilDetail: 'Detaily Profilu',
        firstName: 'Jméno:',
        lastName: 'Příjmení:',
        email: 'Email:',
        phone: 'Telefon:',
        age: 'Věk:',
        editProfileButton: 'Upravit profil'
    },
    accounts: {
        accounts: 'Účty',
        accountNumber: 'Číslo účtu',
        balance: 'Zůstatek',
        accountType: 'Typ účtu'
    },
    header: {
        headLine: 'TEG#B Dashboard',
        logOutButton: 'Odhlásit se'
    }
}

describe('Atomic Test For Dashboard',{testIsolation: false}, () => {
    const dashboard = new Dashboard()
    before(()=>{
        
        new LoginPage()
        .clearCache()
        .visit()
        .login(testData.user, testData.passWord)
    })


    context('Menu', () => {

        it('Menu is visible', () => {
            dashboard.menu.isVisible();
        });

        it('Should menu item Home is visible', () => {
            dashboard.menuItemHome.isVisible();
        });

        it('Should menu item Home has correct text', () => {
            dashboard.menuItemHome.haveText(text.menu.home);
        });
        
        it.skip('Should menu item Home is clickable => položka v menu je pouze statický text', () => {
            dashboard.menuItemHome.click()
        });

        it('Should menu item Accounts is visiable', () => {
            dashboard.menuItemAccounts.isVisible();
        });      

        it('Should menu item Home has correct text', () => {
            dashboard.menuItemAccounts.haveText(text.menu.accounts)
        });

        it.skip('Should menu item Account is clickable => položka v menu je pouze statický text', () => {
            dashboard.menuItemAccount.click()
        });

        it('Should menu item Transaction is visible', () => {
            dashboard.menuItemTransaction.isVisible();
        });

        it('Should menu item Transaction has correct text', () => {
            dashboard.menuItemTransaction.haveText(text.menu.transaction);
        })

        it.skip('Should menu item Transaction is clickable => položka v menu je pouze statický text', () => {
            dashboard.menuItemTransaction.click()
        });

        it('Should menu item Support has correct text', () => {
            dashboard.menuItemSupport.isVisible();
        })

        it('Should menu item Support has correct text', () => {
            dashboard.menuItemSupport.haveText(text.menu.support);
        })

        it.skip('Should menu item Support is clickable => položka v menu je pouze statický text', () => {
            dashboard.menuItemSupport.click()
        });

    });

    context('Profil detail', () => {

        it('Check if Detail profile exist', () => {
            dashboard.detailProfil.isExist()
        });
        it('Should Profile Headline exist', () => {
            dashboard.detailProfilHeadLine.isVisible()
        });

        it('Should Profile Headline has correct text', () => {
            dashboard.detailProfilHeadLine.haveText(text.profilDetail.profilDetail)
        });
        it('Should first name exist in Detail profil section', () => {
            dashboard.firstName.isVisible()
        });
        it('Should first name prefix has correct text', () => {
            dashboard.firstNamePrefix.haveText(text.profilDetail.firstName)
        });
        
        it('Should last name exist in Detail profil section', () => {
            dashboard.lastName.isVisible()
        });

        it('Should last name prefix has correct text', () => {
            dashboard.lastNamePrefix.haveText(text.profilDetail.lastName)
        });
        
        it('Should email exist in Detail profil section', () => {
            dashboard.email.isVisible()
        });

        it('Should email prefix has correct text', () => {
            dashboard.emailPrefix.haveText(text.profilDetail.email)
        });

        it('Should phone exist in Detail profil section', () => {
            dashboard.phone.isVisible()
        });

        it('Should phone prefix has correct text', () => {
            dashboard.phonePrefix.haveText(text.profilDetail.phone)
        })

        it('Should age in Detail profil section', () => {
            dashboard.age.isVisible()
        });

        it('Should age prefix has correct text', () => {
            dashboard.agePrefix.haveText(text.profilDetail.age)
        })

        it('Should edit profile button in Detail profil section', () => {
            dashboard.email.isVisible()
        });

        it('Should edit profile butto has correct text', () => {
            dashboard.editProfilButton.haveText(text.profilDetail.editProfileButton)
        });

        it('Should edit profile is clickable', () => {
           new Dashboard()
           .clickEditProfile()
           .clickCancelEditButton()
        });
    });
    
    context('Account', () => {
        it('Should Account section is exist', () => {
            dashboard.accountsSection.isExist()
        });
        it('Should Accounts title is visiable', () => {
            dashboard.accountsSection.isVisible()
        });
        it('Should Accounts section has correct text', () => {
            dashboard.accountsSection.haveText(text.accounts.accounts)
        });

        it('Should add account is visiable', () => {
            dashboard.accountAddButton.isVisible()
        });

        it.skip('Should add account is clickable => tlačítko nefunguje', () => {
            dashboard.accountAddButton.click()
        })

        it('Should accounts detail has visiable Account number', () => {
            dashboard.accountNumber.isVisible()
        });
        it.skip('Should Account number in accounts detail has correct text', () => {
            dashboard.accountNumber.haveText(text.accounts.accountNumber)
        });
        it('Should accounts datail has visiable balance', () => {
            dashboard.accountBalance.isVisible()
        });
        it('Should balance in accounts detail has correct text', () => {
            dashboard.accountNumber.haveText(text.accounts.balance)
        });
        it('Should accounts detail has visiable Account type', () => {
            dashboard.accountType.isVisible()
        });
        it('Should account type in accounts detail has correct text', () => {
            dashboard.accountType.haveText(text.accounts.accountType)
        });
    });

    context('Header', () => {
        it('Should header exist', () => {
            dashboard.header.isExist()
        });
        it('Should logo is visible', () => {
            dashboard.logo.isVisible();
        });
        it.skip('Check if the logo is clickable => logo is not clickable', () => {
            dashboard.logo.click()
        });

        it('Should Header title is visible', () => {
            dashboard.headTitle.isVisible();
        });

        it('Should header title is visible', () => {
            dashboard.headTitle.haveText(text.header.headLine);
        });

        it('Should logout button is visible', () => {
            dashboard.logOutButton.isVisible();
        })
        it('Should logout butten have correct text', () => {
            dashboard.logOutButton.haveText(text.header.logOutButton)
        });
        it('Should logout button is clickable', () => {
            dashboard.logOutButton.click()
        });
    })
    });