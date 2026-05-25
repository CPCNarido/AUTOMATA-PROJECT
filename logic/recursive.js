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

let currentSequence = 'fibonacci';

const sequenceData = {
    fibonacci: {
        title: 'RECURSIVE_LAB: FIBONACCI',
        terminalTitle: 'PROCESS: FIBONACCI_COMPUTE',
        timeComplexity: 'O(2ⁿ)',
        code: `<span class="text-code-keyword">public long</span> <span class="text-primary">fibonacci</span>(int n) {
    <span class="text-code-keyword">if</span> (n <= 1) <span class="text-code-keyword">return</span> n;
    <span class="text-code-keyword">return</span> fibonacci(n - 1) + fibonacci(n - 2);
}`,
        logic: (n) => {
            let seq = [0, 1];
            for (let i = 2; i < n; i++) seq[i] = seq[i - 1] + seq[i - 2];
            return seq.slice(0, n);
        }
    },
    lucas: {
        title: 'RECURSIVE_LAB: LUCAS',
        terminalTitle: 'PROCESS: LUCAS_GENERATOR',
        timeComplexity: 'O(2ⁿ)',
        code: `<span class="text-code-keyword">public long</span> <span class="text-primary">lucas</span>(int n) {
    <span class="text-code-keyword">if</span> (n == 0) <span class="text-code-keyword">return</span> 2;
    <span class="text-code-keyword">if</span> (n == 1) <span class="text-code-keyword">return</span> 1;
    <span class="text-code-keyword">return</span> lucas(n - 1) + lucas(n - 2);
}`,
        logic: (n) => {
            let seq = [2, 1];
            for (let i = 2; i < n; i++) seq[i] = seq[i - 1] + seq[i - 2];
            return seq.slice(0, n);
        }
    },
    tribonacci: {
        title: 'RECURSIVE_LAB: TRIBONACCI',
        terminalTitle: 'PROCESS: TRIB_COMPUTE_OPS',
        timeComplexity: 'O(3ⁿ)',
        code: `<span class="text-code-keyword">public long</span> <span class="text-primary">tribonacci</span>(int n) {
    <span class="text-code-keyword">if</span> (n == 0 || n == 1) <span class="text-code-keyword">return</span> 0;
    <span class="text-code-keyword">if</span> (n == 2) <span class="text-code-keyword">return</span> 1;
    <span class="text-code-keyword">return</span> tribonacci(n-1) + tribonacci(n-2) + tribonacci(n-3);
}`,
        logic: (n) => {
            let seq = [0, 0, 1];
            if (n <= 3) return seq.slice(0, n);
            for (let i = 3; i < n; i++) seq[i] = seq[i - 1] + seq[i - 2] + seq[i - 3];
            return seq;
        }
    }
};

function switchTab(type) {
    currentSequence = type;

    document.querySelectorAll('.tab-btn').forEach(btn => {
        if (btn.dataset.tab === type) {
            btn.classList.add('active-tab');
            btn.classList.remove('text-on-surface-variant', 'hover:bg-surface-variant/20');
        } else {
            btn.classList.remove('active-tab');
            btn.classList.add('text-on-surface-variant', 'hover:bg-surface-variant/20');
        }
    });

    const data = sequenceData[type];
    document.getElementById('page-title').textContent = data.title;
    document.getElementById('terminal-title').textContent = data.terminalTitle;
    document.getElementById('complexity-time').textContent = data.timeComplexity;
    document.getElementById('code-display').innerHTML = data.code;

    document.getElementById('sequence-output').innerHTML = '';
    document.getElementById('progress-bar').style.width = '0%';
}

async function generateSequence() {
    const n = parseFormattedInteger(document.getElementById('iteration-input').value);
    if (isNaN(n) || n < 1 || n > 50) return;

    const container = document.getElementById('sequence-output');
    const progress = document.getElementById('progress-bar');

    container.innerHTML = `<span class="text-on-surface-variant/40">> EXEC ${currentSequence.toUpperCase()} (N=${n})</span><br>`;

    const results = sequenceData[currentSequence].logic(n);

    for (let i = 0; i < results.length; i++) {
        await new Promise(r => setTimeout(r, 80));
        const line = document.createElement('div');
        line.className = 'flex items-center gap-3 mb-1 pl-2 border-l border-primary/20 hover:bg-primary/5 transition-colors';
        line.innerHTML = `
            <span class="text-[10px] text-on-surface-variant/40 font-label-caps w-16">n[${i}]</span> 
            <span class="text-code-string font-bold">${formatInteger(results[i])}</span>
        `;
        container.appendChild(line);
        const body = document.getElementById('terminal-content');
        body.scrollTop = body.scrollHeight;
        progress.style.width = `${((i + 1) / results.length) * 100}%`;
    }
    // Add a single-line summary showing the entire sequence on one line
    const summaryDiv = document.createElement('div');
    summaryDiv.className = 'mt-4 p-2 bg-background-deep/10 text-on-surface font-code-block rounded';
    const joined = results.map((value) => formatInteger(value)).join(', ');
    summaryDiv.innerHTML = `
        <div class="text-[10px] text-on-surface-variant font-label-caps mb-1">SUMMARY</div>
        <div class="text-sm">${joined}</div>
    `;
    container.appendChild(summaryDiv);

    const done = document.createElement('div');
    done.className = 'mt-2 text-secondary-fixed font-bold font-label-caps text-xs';
    done.textContent = `> COMPUTE_STABLE: ${formatInteger(results.length)} nodes returned.`;
    container.appendChild(done);
    document.getElementById('terminal-content').scrollTop = document.getElementById('terminal-content').scrollHeight;
}

const iterationInput = document.getElementById('iteration-input');
if (iterationInput) {
    iterationInput.addEventListener('input', () => formatIntegerInput(iterationInput));
    formatIntegerInput(iterationInput);
}

window.switchTab = switchTab;
window.generateSequence = generateSequence;
switchTab('fibonacci');