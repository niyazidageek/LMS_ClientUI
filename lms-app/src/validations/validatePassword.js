export default function validatePassword(value) {
    let error;
    if (!value) {
        error = 'Required';
    } else if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/i.test(value)) {
        error = 'Your password must be: 7 to 15 characters which contain at least one numeric digit and a special character'
    }
    return error;
}