export const catchError = (err) => {
    console.log(err);
    err.json().then(errorMessage => {
        alert(errorMessage.message)
    })
};