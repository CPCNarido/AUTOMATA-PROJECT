function runAlgorithm() {
    const valA = parseInt(document.getElementById('inputA').value);
    const valB = parseInt(document.getElementById('inputB').value);
    const resultArea = document.getElementById('resultContainer');
    const gcdValDisp = document.getElementById('gcdVal');
    const lcmValDisp = document.getElementById('lcmVal');
    const metrics = document.getElementById('finalMetrics');

    if (isNaN(valA) || isNaN(valB)) {
        resultArea.innerHTML = '<div class="text-error">ERROR: Invalid numerical parameters.</div>';
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
        steps.push(`${a} ÷ ${b} = ${Math.floor(a / b)} remainder ${remainder}`);
        a = b;
        b = remainder;
    }

    let gcd = a;
    let lcm = (originalA === 0 || originalB === 0) ? 0 : Math.abs(originalA * originalB) / gcd;

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
        finalEl.innerHTML = `<span class="cursor-blink mr-2">█</span> GCD FOUND: ${gcd}`;
        resultArea.appendChild(finalEl);

        gcdValDisp.innerText = gcd;
        lcmValDisp.innerText = lcm;
    }, steps.length * 200 + 300);
}

window.runAlgorithm = runAlgorithm;
window.addEventListener('load', runAlgorithm);