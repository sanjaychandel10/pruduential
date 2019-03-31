import { browser, element, by } from 'protractor';
import { protractor } from 'protractor/built/ptor';
const image = 'themes/openweathermap/assets/vendor/owm/img/logo_OpenWeatherMap_orange.svg';
const EC = protractor.ExpectedConditions;

describe('test cases of open weather map', function () {
    beforeAll(function () {
        browser.waitForAngularEnabled(false);
        browser.manage().window().maximize();
        browser.manage().deleteAllCookies();
        browser.get('https://openweathermap.org/');

    });


    it('Validate that important links, label and logo is available on the page', function () {
        expect(element(by.id('nav-search')).isDisplayed()).toBeTruthy(true);
        expect(element(by.id('metric')).isDisplayed()).toBeTruthy(true);
        expect(element(by.id('imperial')).isDisplayed()).toBeTruthy(true);

        expect(element(by.xpath('//*[contains(@href,\'/sign_in\') and @class=\'pull-right\']')).isDisplayed()).toBeTruthy(true);
        expect(element(by.xpath('//*[contains(@href,\'/sign_up\') and @class=\'pull-right\']')).isDisplayed()).toBeTruthy(true);
        expect(element(by.css('[alt=\'openweathermap\']')).isDisplayed().then(function (isVisible) {
            if (isVisible) {
                expect(element(by.css('[alt=\'openweathermap\']')).getAttribute('src')).toContain(image);
            }

        }));

        expect(element(by.className('btn search-cities__lnk')).isDisplayed()).toBeTruthy(true);

        expect(element(by.xpath('//*[contains(text(),\'Support Center\')]')).isDisplayed()).toBeTruthy(true);
        expect(element(by.xpath('//*[@href=\'/city\' and contains(text(),\'Weather\')]')).isDisplayed()).toBeTruthy(true);
        expect(element(by.css('[data-toggle=\'dropdown\']')).isDisplayed()).toBeTruthy(true);
        expect(element(by.css('[href=\'/guide\']')).isDisplayed()).toBeTruthy(true);
        expect(element(by.xpath('//li/a[@href=\'/api\' and contains(text(),\'API\')]')).isDisplayed()).toBeTruthy(true);
        expect(element(by.xpath('//li/a[@href=\'/price\' and contains(text(),\'Price\')]')).isDisplayed()).toBeTruthy(true);
        expect(element(by.xpath('//li/a[@href=\'/examples\' and contains(text(),\'Partners\')]')).isDisplayed()).toBeTruthy(true);
        expect(element(by.xpath('//li/a[@href=\'/stations\' and contains(text(),\'Stations\')]')).isDisplayed()).toBeTruthy(true);
        expect(element(by.xpath('//li/a[@href=\'/stations\' and contains(text(),\'Stations\')]')).isDisplayed()).toBeTruthy(true);
        expect(element(by.xpath('//li/a[@href=\'/widgets-constructor\' and contains(text(),\'Widgets\')]')).isDisplayed()).toBeTruthy(true);


    });

    it('Validate that city is found', function () {

        element(by.xpath('//*[@alt=\'openweathermap\']')).click();
        browser.sleep(5000);
        element(by.xpath('//*[@placeholder=\'Your city name\']')).sendKeys('London');
        element(by.className('fa fa-question-circle')).click();
        expect(element(by.xpath('//*[@id="forecast_list_ul"]/table/tbody/tr[1]/td[2]/p[2]')).isDisplayed()).toBeTruthy(true);

    });

    it('Validate that city is not found', function () {
        element(by.xpath('//*[@alt=\'openweathermap\']')).click();
        browser.sleep(5000);
        element(by.xpath('//*[@placeholder=\'Your city name\']')).sendKeys('openweathermap');
        element(by.className('fa fa-question-circle')).click();
        element(by.css('div.alert.alert-warning')).getText().then(function (text) {
            expect(text).toContain('Not found');
        });

    });


    it('Validate that user is able to sign in', function () {
        element(by.xpath('//*[@href=\'//home.openweathermap.org/users/sign_in\' and @class=\'pull-right\']')).click();
        element(by.id('user_email')).sendKeys('username');
        element(by.id('user_password')).sendKeys('user password');
        element(by.id('user_remember_me')).click();
        element(by.name('commit')).click();


    });


});
