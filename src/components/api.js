const baseUrl = "https://nomoreparties.co";
const cards = `${baseUrl}/v1/wff-cohort-6/cards`;
const me = `${baseUrl}/v1/wff-cohort-6/users/me`;
const headers = {
  authorization: "aa041bbb-16e8-4600-a3ac-8ac9df1b21a4",
};

function handleResponse(response){
  if (!response.ok) {
    return Promise.reject(`Ошибка: ${response.status}`);
  }
  return response.json();
}

function get(endpoint) {
  return fetch(endpoint, { headers: headers }).then((response) => {
    handleResponse(response)
  });
}

function getUserData() {
  return get(me);
}
