const circleProgressBars = document.getElementsByClassName('circle-progress-bar__content');

let values = [];

for (let i = 0; i < circleProgressBars.length; i++) {
    values.push(circleProgressBars[i].getAttribute('data-pct'));
}

const progressBars = document.getElementsByClassName('circle-progress-bar__bar');

for (let i = 0; i < progressBars.length; i++) {
    let percentageForCurrentCircle = values[i];
    let radius = progressBars[i].getAttribute('r');
    let circumference = Math.PI * (radius * 2);

    if (percentageForCurrentCircle < 0) {
        percentageForCurrentCircle = 0;
    }

    if (percentageForCurrentCircle > 100) {
        percentageForCurrentCircle = 100;
    }

    let percent = ((100 - percentageForCurrentCircle) / 100) * circumference;
    progressBars[i].setAttribute('stroke-dashoffset', percent.toString());
}