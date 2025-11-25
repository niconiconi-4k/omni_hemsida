const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxrDv5JsxZlhb5FO2bLzInhuhU-EDf_6bbJ8xs6EbMB39fryju4F65Y-MbLrpw89zDVyw/exec';

document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const params = new URLSearchParams(formData);

    fetch(SCRIPT_URL, {
        method: "POST",
        body: params
    })
        .then(r => r.text())
        .then(() => {
            alert("发送成功！");
            this.reset();
        })
        .catch(err => {
            console.error(err);
            alert("网络或服务器错误");
        });
});