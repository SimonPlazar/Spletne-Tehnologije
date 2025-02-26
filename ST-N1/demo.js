console.log('Script is working!');

import { createElement, updateElement } from './ogrodje.js';

function generateComments(num) {
    const comments = [];
    for (let i = 0; i < num; i++) {
        comments.push({
            type: 'p',
            props: { style: 'color: black;' },
            children: [`Comment ${i + 1}`]
        });
    }
    return comments;
}

function deepClone(vNode) {
    return JSON.parse(JSON.stringify(vNode));
}

function modifyComments(vDom, numChanges) {
    const comments = vDom.children;
    const indices = [];

    while (indices.length < numChanges) {
        const randomIndex = Math.floor(Math.random() * comments.length);
        if (!indices.includes(randomIndex)) {
            indices.push(randomIndex);
        }
    }

    indices.forEach(index => {
        comments[index].children = [`Modified Comment ${index + 1}`];
        comments[index].props.style = 'color: red;';
    });
}

function measureTime(fn) {
    const startTime = performance.now();
    fn();
    const endTime = performance.now();
    return endTime - startTime;
}

const XValues = [10, 20, 50, 100, 300, 500];
// const XValues = [10];
const diffRenderTimes = [];
const RenderTimes = [];

const vDom1 = {
    type: 'div',
    props: { id: 'comments-container' },
    children: generateComments(10000)
};
const initialElement = createElement(vDom1);

const appElement = document.getElementById('root');

XValues.forEach(X => {
    let diffTime = 0;
    let renderTime = 0;

    for (let i = 0; i < 10; i++) {
        const vDom2 = deepClone(vDom1);
        modifyComments(vDom2, X);

        appElement.innerHTML = '';

        renderTime += measureTime(() => {
            appElement.appendChild(createElement(vDom2));
        });

        diffTime += measureTime(() => {
            updateElement(appElement, vDom1, vDom2);
        });
    }

    renderTime /= 10;
    diffTime /= 10;

    diffRenderTimes.push(diffTime);
    RenderTimes.push(renderTime);
});

function drawChart(xValues, diffTimes) {
    const ctx = document.getElementById('performanceChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xValues,
            datasets: [
                {
                    label: 'VDOM Render Time (ms)',
                    data: diffTimes,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    fill: false,
                },
                {
                    label: 'Normal render Time (ms)',
                    data: RenderTimes,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    fill: false,
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'X Value (Number of Changes)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Time (ms)'
                    }
                }
            }
        }
    });
}

drawChart(XValues, diffRenderTimes);
