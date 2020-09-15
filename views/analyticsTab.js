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
    updateAnalytics
}
