export function userActivation(c, email, secret_key) {

    const template = `
            Hello ${email},
    
            Please click the link below to complete your registration.  ${secret_key}
        `;

    // Utility function to convert object to URL string
    const urlfy = (obj) =>
        Object.keys(obj)
            .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(obj[k]))
            .join("&");

    let data = {
        from: c.env.MAIL.FROM,
        to: email,
        subject: c.env.MAIL.SUBJECT,
        html: template,
    };

    let options = {
        method: "POST",
        headers: {
            Authorization: "Basic " + btoa("api:" + c.env.MAILGUN_KEY),
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: urlfy(data)
    };

    const url = `https://api.mailgun.net/v3/${c.env.MAILGUN_DOMAIN}/messages`;

    return fetch(url, options);
}