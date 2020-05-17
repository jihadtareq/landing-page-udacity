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
const sections = Array.from(document.getElementsByTagName('section'));

/**
 * End Global Variables
 * Start Helper Functions
 *
 *  @param element:check if the element is in viewport
 */
let isInViewport = function (elem) {
  let bounding = elem.getBoundingClientRect();
  console.log('======bounding Bottom==============================');
  console.log(bounding.bottom);
  console.log('====================================');
  console.log('======bounding TOP==============================');
  console.log(bounding.top);
  console.log('====================================');
  console.log('======window.innerHeight==============================');
  console.log(window.innerHeight);
  console.log('====================================');
  return (
      bounding.top <=
          (window.innerHeight || document.documentElement.clientHeight) &&
      bounding.right <=
          (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
function createsection() {
	sections.forEach((section) => {
		if (!section.dataset || !section.dataset.nav) return;
		const item = document.createElement('li');
		item.innerText = section.dataset.nav;
		item.className = 'menu__link';
		item.dataset.nav = section.id;
		navbar.appendChild(item);
	});
}

// Add class 'active' to section when near top of viewport

function activeSection() {

	window.addEventListener('scroll',function (event) {
			sections.forEach((section) =>
				section.classList.remove('your-active-class')
            );
            let activeSectionIndex = 0 
            for (let index = 0; index < sections.length; index++) {
                const section = sections[index];
                let isSectionInViewport = isInViewport(section)
                if (isSectionInViewport) {
                    activeSectionIndex = index + 1
                }
            }

            //set other link inactive
            navbar.childNodes.forEach(
                (navLink, index) =>
                    index && navLink.classList.remove('active')
            );
            
            //Index of link start from 1 so we have to make sure that it's not equal zero
            if (activeSectionIndex != 0 ) {
                navbar.childNodes[activeSectionIndex].classList.add('active');
                sections[activeSectionIndex-1].classList.add('your-active-class');
                console.log('====================================');
                console.log(navbar.childNodes[activeSectionIndex]);
                console.log('====================================');
                console.log(sections[activeSectionIndex-1]);
            }
		},
		false
	);
}

// Scroll to anchor ID using scrollTO event

function scrollToSection() {
	navbar.addEventListener('click', function (evt) {
		//evt.target is the element that was clicked
		const target = document.querySelector('#' + evt.target.dataset.nav);
		target.scrollIntoView({ behavior: 'smooth', block: 'end' });
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
