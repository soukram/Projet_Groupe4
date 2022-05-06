// Check if there's local storage color option
// ============================================
let mainColors = localStorage.getItem("option_box");
if(mainColors !== null){
    console.log(localStorage.getItem('option_box'));
    document.documentElement.style.setProperty('--main-color', localStorage.getItem('option_box'));

    //Remove Active class from all colors list item
    document.querySelectorAll(".list li").forEach(element => {
        element.classList.remove("active");
        //Add Active class on elemnt with Data-Color === Local Storage item
        if (element.dataset.color === mainColors){
            //Add Active class
            element.classList.add("active");
        }
    }); 
}


// Toggle spin on icon
// ===================
document.querySelector(".toggler .fa-gear").onclick = function(){
    // Toggle class fa-spin for rtation on self
    this.classList.toggle("fa-spin"); 
    // toggle on the sidebar
    document.querySelector(".setting-box").classList.toggle("open");
};


//Random Background option
let backgOption = true;
//Variable to control the background interval
let backgInterval;
// Check if there's local storage
let backgLocalItem = localStorage.getItem("backgOption");
// Check if randpm background local storage is not empty
if (backgLocalItem !== null){
    if (backgLocalItem === 'true'){
        backgOption = true;
    }
    else{
        backgOption = false;
    }
}

// Switch colors
// =============
const colorLi = document.querySelectorAll(".list li");
//Loop on all list items
colorLi.forEach( li => {
    //Click on every list items
    li.addEventListener("click", (e) => {
        //Set color on Root
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);

        //Set color on local storage
        localStorage.setItem("option_box", e.target.dataset.color);

        //Remove Active class from all children
        // e.target.parentElement.querySelectorAll(".active").forEach(element => {
        //     element.classList.remove("active");
        // });

        // //Add Active class on self
        // e.target.classList.add("active");
        handleActive(e);
    });
});


// Switch Background
// =================
const backg = document.querySelectorAll(".backgr-option span");
//Loop on all list span
backg.forEach( span => {
    //Click on every list items
    span.addEventListener("click", (e) => {
        // //Remove Active class from all children
        // e.target.parentElement.querySelectorAll(".active").forEach(element => {
        //     element.classList.remove("active");
        // });
        // //Add Active class on self
        // e.target.classList.add("active");
        handleActive(e);

        //Condition of selecting the bottom
        if(e.target.dataset.background === 'yes'){
            backgOption = true;
            randomizeImgs();
            localStorage.setItem("backgOption", true)
        }
        else{
            backgOption = false;
            clearInterval(backgInterval);
            localStorage.setItem("backgOption", false);
        }
    });
});


// Select Landing Page Element
// ===========================
var landingPage = document.querySelector(".landing-page");

//Get Array Of Imgs
let imgsArray = ["01.jpg", "02.jpg","03.jpg","04.jpg"];

function randomizeImgs(){
    if (backgOption === true){
        backgInterval = setInterval(() => {
            //Get random Number
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
            //Change Background Image Url
            landingPage.style.backgroundImage = 'url("imgs/'+ imgsArray[randomNumber]+'")';
            }, 5000);
    }
} 
randomizeImgs();


// Select Skills Selector
// ======================
let ourSkills = document.querySelector(".skills");
window.onscroll = function (){
    // skills offset top
    let skillsOffsetTop = ourSkills.offsetTop;
    // skills outer height
    let skillsOuterHeight = ourSkills.offsetHeight;
    // window height
    let windowHeight = this.innerHeight;
    // window scrolltop
    let windowScrollTop = this.pageYOffset;
    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)){
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
        allSkills.forEach(skill =>{
            skill.style.width = skill.dataset.progress;
        })
    }
}


// Create popup with the images's gallery
// ======================================
let ourGallery = document.querySelectorAll(".gallery img");
ourGallery.forEach(img => {
    img.addEventListener('click', (e)=>{
        //Create overlay Element
        let overlay = document.createElement("div");
        //Add class to overlay
        overlay.className = 'popup-overlay';
        //Append overlay to the body
        document.body.appendChild(overlay);
        //Create popup
        let popupBox = document.createElement("div");
        //Add class to popupBox
        popupBox.className = 'popup-box';
        
        //Add the heading to the image
        if(img.alt !== null){
            //create Heading
            let imgHeading = document.createElement("h3");
            //create text for heading
            let imgText = document.createTextNode(img.alt);
            //Append the text to the heading
            imgHeading.appendChild(imgText);
            //Append the heading to the popup box
            popupBox.appendChild(imgHeading);
        }

        //Create the image
        let popupImage = document.createElement("img");
        //Set image source
        popupImage.src = img.src;
        //Add image to popup box
        popupBox.appendChild(popupImage);
        //Append popup Box to the body
        document.body.appendChild(popupBox);

        //Create the close span
        let closeButton = document.createElement("span");
        //Create the close button text
        let closeButtonText = document.createTextNode("X");
        //Append text to close button
        closeButton.appendChild(closeButtonText);
        //Add class to close button
        closeButton.className = 'close-button';
        //Add close button to the popup box
        popupBox.appendChild(closeButton);
    });

    //Close popup
    document.addEventListener("click", function (e) {
        if(e.target.className == 'close-button'){
            //Remove the current popup
            e.target.parentNode.remove();
            //remove the overlay
            document.querySelector(".popup-overlay").remove();
        }
    })
});

// Bullets
// =======
// Select all bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
// allBullets.forEach(bullet => {
//     bullet.addEventListener("click", (e) =>{
//         document.querySelector(e.target.dataset.section).scrollIntoView({
//             behavior:"smooth"
//         });
//     });
// });


// Links
// =====
// Select all links
const allLinks = document.querySelectorAll(".links a");
// allLinks.forEach(a => {
//     a.addEventListener("click", (e) =>{
//         e.preventDefault();
//         document.querySelector(e.target.dataset.section).scrollIntoView({
//             behavior:"smooth"
//         });
//     });
// });

function scrollToSomewhere(elements){
    elements.forEach(ele => {
            ele.addEventListener("click", (e) =>{
                e.preventDefault();
                document.querySelector(e.target.dataset.section).scrollIntoView({
                    behavior:"smooth"
                });
            });
        });
}
scrollToSomewhere(allBullets);
scrollToSomewhere(allLinks);


// Handle Active state function
// ============================
function handleActive (ac){
    //Remove Active class from all children
    ac.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    });
    //Add Active class on self
    ac.target.classList.add("active");
}


// Handle Bullets
// ==============
let bulletSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets_option");

if(bulletLocalItem !== null){
    bulletSpan.forEach(span => {
        span.classList.remove("active");
    });
    if(bulletLocalItem === 'block'){
        bulletsContainer.style.display = 'block';
        document.querySelector(".bullets-option .yes").classList.add("active");
    }
    else{
        bulletsContainer.style.display = 'none';
        document.querySelector(".bullets-option .no").classList.add("active");

    }
}

bulletSpan.forEach(span => {
    span.addEventListener("click", (e)=>{
        if(span.dataset.display === 'show'){
            bulletsContainer.style.display = 'block';
            localStorage.setItem("bullets_option", 'block')
        }
        else{
            bulletsContainer.style.display = 'none';
            localStorage.setItem("bullets_option", 'none')

        }
        handleActive(e);
    });
});

// Reset Les Paramètres
// ====================
document.querySelector(".reset").onclick = function (){
    // localStorage.clear();
    localStorage.removeItem("option_box");
    localStorage.removeItem("backgOption");
    localStorage.removeItem("bullets_option");
    // Reload Window
    window.location.reload();
};


// Toggle Menu
// ===========
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");
toggleBtn.onclick = function (e){
    // Stop Propagation
    e.stopPropagation();

    // Toggle Class "menu-active"
    this.classList.toggle("menu-active");

    // Toggle Class "open" on links
    tLinks.classList.toggle("open");
};

// Click Anywhere outside menu and toggle
document.addEventListener("click", (e) => {
    if(e.target !== toggleBtn && e.target !== tLinks){
        // Check if menu is open
        if(tLinks.classList.contains("open")){
            // Toggle Class "menu-active"
            this.classList.toggle("menu-active");

            // Toggle Class "open" on links
            tLinks.classList.toggle("open");
        }
    }
});

// Stop Propagation on Menu
tLinks.onclick = function (e){
    e.stopPropagation();
}