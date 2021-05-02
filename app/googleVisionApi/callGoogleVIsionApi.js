export default callGoogleVIsionApi = async (base64) => {
  let googleVisionRes = await fetch(
    "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCzpJ_b6Y4UnvRbPa9D0vM1xcTLQJ-jOtk",
    {
      method: "POST",
      body: JSON.stringify({
        requests: [
          {
            image: {
              content: base64,
            },
            features: [{ type: "LABEL_DETECTION", maxResults: 10 }],
          },
        ],
      }),
    }
  );

<<<<<<< HEAD
    await googleVisionRes.json()
        .then(googleVisionRes => {
            return googleVisionRes.responses[0];
        }).catch((error) => { });


};
=======
  await googleVisionRes
    .json()
    .then((googleVisionRes) => {
      return googleVisionRes.responses[0];
    })
    .catch((error) => {});
};
>>>>>>> 2659a453d4ffed56ac2e24385d5e476388a30e48
