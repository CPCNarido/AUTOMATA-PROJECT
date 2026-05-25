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

const codeBlocks = {
    division: `<span class="text-code-keyword">public class</span> <span class="text-primary">DivisionLogic</span> {
    <span class="text-code-comment">// Implements the Euclidean Division Theorem</span>
    <span class="text-code-keyword">public static</span> Result <span class="text-primary">execute</span>(<span class="text-code-keyword">int</span> a, <span class="text-code-keyword">int</span> d) {
        <span class="text-code-keyword">if</span> (d == <span class="text-code-string">0</span>) <span class="text-code-keyword">throw new</span> <span class="text-error">ArithmeticException</span>();
        
        <span class="text-code-keyword">int</span> q = a / d;
        <span class="text-code-keyword">int</span> r = a % d;

        <span class="text-code-keyword">if</span> (r &lt; <span class="text-code-string">0</span>) {
            r += Math.abs(d);
            q = (a - r) / d;
        }

        <span class="text-code-keyword">return new</span> <span class="text-primary">Result</span>(q, r);
    }
}`,
    euclidean: `<span class="text-code-keyword">public class</span> <span class="text-primary">EuclideanLogic</span> {
    <span class="text-code-comment">// Implements the Euclidean Algorithm for GCD</span>
    <span class="text-code-keyword">public static int</span> <span class="text-primary">gcd</span>(<span class="text-code-keyword">int</span> a, <span class="text-code-keyword">int</span> b) {
        a = Math.abs(a);
        b = Math.abs(b);
        
        <span class="text-code-keyword">while</span> (b != <span class="text-code-string">0</span>) {
            <span class="text-code-keyword">int</span> temp = b;
            b = a % b;
            a = temp;
        }
        <span class="text-code-keyword">return</span> a;
    }
}`
};

const tabDiv = document.getElementById('tabDiv');
const tabEuc = document.getElementById('tabEuc');
const codeDisplay = document.getElementById('codeDisplay');
const runBtn = document.getElementById('runBtn');
const breakdownContainer = document.getElementById('breakdownContainer');
const inputA = document.getElementById('inputA');
const inputB = document.getElementById('inputB');

[inputA, inputB].forEach((input) => {
    if (!input) {
        return;
    }

    input.addEventListener('input', () => formatIntegerInput(input, true));
    formatIntegerInput(input, true);
});

tabDiv.addEventListener('click', () => {
    codeDisplay.innerHTML = codeBlocks.division;
    tabDiv.className = 'font-label-caps text-label-caps text-primary border-b border-primary pb-0.5';
    tabEuc.className = 'font-label-caps text-label-caps text-on-surface-variant/70 hover:text-primary transition-colors';
});

tabEuc.addEventListener('click', () => {
    codeDisplay.innerHTML = codeBlocks.euclidean;
    tabEuc.className = 'font-label-caps text-label-caps text-primary border-b border-primary pb-0.5';
    tabDiv.className = 'font-label-caps text-label-caps text-on-surface-variant/70 hover:text-primary transition-colors';
});

runBtn.addEventListener('click', () => {
    let a = parseFormattedInteger(inputA.value);
    let b = parseFormattedInteger(inputB.value);

    if (isNaN(a) || isNaN(b) || b === 0) {
        alert('Please enter valid integers. B cannot be zero.');
        return;
    }

    if (a < b) {
        alert('Please enter valid integers. Integer A must not be less than Integer B.');
        return;
    }

    breakdownContainer.innerHTML = '';
    let currentA = Math.abs(a);
    let currentB = Math.abs(b);
    let step = 1;

    while (currentB !== 0) {
        let q = Math.floor(currentA / currentB);
        let r = currentA % currentB;

        const stepDiv = document.createElement('div');
        stepDiv.className = 'step-entry opacity-0 translate-x-4 transition-all duration-300';
        stepDiv.innerHTML = `
            <div class="text-[10px] text-on-surface-variant font-label-caps mb-1">STEP_${step.toString().padStart(2, '0')}</div>
            <div><span class="text-primary">${formatInteger(currentA)}</span> = (<span class="text-secondary-fixed">${formatInteger(currentB)}</span> × <span class="text-primary">${formatInteger(q)}</span>) + <span class="text-error">${formatInteger(r)}</span></div>
        `;
        breakdownContainer.appendChild(stepDiv);

        setTimeout(() => {
            stepDiv.classList.remove('opacity-0', 'translate-x-4');
        }, step * 100);

        currentA = currentB;
        currentB = r;
        step++;
    }

    const finalDiv = document.createElement('div');
    finalDiv.className = 'mt-4 p-stack-md bg-secondary-fixed/5 border-l-2 border-secondary-fixed opacity-0 transition-all duration-500';
    finalDiv.innerHTML = `
        <div class="font-label-caps text-[10px] text-secondary-fixed mb-1">FINAL_RESULT</div>
        <div class="flex justify-between">
            <span class="text-on-surface">GCD(${formatInteger(a)}, ${formatInteger(b)}):</span>
            <span class="text-secondary-fixed font-bold">${formatInteger(currentA)}</span>
        </div>
    `;
    breakdownContainer.appendChild(finalDiv);
    setTimeout(() => finalDiv.classList.remove('opacity-0'), step * 100 + 100);
});

document.addEventListener('mouseover', (e) => {
    if (e.target.closest('pre')) {
        e.target.closest('pre').style.color = '#fff';
    }
});
document.addEventListener('mouseout', (e) => {
    if (e.target.closest('pre')) {
        e.target.closest('pre').style.color = '';
    }
});