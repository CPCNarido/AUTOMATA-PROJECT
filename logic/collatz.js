function runCollatz() {
    const input = document.getElementById('collatzInput');
    const resultArea = document.getElementById('resultArea');
    const stepCountDisplay = document.getElementById('stepCount');
    const peakValDisplay = document.getElementById('peakVal');
    const convergenceDisplay = document.getElementById('convergence');

    let n = parseInt(input.value);
    if (isNaN(n) || n < 1) {
        alert('ERROR: INVALID_INPUT. PLEASE ENTER POSITIVE INTEGER.');
        return;
    }

    resultArea.innerHTML = `<div class="text-primary font-bold">[SYSTEM_MSG] INITIALIZING SEQUENCE FOR: ${n}</div>`;

    let steps = 0;
    let current = n;
    let peak = n;

    const processStep = () => {
        if (current === 1) {
            resultArea.innerHTML += `<div class="text-secondary-fixed font-bold mt-2">--- CONVERGENCE_LOCKED (1) ---</div>`;
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

        if (current > peak) peak = current;

        const stepDiv = document.createElement('div');
        stepDiv.className = 'flex gap-4 border-l border-muted pl-2 hover:bg-surface-variant/20 transition-all';
        stepDiv.innerHTML = `
            <span class="text-on-surface-variant/40 w-12 shrink-0">S_${steps.toString().padStart(3, '0')}</span>
            <span class="text-primary">${current}</span>
        `;
        resultArea.appendChild(stepDiv);

        stepCountDisplay.innerText = `STEPS: ${steps}`;
        peakValDisplay.innerText = peak;
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

window.runCollatz = runCollatz;
window.clearResults = clearResults;