const SCRIPT_URL_SUB = 'https://script.google.com/macros/s/AKfycbxrDv5JsxZlhb5FO2bLzInhuhU-EDf_6bbJ8xs6EbMB39fryju4F65Y-MbLrpw89zDVyw/exec';

document.getElementById("subscribe").addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const params = new URLSearchParams(formData);
    params.append('name', '-');
    params.append('message', '-');
    console.log(params.keys().next().value);

    fetch(SCRIPT_URL_SUB, {
        method: "POST",
        body: params
    })
        .then(r => r.text())
        .then(() => {
            alert("Success!");
            this.reset();
        })
        .catch(err => {
            console.error(err);
            alert("Network or server error");
        });
});