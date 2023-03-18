const doRequest = (url, method, payload, handleSuccess, handleError) => {
  fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("login failed");
      }
      return response.json();
    })
    .then((data) => {
      handleSuccess(data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export default doRequest;
