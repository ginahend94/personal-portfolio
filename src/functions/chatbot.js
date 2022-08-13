export default async (message) => {
   return await fetch('https://www.botlibre.com/rest/json/chat', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            application: "5037692590395486313",
            "instance": "44073365",
            "message": message
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            return data.message
        })
        .catch((err) => console.log(err));
};