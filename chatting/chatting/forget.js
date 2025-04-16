document.querySelectorAll('.otp-inputs input').forEach((input, index, inputs) => {
    input.addEventListener('input', () => {
        if (input.value.length === 1 && index < inputs.length - 1) {
            // Move to the next input if the current one is filled
            inputs[index + 1].focus();
        } else if (input.value.length === 0 && index > 0) {
            // Move to the previous input if the current one is empty
            inputs[index - 1].focus();
        }
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && input.value.length === 0 && index > 0) {
            inputs[index - 1].focus();
        }
    });
});
