
export async function sendQuestionGPT(value) {
    const data = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": value}]
    }
    // Default options are marked with *
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
            "Authorization": "Bearer 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"
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}
