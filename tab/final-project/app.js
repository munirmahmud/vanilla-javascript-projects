const tabs = document.querySelector(".tabs");
const tabButtons = document.querySelectorAll('[role="tab"]');
const tabpanels = document.querySelectorAll('[role="tabpanel"]');

function handleClick(event) {
  //   Unselect all buttons
  tabButtons.forEach((button) => {
    button.ariaSelected = false;
  });

  // Hide all tab panels
  tabpanels.forEach((tabPanel) => {
    tabPanel.hidden = true;
  });

  //   Select the clicked tab
  event.currentTarget.ariaSelected = true;

  //   Show the associated tab panel
  const { id } = event.currentTarget;

  const selectedTabPanel = tabs.querySelector(`[aria-labelledby="${id}"]`);
  selectedTabPanel.hidden = false;
}

tabButtons.forEach((button) => {
  button.addEventListener("click", handleClick);
});
