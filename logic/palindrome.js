function checkInput(val) {
    const statusText = document.getElementById('result-status-text');
    const statusIcon = document.getElementById('result-status-icon');
    const resultCard = document.getElementById('result-card');
    const charCount = document.getElementById('char-count').lastElementChild;
    const trace = document.getElementById('execution-trace');

    charCount.innerText = val.length + '_BYTES';

    if (!val.trim()) {
        statusText.innerText = 'NO_INPUT_DETECTED';
        statusIcon.innerText = 'pending';
        statusText.className = 'font-headline-md text-headline-md opacity-40 uppercase';
        statusIcon.className = 'text-5xl material-symbols-outlined mb-2 opacity-20';
        resultCard.style.borderColor = '#2A2D35';
        trace.innerHTML = '<div class="opacity-30">Waiting for data packet sequence...</div>';
        return;
    }

    const clean = val.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (clean.length === 0) {
        statusText.innerText = 'INVALID_SEQUENCE';
        statusIcon.innerText = 'error';
        resultCard.style.borderColor = '#ffb4ab';
        return;
    }

    const isPalindrome = clean === clean.split('').reverse().join('');
    let traceHtml = `<div class="text-secondary-fixed mb-1">[ OK ] Sequence received: "${val.substring(0, 20)}${val.length > 20 ? '...' : ''}"</div>`;
    traceHtml += `<div class="text-on-surface-variant">[ INFO ] Normalized buffer: ${clean}</div>`;
    traceHtml += `<div class="text-on-surface-variant">[ INFO ] Reverse compare: ${clean.split('').reverse().join('')}</div>`;
    traceHtml += `<div class="mt-2 ${isPalindrome ? 'text-secondary-fixed' : 'text-error'} font-bold">[ ${isPalindrome ? 'PASS' : 'FAIL'} ] ${isPalindrome ? 'PALINDROME_CONFIRMED' : 'SEQUENCE_MISMATCH'}</div>`;
    trace.innerHTML = traceHtml;

    if (isPalindrome) {
        statusText.innerText = 'PALINDROME_CONFIRMED';
        statusIcon.innerText = 'check_circle';
        statusText.className = 'font-headline-md text-headline-md text-secondary-fixed uppercase';
        statusIcon.className = 'text-5xl material-symbols-outlined mb-2 text-secondary-fixed';
        resultCard.style.borderColor = '#c3f400';
    } else {
        statusText.innerText = 'SEQUENCE_MISMATCH';
        statusIcon.innerText = 'cancel';
        statusText.className = 'font-headline-md text-headline-md text-error uppercase';
        statusIcon.className = 'text-5xl material-symbols-outlined mb-2 text-error';
        resultCard.style.borderColor = '#ffb4ab';
    }
}

window.checkInput = checkInput;