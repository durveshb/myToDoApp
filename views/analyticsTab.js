import {createElementHelper} from "./../DOMhelpers.js";

function initAnalyticsTab() {
  const graphic = createElementHelper("div", "analytics__graphic graphic");
  const numericalData = createElementHelper("div", "analytics__data");
  const percentage = createElementHelper("div", "analytics__percentage");
  const ratio = createElementHelper("div", "analytics__ratio");
  const visualLeft = createElementHelper(
    "div",
    "graphic__leftHalf graphic__halfCircle"
  );
  const visualLeftInner = createElementHelper(
    "div",
    "graphic__leftProgress graphic__progress"
  );
  const visualRight = createElementHelper(
    "div",
    "graphic__rightHalf graphic__halfCircle"
  );
  const visualRigthInner = createElementHelper(
    "div",
    "graphic__rightProgress graphic__progress"
  );
  const label = createElementHelper("h3", "analytics__label", "Analytics");

  numericalData.append(percentage, ratio);
  visualLeft.append(visualLeftInner);
  visualRight.append(visualRigthInner);
  graphic.append(numericalData, visualLeft, visualRight);

  document.querySelector(".analytics").append(graphic, label);
}

function updateProgressCircle(percentage) {
  const progressL = document.querySelector(".graphic__leftProgress");
  const progressR = document.querySelector(".graphic__rightProgress");

  progressL.style.transform =
    "rotate(" +
    (Math.floor(percentage / 50) ? 180 : (percentage * 180) / 50) +
    "deg)";
  progressR.style.transform =
    "rotate(" + (percentage > 50 ? ((percentage - 50) * 180) / 50 : 0) + "deg)";
}

function updateAnalytics(data) {
  const percentage = document.querySelector(".analytics__percentage");
  const ratio = document.querySelector(".analytics__ratio");

  const completed = data.filter((todo) => todo.completed).length;
  const total = data.length;

  if (total === 0) {
    percentage.innerHTML = "0%";
    ratio.innerHTML = "0 / 0";
    return;
  }

  const per = Math.floor((completed * 100) / total);
  updateProgressCircle(per);
  percentage.innerHTML = `${per}%`;
  ratio.innerHTML = `${completed} / ${total}`;
}

export default {
  initAnalyticsTab,
  updateAnalytics,
};
