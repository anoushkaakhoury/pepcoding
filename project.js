let puppeteer=require("puppeteer");
let fs=require("fs");
let credentialsFile = process.argv[2];
(async function(){
    let data=await fs.promises.readFile(credentialsFile,"utf-8");
    let credentials=JSON.parse(data);
    login=credentials.login;
    pwd=credentials.pwd;
    email=credentials.email;
    job=credentials.job;
    location=credentials.location
    let browser=await puppeteer.launch({
        headless:false,
        defaultViewport:null,
        args:["--start-maximized"],
        slowMo:50
        
    });

    

    let numberofPages=await browser.pages();
    let tab=numberofPages[0],newtab=numberofPages[1];

    await tab.goto(login,{
        waitUntil:"networkidle2"
    });

    await tab.waitForSelector("#username");
    await tab.type("#username",email,{delay:50});
    await tab.waitForSelector("#password");
    await tab.type("#password",pwd,);
    await tab.waitForSelector("button[aria-label='Sign in']");
    await tab.click("button[aria-label='Sign in']");
    await tab.waitForSelector("ul >li[id='jobs-nav-item'");
    await Promise.all([tab.click("ul >li[id='jobs-nav-item'"),tab.waitForNavigation({ waitUntil: "networkidle2" })]);
    await tab.waitForSelector("button.jobs-search-box__submit-button.artdeco-button.artdeco-button--3.ml2");
    await tab.click("button.jobs-search-box__submit-button.artdeco-button.artdeco-button--3.ml2");
    await tab.goto("https://www.linkedin.com/jobs/view/1908497893/")
    await tab.waitForSelector("button[aria-label='Apply to Software Engineer (Remote) - $60,000/year USD at Crossover for Work']");
    await tab.click("button[aria-label='Apply to Software Engineer (Remote) - $60,000/year USD at Crossover for Work']");
    await tab.waitFor(3000);
    numberofPages=await browser.pages();
    console.log(numberofPages.length);
    newtab=numberofPages[1];
    await newtab.waitForSelector("div[label='Submit a PDF version of your LinkedIn profile']");
    await newtab.click("div[label='Submit a PDF version of your LinkedIn profile']");
    await newtab.waitForSelector("button.continue-btn");
    await newtab.click("button.continue-btn");
    await newtab.close();
    await tab.waitForSelector("ul >li[id='feed-nav-item'");
    await tab.click("ul >li[id='feed-nav-item'");
    await tab.waitForSelector("button[data-control-name='share.sharebox_focus']");
    await tab.click("button[data-control-name='share.sharebox_focus']");
    await tab.type("button[data-control-name='share.sharebox_focus']","Automation for a Job Application Done !");
    await tab.waitForSelector("button[data-control-name='share.post']");
    await tab.click("button[data-control-name='share.post']");
    await tab.waitForSelector("button[data-control-name='nav.settings']");
    await tab.click("button[data-control-name='nav.setings']");
    await tab.waitForNavigation("a[data-control-name='nav.settings_signout']");
    await tab.click("a[data-control-name='nav.settings_signout']");
})()
