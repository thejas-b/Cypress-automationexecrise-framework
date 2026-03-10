# Cypress POM – Automation Exercise

End-to-end UI test suite for [automationexercise.com](https://automationexercise.com) built with **Cypress 14**, following the **Page Object Model (POM)** pattern. All test data is driven from JSON fixtures — no hardcoded values in test files.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Project Setup](#project-setup)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Test Data](#test-data)
- [Page Objects](#page-objects)
- [Test Cases](#test-cases)
- [Running Tests](#running-tests)
- [Reports](#reports)
- [Naming Conventions](#naming-conventions)
- [Notes for New Contributors](#notes-for-new-contributors)

---

## Prerequisites

Make sure the following are installed on your machine before cloning the project:

| Tool | Version | Download |
|---|---|---|
| Node.js | v18 or higher | https://nodejs.org |
| npm | v9 or higher | Bundled with Node.js |
| Google Chrome | Latest | https://www.google.com/chrome |
| Git | Any | https://git-scm.com |

Verify your versions:
```bash
node -v
npm -v
```

---

## Project Setup

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd cypress-pom-automationexercise

# 2. Install dependencies
npm install

# 3. Open Cypress interactive runner
npm run cy:open

# 4. Or run all tests headlessly
npm test
```

---

## Project Structure

```
cypress-pom-automationexercise/
│
├── cypress/
│   ├── fixtures/                        # Test data (JSON)
│   │   ├── user.json                    # Signup, login, address, payment, review data
│   │   ├── credentials.json             # Auto-saved login credentials after signup (runtime)
│   │   └── image/
│   │       └── PNGImage.png             # Used for Contact Us file upload test
│   │
│   ├── integration/
│   │   ├── PageObjects/                 # Page Object classes (one per page)
│   │   │   ├── LoginPage.js             # Login, logout, delete account
│   │   │   ├── SignupPage.js            # Registration form (2 steps)
│   │   │   ├── ContactUsPage.js         # Contact Us form & file upload
│   │   │   ├── ProductPage.js           # Product listing, detail, review
│   │   │   └── CartPage.js              # Cart, checkout, payment
│   │   │
│   │   └── TestScripts/                 # Spec files (*.cy.js)
│   │       ├── signup_test.cy.js        # TC01
│   │       ├── login_test.cy.js         # TC02, TC03, TC04
│   │       ├── contact_us_test.cy.js    # TC05, TC06
│   │       └── product_cart_test.cy.js  # TC07 – TC12
│   │
│   └── support/
│       ├── e2e.js                       # Global setup, cypress-xpath registration
│       └── commands.js                  # Custom Cypress commands (minimal)
│
├── cypress.config.js                    # Cypress configuration
├── package.json
└── README.md
```

---

## Configuration

All configuration lives in [`cypress.config.js`](cypress.config.js). No changes are needed to run tests locally.

| Setting | Value |
|---|---|
| `baseUrl` | `https://automationexercise.com` |
| `viewportWidth` | `1400` |
| `viewportHeight` | `900` |
| `defaultCommandTimeout` | `60000ms` |
| `pageLoadTimeout` | `80000ms` |
| `video` | `true` |
| `screenshotOnRunFailure` | `true` |
| `reporter` | `cypress-mochawesome-reporter` |
| `specPattern` | `cypress/integration/**/*.cy.{js,jsx,ts,tsx}` |
| `excludeSpecPattern` | `**/PageObjects/*` |

---

## Test Data

All test data is stored in [`cypress/fixtures/user.json`](cypress/fixtures/user.json). Update values here if you want to use a different user profile — no changes needed in test files.

```json
{
  "signupName": "Thejaswini",
  "gender": "Mr",
  "password": "Test@1234",
  "login": {
    "invalidEmail": "invalid_user@example.com",
    "invalidPassword": "WrongPass@99"
  },
  "contactUs": {
    "name": "Thejaswini",
    "email": "thejaswini_test@example.com",
    "subject": "Test Inquiry - Automation",
    "message": "This is an automated test message sent via Cypress.",
    "filePath": "image/PNGImage.png"
  },
  "review": {
    "name": "Thejaswini",
    "email": "thejaswini_test@example.com",
    "text": "Great product! Highly recommended. Tested via automation."
  },
  "payment": {
    "nameOnCard": "Thejaswini T",
    "cardNumber": "4111111111111111",
    "cvc": "123",
    "expiryMonth": "12",
    "expiryYear": "2028"
  },
  "orderComment": "Please deliver between 9am - 6pm.",
  "dob": { "day": "10", "month": "March", "year": "1995" },
  "newsletter": true,
  "specialOffers": true,
  "address": {
    "firstName": "Thejas",
    "lastName": "wini",
    "company": "Test Co",
    "address1": "123 Test Street",
    "address2": "Suite 10",
    "country": "India",
    "state": "Karnataka",
    "city": "Bangalore",
    "zipcode": "560001",
    "mobileNumber": "9876543210"
  }
}
```

> **`credentials.json`** is written automatically at runtime by `login_test.cy.js`. It saves the freshly registered account's email and password under the `automationExercise` key so all three login TCs can reuse the same account. **Do not edit this key manually.**

---

## Page Objects

Each page has its own class with an `elements` object (all locators) and methods that use those elements.

| File | Class | Covers |
|---|---|---|
| [`LoginPage.js`](cypress/integration/PageObjects/LoginPage.js) | `LoginPage` | Login form, error message, logout, delete account, nav link |
| [`SignupPage.js`](cypress/integration/PageObjects/SignupPage.js) | `SignupPage` | Step 1 signup form, step 2 account info form, account created confirmation |
| [`ContactUsPage.js`](cypress/integration/PageObjects/ContactUsPage.js) | `ContactUsPage` | Contact Us nav, form fields, file upload, success message, home button |
| [`ProductPage.js`](cypress/integration/PageObjects/ProductPage.js) | `ProductPage` | Products nav, product listing, product detail page, quantity, add to cart, review |
| [`CartPage.js`](cypress/integration/PageObjects/CartPage.js) | `CartPage` | Cart table, remove product, proceed to checkout, address verification, payment, order confirmation, invoice |

---

## Test Cases

### `signup_test.cy.js` — User Registration

`describe: 'User Registration - Automation Exercise'`

| TC | `it` Block Name | Steps |
|---|---|---|
| TC01 | Verify new user can register an account and delete it | Visit home → Signup/Login nav → Fill step-1 name & unique email → Fill step-2 account info → Verify account created → Verify logged in as username → Delete account → Verify deleted |

---

### `login_test.cy.js` — User Login

`describe: 'User Login - Automation Exercise'`

> A fresh account is **automatically registered in the `before` hook** before any login test runs. Credentials are saved to `credentials.json` and reused by all three TCs.
>
> **Execution order is intentional:** TC04 (logout) and TC03 (invalid) run before TC02 (delete account) to preserve the account for testing.

| TC | `it` Block Name | Steps |
|---|---|---|
| TC04 | Verify logged-in user can logout and is redirected to login page | Login → Verify logged in → Click Logout → Verify login page visible |
| TC03 | Verify error message is shown for invalid login credentials | Login with wrong email & password → Verify error message `'Your email or password is incorrect!'` |
| TC02 | Verify logged-in user can delete their account successfully | Login → Verify logged in → Delete Account → Verify `'Account Deleted!'` → Click Continue |

---

### `contact_us_test.cy.js` — Contact Us

`describe: 'Contact Us Form - Automation Exercise'`

| TC | `it` Block Name | Steps |
|---|---|---|
| TC05 | Verify Contact Us page heading and Get In Touch section are visible | Click Contact Us nav → Assert `'Contact Us'` heading visible → Assert `'Get In Touch'` heading visible |
| TC06 | Submit Contact Us form with file upload and verify success message | Click Contact Us nav → Fill name, email, subject, message → Upload `PNGImage.png` → Submit → Accept browser confirm dialog → Verify success message → Click Home → Verify home page URL |

---

### `product_cart_test.cy.js` — Products & Cart

`describe: 'Products & Cart - Automation Exercise'`

| TC | `it` Block Name | Steps |
|---|---|---|
| TC07 | Verify two products added to cart show correct price, quantity and total | Products page → Hover product 1 → Add to cart → Continue Shopping → Hover product 2 → Add to cart → View Cart → Verify 2 rows, 2 prices, qty = 1 each, 2 totals |
| TC08 | Verify product added from detail page reflects correct quantity in cart | Click View Product → Verify detail page → Set quantity = 4 → Add to cart → View Cart → Verify qty = 4 |
| TC09 | Verify product is removed from cart when delete button is clicked | Add product → View Cart → Click delete (✕) → Verify `'Cart is empty!'` message |
| TC10 | Verify product review is submitted successfully and success message is shown | Products page → View Product → Assert `'Write Your Review'` visible → Fill name, email, review text → Submit → Verify `'Thank you for your review.'` |
| TC11 | Verify checkout delivery and billing address matches registration address | Signup → Add product → Proceed to Checkout → Assert delivery address = registration address → Assert billing address = registration address → Delete account |
| TC12 | Verify order is placed successfully with payment and invoice is downloadable | Add product → Checkout (without login) → Register at checkout modal → Back to cart → Checkout → Verify address → Add order comment → Place Order → Enter payment details → Verify order success → Download Invoice → Continue → Delete account |

---

## Running Tests

### Open Interactive Cypress Runner
```bash
npm run cy:open
```
Select **E2E Testing** → choose **Chrome** → click any spec file to run it.

---

### Run All Tests Headlessly (Chrome)
```bash
npm test
# or
npm run cy:run
```

---

### Run a Single Spec File
```bash
npx cypress run --spec "cypress/integration/TestScripts/signup_test.cy.js" --browser chrome
npx cypress run --spec "cypress/integration/TestScripts/login_test.cy.js" --browser chrome
npx cypress run --spec "cypress/integration/TestScripts/contact_us_test.cy.js" --browser chrome
npx cypress run --spec "cypress/integration/TestScripts/product_cart_test.cy.js" --browser chrome
```

---

## Reports

HTML reports are auto-generated after every headless run:

```
cypress/reports/html/report.html
```

Open in any browser to view:
- Pass/fail chart summary
- Screenshots embedded on test failure
- Video recordings at `cypress/videos/`

---

## Naming Conventions

### File names
| Type | Convention | Example |
|---|---|---|
| Test spec | `snake_case` + `.cy.js` | `login_test.cy.js` |
| Page Object | `PascalCase` + `Page.js` | `LoginPage.js` |
| Fixture | `camelCase.json` | `user.json` |

### Class names
All Page Object classes use **PascalCase** matching the file name:
`LoginPage`, `SignupPage`, `ContactUsPage`, `ProductPage`, `CartPage`

### `describe` blocks
Format: `'Feature Name - Application Name'`
Example: `'User Login - Automation Exercise'`

### `it` blocks
Format: `'TCxx - Verify <what> <expected outcome>'`
- Always starts with `Verify` to express the assertion/expected result
- Avoids vague names like *"Add to cart"* — instead says *"Verify two products added to cart show correct price, quantity and total"*

### Method names in Page Objects
- Getters: `verify...()`, `get...()`
- Actions: `click...()`, `enter...()`, `select...()`, `submit...()`
- Flows: `login()`, `signup()`, `fillAccountInfo()`, `submitContactForm()`

---

## Notes for New Contributors

1. **No pre-existing test account needed.** Both `signup_test.cy.js` and `login_test.cy.js` create fresh accounts using `Date.now()` in the email — no "email already registered" failures.

2. **Never hardcode URLs in tests.** Use `cy.visit('/')` or relative paths. The `baseUrl` (`https://automationexercise.com`) is set once in `cypress.config.js`.

3. **Never hardcode test data in spec files.** All user data lives in `cypress/fixtures/user.json`. Add new fields there if needed.

4. **Locators belong in Page Objects only.** Test files must only call page methods. Never use `cy.get()` or `cy.xpath()` directly inside a `*.cy.js` file.

5. **Test order in `login_test.cy.js` is intentional.** Cypress runs tests in declaration order. TC04 (logout) and TC03 (invalid login) run before TC02 (delete account) so the account remains available for those tests.

6. **`credentials.json` is a runtime artifact.** It is overwritten on every `login_test` run. Do not rely on its contents between runs.

---

## Tech Stack

| Package | Purpose |
|---|---|
| `cypress` | Test runner |
| `cypress-xpath` | XPath selector support |
| `cypress-mochawesome-reporter` | HTML test reports |
| `cypress-multi-reporters` | Multiple reporter support |
| `mochawesome-merge` | Merge JSON report files |
| `fs-extra` | File system utilities (report generation) |

---

## Author

**Thejas B**


---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Project Setup](#project-setup)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Test Data](#test-data)
- [Page Objects](#page-objects)
- [Test Cases](#test-cases)
- [Running Tests](#running-tests)
- [Reports](#reports)
- [Notes for New Contributors](#notes-for-new-contributors)

---

## Prerequisites

Make sure the following are installed on your machine before cloning the project:

| Tool | Version | Download |
|---|---|---|
| Node.js | v18 or higher | https://nodejs.org |
| npm | v9 or higher | Bundled with Node.js |
| Google Chrome | Latest | https://www.google.com/chrome |
| Git | Any | https://git-scm.com |

Verify your versions:
```bash
node -v
npm -v
```

---

## Project Setup

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd cypress-pom-automationexercise

# 2. Install dependencies
npm install

# 3. Open Cypress interactive runner
npm run cy:open

# 4. Or run all tests headlessly
npm test
```

---

## Project Structure

```
cypress-pom-automationexercise/
│
├── cypress/
│   ├── fixtures/                        # Test data (JSON)
│   │   ├── user.json                    # Signup, login, address, payment, review data
│   │   ├── credentials.json             # Auto-saved login credentials after signup
│   │   ├── uiProperties.json
│   │   └── image/
│   │       └── PNGImage.png             # Used for Contact Us file upload test
│   │
│   ├── integration/
│   │   ├── PageObjects/                 # Page Object classes (one per page)
│   │   │   ├── LoginPage.js
│   │   │   ├── SignupPage.js
│   │   │   ├── ContactUsPage.js
│   │   │   ├── ProductPage.js
│   │   │   ├── CartPage.js
│   │   │   └── Header.js
│   │   │
│   │   └── TestScripts/                 # Test files (*.cy.js)
│   │       ├── signup_test.cy.js        # TC01
│   │       ├── login_test.cy.js         # TC02, TC03, TC04
│   │       ├── contact_us_test.cy.js    # TC05, TC06
│   │       └── search_product.cy.js     # TC07–TC12
│   │
│   └── support/
│       ├── e2e.js                       # Global setup, cypress-xpath registration
│       └── commands.js                  # Custom Cypress commands (minimal)
│
├── cypress.config.js                    # Cypress configuration
├── package.json
└── README.md
```

---

## Configuration

All configuration lives in [`cypress.config.js`](cypress.config.js):

| Setting | Value |
|---|---|
| `baseUrl` | `https://automationexercise.com` |
| `viewportWidth` | `1400` |
| `viewportHeight` | `900` |
| `defaultCommandTimeout` | `60000ms` |
| `pageLoadTimeout` | `80000ms` |
| `video` | `true` |
| `screenshotOnRunFailure` | `true` |
| `reporter` | `cypress-mochawesome-reporter` |

> **No changes needed** to `cypress.config.js` to run tests locally. The `baseUrl` points to the live public site.

---

## Test Data

All test data is stored in [`cypress/fixtures/user.json`](cypress/fixtures/user.json). Update values here if you want to use a different user profile.

```json
{
  "signupName": "Thejaswini",
  "gender": "Mr",
  "password": "Test@1234",
  "login": {
    "invalidEmail": "invalid_user@example.com",
    "invalidPassword": "WrongPass@99"
  },
  "contactUs": {
    "name": "Thejaswini",
    "subject": "Test Inquiry - Automation",
    "message": "This is an automated test message.",
    "filePath": "image/PNGImage.png"
  },
  "review": {
    "text": "Great product! Tested via automation."
  },
  "payment": {
    "nameOnCard": "Thejaswini T",
    "cardNumber": "4111111111111111",
    "cvc": "123",
    "expiryMonth": "12",
    "expiryYear": "2028"
  },
  "dob": { "day": "10", "month": "March", "year": "1995" },
  "address": {
    "firstName": "Thejas", "lastName": "wini",
    "address1": "123 Test Street", "country": "India",
    "state": "Karnataka", "city": "Bangalore",
    "zipcode": "560001", "mobileNumber": "9876543210"
  }
}
```

> **`credentials.json`** — This file is automatically updated at runtime by `login_test.cy.js`. It stores the email and password of the freshly registered account so it can be reused across login test cases. Do not edit the `automationExercise` key manually.

---

## Page Objects

Each page has its own class with `elements` (locators) and methods.

| Page Object | Responsibility |
|---|---|
| [`LoginPage.js`](cypress/integration/PageObjects/LoginPage.js) | Login form, logout, delete account, error message |
| [`SignupPage.js`](cypress/integration/PageObjects/SignupPage.js) | Registration form (2 steps), account created, delete account |
| [`ContactUsPage.js`](cypress/integration/PageObjects/ContactUsPage.js) | Contact Us form, file upload, success message |
| [`ProductPage.js`](cypress/integration/PageObjects/ProductPage.js) | Product listing, product detail, add to cart, review |
| [`CartPage.js`](cypress/integration/PageObjects/CartPage.js) | Cart, checkout, address verification, payment, invoice |

---

## Test Cases

### signup_test.cy.js — User Registration

| TC | Title | Key Steps |
|---|---|---|
| TC01 | Register new user and delete account | Visit home → Signup / Login → Fill registration form → Verify account created → Verify logged in → Delete account |

---

### login_test.cy.js — User Login

> **Note:** A fresh account is registered automatically in the `before` hook before any login test runs. Credentials are saved to `credentials.json` and reused.

| TC | Title | Key Steps |
|---|---|---|
| TC04 | Login with valid credentials and logout | Login → Verify logged in → Logout → Verify back on login page |
| TC03 | Login with invalid credentials shows error | Login with wrong email/password → Verify error message |
| TC02 | Login with valid credentials and delete account | Login → Verify logged in → Delete account → Verify deleted |

---

### contact_us_test.cy.js — Contact Us

| TC | Title | Key Steps |
|---|---|---|
| TC05 | Verify Contact Us page is visible | Click Contact Us nav → Verify headings |
| TC06 | Submit Contact Us form with file upload | Fill form → Upload PNG file → Submit → Handle confirm dialog → Verify success → Click Home |

---

### search_product.cy.js — Products & Cart

| TC | Title | Key Steps |
|---|---|---|
| TC07 | Add two products to cart and verify details | Products page → Add product 1 (Continue Shopping) → Add product 2 (View Cart) → Verify 2 items, prices, qty, total |
| TC08 | Add product with quantity 4 from detail page | View Product → Set qty = 4 → Add to cart → Verify qty in cart |
| TC09 | Remove product from cart | Add product → View Cart → Click X → Verify cart empty |
| TC10 | Write a product review | Products page → View Product → Write review → Submit → Verify success |
| TC11 | Register → Add to cart → Verify checkout address | Signup → Add product → Checkout → Verify delivery & billing address matches registration → Delete account |
| TC12 | Add to cart → Register at checkout → Place order → Pay → Download invoice | Add product → Checkout (not logged in) → Register → Back to cart → Checkout → Place order → Enter payment → Verify success → Download invoice → Delete account |

---

## Running Tests

### Open Interactive Cypress Runner
```bash
npm run cy:open
```
Then select **E2E Testing** → choose a browser → pick any spec file to run.

---

### Run All Tests Headlessly (Chrome)
```bash
npm test
# or
npm run cy:run
```

---

### Run a Specific Test File
```bash
npx cypress run --spec "cypress/integration/TestScripts/login_test.cy.js" --browser chrome
```

---

### Run by Tag / Grep (if needed later)
```bash
npx cypress run --spec "cypress/integration/TestScripts/signup_test.cy.js"
npx cypress run --spec "cypress/integration/TestScripts/contact_us_test.cy.js"
npx cypress run --spec "cypress/integration/TestScripts/search_product.cy.js"
```

---

## Reports

After a headless run, HTML reports are automatically generated at:

```
cypress/reports/html/report.html
```

Open the file in any browser to view:
- Test pass/fail summary with charts
- Screenshots embedded on failure
- Video recordings under `cypress/videos/`

---

## Notes for New Contributors

1. **No test account is needed upfront.** `signup_test.cy.js` and `login_test.cy.js` both create fresh accounts using `Date.now()` timestamps in the email — so every run gets a unique email and there are no "email already registered" failures.

2. **Do not hardcode URLs.** The `baseUrl` is set in `cypress.config.js`. Always use `cy.visit('/')` or `cy.visit('/products')` style paths.

3. **Do not hardcode user data in test files.** All data lives in `cypress/fixtures/user.json`. Add new fields there if needed.

4. **Page Objects only.** All locators must live inside the `elements` object of the relevant page class. Test files should only call page methods — never use `cy.get()` or `cy.xpath()` directly in test files.

5. **Test execution order within `login_test.cy.js`:** TC04 and TC03 run before TC02 (delete account is last) so the account is available for logout and invalid-login tests.

6. **`credentials.json`** is a runtime file. It will be updated each time `login_test.cy.js` runs. Commit it to source control only if you want a baseline — it gets overwritten on every run.

---

## Author

**Thejas B**

---

## License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.
