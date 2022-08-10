export default send = (e, ...args) => {
    e.preventDefault();
    console.log("sending...");
    fetch("https://formsubmit.co/ajax/gina@ginahenderson.me", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            name: args.name,
            email: args.email,
            subject: args.subject,
            message: args.message,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        })
        .catch((error) => console.log(error));
};