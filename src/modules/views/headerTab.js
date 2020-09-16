import { createElementHelper } from "./../DOMhelpers.js";
import { days, months } from "./../dates.js";

function initHeaderTab() {
  const currDate = new Date();
  const calenderInner = `${days[currDate.getDay()]}, ${
    months[currDate.getMonth()]
  } ${currDate.getDate()}`;
  const calender = createElementHelper("div", "header__calender", calenderInner);
  const logo = createElementHelper("div", "header__logo", "To-Do List ");

  document.querySelector('[data-containertype="header"]').append(calender, logo);
}

export default {
    initHeaderTab
}