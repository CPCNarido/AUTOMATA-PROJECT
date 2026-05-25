const numberFormatter = new Intl.NumberFormat('en-US');

function formatInteger(value) {
    return numberFormatter.format(value);
}

function parseFormattedInteger(value) {
    return parseInt(String(value).replace(/,/g, ''), 10);
}

function formatIntegerInput(input) {
    const parsedValue = parseFormattedInteger(input.value);

    if (input.value === '' || Number.isNaN(parsedValue)) {
        input.value = '';
        return;
    }

    input.value = formatInteger(parsedValue);
}

function runCollatz() {
    const input = document.getElementById('collatzInput');
    const resultArea = document.getElementById('resultArea');
    const stepCountDisplay = document.getElementById('stepCount');
    const peakValDisplay = document.getElementById('peakVal');
    const convergenceDisplay = document.getElementById('convergence');

    let n = parseFormattedInteger(input.value);
    if (isNaN(n) || n < 1) {
        alert('ERROR: INVALID_INPUT. PLEASE ENTER POSITIVE INTEGER.');
        return;
    }

    resultArea.innerHTML = `<div class="text-primary font-bold">[SYSTEM_MSG] INITIALIZING SEQUENCE FOR: ${formatInteger(n)}</div>`;

    let steps = 0;
    let current = n;
    let peak = n;
    const sequenceValues = [formatInteger(n)];

    const processStep = () => {
        if (current === 1) {
            resultArea.innerHTML += `<div class="text-secondary-fixed font-bold mt-2">--- CONVERGENCE_LOCKED (1) ---</div>`;
            const summaryDiv = document.createElement('div');
            summaryDiv.className = 'mt-3 pt-2 border-t border-muted text-on-surface-variant/80';
            summaryDiv.innerHTML = `<span class="text-secondary-fixed font-bold">SUMMARY:</span> ${sequenceValues.join(',')}`;
            resultArea.appendChild(summaryDiv);
            convergenceDisplay.innerText = 'SUCCESS';
            resultArea.scrollTop = resultArea.scrollHeight;
            return;
        }

        steps++;
        if (current % 2 === 0) {
            current = current / 2;
        } else {
            current = (3 * current) + 1;
        }

        sequenceValues.push(formatInteger(current));

        if (current > peak) peak = current;

        const stepDiv = document.createElement('div');
        stepDiv.className = 'flex gap-4 border-l border-muted pl-2 hover:bg-surface-variant/20 transition-all';
        stepDiv.innerHTML = `
            <span class="text-on-surface-variant/40 w-12 shrink-0">S_${steps.toString().padStart(3, '0')}</span>
            <span class="text-primary">${formatInteger(current)}</span>
        `;
        resultArea.appendChild(stepDiv);

        stepCountDisplay.innerText = `STEPS: ${formatInteger(steps)}`;
        peakValDisplay.innerText = formatInteger(peak);
        resultArea.scrollTop = resultArea.scrollHeight;

        setTimeout(processStep, 30);
    };

    convergenceDisplay.innerText = 'PROCESSING';
    processStep();
}

function clearResults() {
    document.getElementById('resultArea').innerHTML = `<div class="text-on-surface-variant/40 italic">// Logs cleared. Ready for input.</div>`;
    document.getElementById('stepCount').innerText = 'STEPS: 0';
    document.getElementById('peakVal').innerText = '--';
    document.getElementById('convergence').innerText = 'PENDING';
}

const collatzInput = document.getElementById('collatzInput');
if (collatzInput) {
    collatzInput.addEventListener('input', () => formatIntegerInput(collatzInput));
    formatIntegerInput(collatzInput);
}

window.runCollatz = runCollatz;
window.clearResults = clearResults;