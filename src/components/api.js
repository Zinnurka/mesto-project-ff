const baseUrl = "https://nomoreparties.co";
const headers = {
  Authorization: "aa041bbb-16e8-4600-a3ac-8ac9df1b21a4",
  "Content-Type": "application/json",
};

function handleResponse(response) {
  if (!response.ok) {
    return Promise.reject(`Ошибка: ${response.status}`);
  }
  return response.json();
}

function request(method, endpoint, json = undefined) {
  if (json) {
    json = JSON.stringify(json);
  }
  return fetch(endpoint, { headers: headers, method: method, body: json }).then(
    (response) => {
      return handleResponse(response);
    }
  );
}

export function getUserData() {
  return request("GET", `${baseUrl}/v1/wff-cohort-6/users/me`);
}

export function editUserData(json) {
  return request("PATCH", `${baseUrl}/v1/wff-cohort-6/users/me`, json);
}

export function editAvatar(json) {
  return request("PATCH", `${baseUrl}/v1/wff-cohort-6/users/me/avatar`, json);
}

export function getCards() {
  return request("GET", `${baseUrl}/v1/wff-cohort-6/cards`);
}

export function addCard(json) {
  return request("POST", `${baseUrl}/v1/wff-cohort-6/cards`, json);
}

export function deleteCard(cardID) {
  return request("DELETE", `${baseUrl}/v1/wff-cohort-6/cards/${cardID}`);
}

export function addLike(cardID) {
  return request("PUT", `${baseUrl}/v1/wff-cohort-6/cards/likes/${cardID}`);
}

export function deleteLike(cardID) {
  return request("DELETE", `${baseUrl}/v1/wff-cohort-6/cards/likes/${cardID}`);
}