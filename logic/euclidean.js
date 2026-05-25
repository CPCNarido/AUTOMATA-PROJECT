const numberFormatter = new Intl.NumberFormat('en-US');

function formatInteger(value) {
    return numberFormatter.format(value);
}

function parseFormattedInteger(value) {
    return parseInt(String(value).replace(/,/g, ''), 10);
}

function formatIntegerInput(input, allowNegative = true) {
    const rawValue = String(input.value).replace(/,/g, '');
    const normalizedValue = allowNegative ? rawValue.replace(/(?!^)-/g, '') : rawValue.replace(/-/g, '');
    const parsedValue = parseInt(normalizedValue, 10);

    if (input.value === '' || Number.isNaN(parsedValue) || normalizedValue === '-') {
        input.value = normalizedValue === '-' && allowNegative ? '-' : '';
        return;
    }

    input.value = (normalizedValue.startsWith('-') && allowNegative ? '-' : '') + formatInteger(Math.abs(parsedValue));
}

function runAlgorithm() {
    const valA = parseFormattedInteger(document.getElementById('inputA').value);
    const valB = parseFormattedInteger(document.getElementById('inputB').value);
    const resultArea = document.getElementById('resultContainer');
    const gcdValDisp = document.getElementById('gcdVal');
    const lcmValDisp = document.getElementById('lcmVal');
    const metrics = document.getElementById('finalMetrics');

    if (isNaN(valA) || isNaN(valB)) {
        resultArea.innerHTML = '<div class="text-error">ERROR: Invalid numerical parameters.</div>';
        return;
    }

    if (valA < valB) {
        resultArea.innerHTML = '<div class="text-error">ERROR: Integer A must not be less than Integer B.</div>';
        return;
    }

    resultArea.innerHTML = '';
    metrics.classList.remove('hidden');

    let a = Math.abs(valA);
    let b = Math.abs(valB);
    let originalA = a;
    let originalB = b;
    let steps = [];

    while (b !== 0) {
        let remainder = a % b;
        steps.push(`${formatInteger(a)} ÷ ${formatInteger(b)} = ${formatInteger(Math.floor(a / b))} remainder ${formatInteger(remainder)}`);
        a = b;
        b = remainder;
    }

    let gcd = a;
    let lcm = (originalA === 0 || originalB === 0) ? 0 : Math.abs(originalA * originalB) / gcd;
    let lcmSteps = [];

    if (originalA === 0 || originalB === 0) {
        lcmSteps.push(`LCM(${formatInteger(originalA)}, ${formatInteger(originalB)}) = 0 because one value is 0`);
    } else {
        lcmSteps.push(`LCM(${formatInteger(originalA)}, ${formatInteger(originalB)}) = |${formatInteger(originalA)} × ${formatInteger(originalB)}| / GCD(${formatInteger(originalA)}, ${formatInteger(originalB)})`);
        lcmSteps.push(`LCM(${formatInteger(originalA)}, ${formatInteger(originalB)}) = ${formatInteger(Math.abs(originalA * originalB))} / ${formatInteger(gcd)}`);
        lcmSteps.push(`LCM(${formatInteger(originalA)}, ${formatInteger(originalB)}) = ${formatInteger(lcm)}`);
    }

    steps.forEach((step, index) => {
        setTimeout(() => {
            const el = document.createElement('div');
            el.className = 'step-entry';
            el.innerHTML = `<span class="text-primary mr-3">[STEP ${index + 1}]</span> <span>${step}</span>`;
            resultArea.appendChild(el);
        }, index * 200);
    });

    setTimeout(() => {
        const finalEl = document.createElement('div');
        finalEl.className = 'mt-6 text-primary font-bold';
        finalEl.innerHTML = `<span class="cursor-blink mr-2">█</span> GCD FOUND: ${formatInteger(gcd)}`;
        resultArea.appendChild(finalEl);

        gcdValDisp.innerText = formatInteger(gcd);
        lcmValDisp.innerText = formatInteger(lcm);
    }, steps.length * 200 + 300);

    setTimeout(() => {
        const lcmHeader = document.createElement('div');
        lcmHeader.className = 'mt-6 text-secondary-fixed font-bold';
        lcmHeader.textContent = 'LCM SOLUTION:';
        resultArea.appendChild(lcmHeader);

        lcmSteps.forEach((line) => {
            const lcmLine = document.createElement('div');
            lcmLine.className = 'text-on-surface-variant';
            lcmLine.textContent = line;
            resultArea.appendChild(lcmLine);
        });

        resultArea.scrollTop = resultArea.scrollHeight;
    }, steps.length * 200 + 500);
}

const inputA = document.getElementById('inputA');
const inputB = document.getElementById('inputB');

[inputA, inputB].forEach((input) => {
    if (!input) {
        return;
    }

    input.addEventListener('input', () => formatIntegerInput(input, true));
    formatIntegerInput(input, true);
});

window.runAlgorithm = runAlgorithm;
window.addEventListener('load', runAlgorithm);