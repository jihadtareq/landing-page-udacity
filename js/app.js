/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const navbar = document.querySelector('#navbar__list');
const sections =Array.from(document.getElementsByTagName('section'));
let containerCount = document.getElementsByClassName("landing__container")
  .length;
//const title = document.querySelector('#main__hero');
/**
 * End Global Variables
 * Start Helper Functions
 * 
 *  @param element:check if the element is in viewport
*/

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function createsection(){
    sections.forEach(section => {
        if (!section.dataset || !section.dataset.nav) return;
        const item = document.createElement('li');
        item.innerText = section.dataset.nav;
        item.className = 'menu__link';
        item.dataset.nav=section.id;
        navbar.appendChild(item);
      });
      let nodelist=navbar.childNodes;
      console.log(nodelist);
}

// Add class 'active' to section when near top of viewport

function activeSection(){
    let isInViewport = function(elem) {
        let bounding = elem.getBoundingClientRect();
        return (
          bounding.top <= 0 &&
          bounding.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
          bounding.right <=
            (window.innerWidth || document.documentElement.clientWidth)
        );
      };
    
      for (i = 1; i < containerCount + 1; i++) {
        let sectionInFullView = document.getElementById("section" + i);
        sections.forEach(section => section.classList.remove('your-active-class'));
        window.addEventListener("scroll",function(event) {
            if (isInViewport(sectionInFullView)) {
              sectionInFullView.classList.add("active");
            } else {
              sectionInFullView.classList.remove("active");
            }
          },
          false
        );
      }
}



// Scroll to anchor ID using scrollTO event

function scrollToSection(){

    navbar.addEventListener('click',function(evt){
        //evt.target is the element that was clicked
        const target =document.querySelector('#'+evt.target.dataset.nav);
        target.scrollIntoView({behavior:'smooth',block:'end'});

    });

}


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
createsection();
// Scroll to section on link click
scrollToSection();

// Set sections as active
activeSection();
