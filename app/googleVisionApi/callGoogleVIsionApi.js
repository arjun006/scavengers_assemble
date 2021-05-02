export default callGoogleVIsionApi = async (base64) => {
    let googleVisionRes = await fetch("https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCzpJ_b6Y4UnvRbPa9D0vM1xcTLQJ-jOtk", {
        method: 'POST',
        body: JSON.stringify({
            "requests": [
                {
                    "image": {
                        "content": base64
                    },
                    features: [
                        { type: "LABEL_DETECTION", maxResults: 10 },
                    ],
                }
            ]
        })
    });

    await googleVisionRes.json()
        .then(googleVisionRes => {
            console.log(googleVisionRes.responses[0]);
        }).catch((error) => { });
};