// helps insure acessibility
const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');

// KEYBOARD NAVIGATION
tabList.addEventListener('keydown', changeTabFocus);

tabs.forEach((tab) => {
    tab.addEventListener('click', changeTabPanel);
});

let tabFocus = 0;

function changeTabFocus(e) {
    const keydownLeft = 37;
    const keydownRight = 39;

    // change the tabindex of the current tab to -1
    if (e.keyCode === keydownLeft || e.keyCode === keydownRight) {
        tabs[tabFocus].setAttribute("tabindex", -1);
    }

    // if the right key is pushed, move to the next tab on the right
    if (e.keyCode === keydownRight) {
        tabFocus++;
        if (tabFocus >= tabs.length) {
            tabFocus = 0;
        }
    }
    // if the left key is pushed, move to the next tab on the left
    else if (e.keyCode === keydownLeft) {
        tabFocus--;
        if (tabFocus < 0) {
            tabFocus = tabs.length - 1;
        }
    }
    tabs[tabFocus].setAttribute("tabindex", 0);
    tabs[tabFocus].focus();
}


function changeTabPanel(e) {
    const targetTab = e.target;
    const targetPanel = targetTab.getAttribute("aria-controls");
    const targetImage = targetTab.getAttribute("data-image");

    const tabContainer = targetTab.parentNode;
    const mainContainer = tabContainer.parentNode;

    tabContainer.querySelector('[aria-selected="true"]')
        .setAttribute("aria-selected", false);
    targetTab.setAttribute("aria-selected", true);

    hideContent(mainContainer, '[role="tabpanel"]');
    showContent(mainContainer, [`#${targetPanel}`]);

    //REFACTORED INTO hideContent function to dry/clean up code and make it reusable.
    //I will be adding to this project and this may work betterfor other things.
    // mainContainer
    //     .querySelectorAll('[role="tabpanel"]')
    //     .forEach((panel) => panel.setAttribute("hidden", true));
    // mainContainer
    //     .querySelectorAll('picture')
    //     .forEach((picture) => picture.setAttribute("hidden", true));
    //REFACTORED INTO showContent function
    //mainContainer.querySelector([`#${targetPanel}`]).removeAttribute('hidden');
    // mainContainer.querySelector([`#${targetPanel}`]).removeAttribute('hidden');
    //mainContainer.querySelector([`#${targetImage}`]).removeAttribute('hidden');

    hideContent(mainContainer, 'picture');
    showContent(mainContainer, [`#${targetImage}`]);


}

function hideContent(parent, content) {
    parent
        .querySelectorAll(content)
        .forEach((item) => item.setAttribute("hidden", true));
}

function showContent(parent, content) {
    parent.querySelector(content).removeAttribute('hidden');
}