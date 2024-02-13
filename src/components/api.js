const baseUrl = "https://nomoreparties.co";
const cards = `${baseUrl}/v1/wff-cohort-6/cards`;
const me = `${baseUrl}/v1/wff-cohort-6/users/me`;
const headers = {
  'Authorization': 'aa041bbb-16e8-4600-a3ac-8ac9df1b21a4',
  'Content-Type': 'application/json'
};

function handleResponse(response){
  if (!response.ok) {
    return Promise.reject(`Ошибка: ${response.status}`);
  }
  return response.json();
}

function request(method, endpoint, json=undefined) {
  if(json){
    json = JSON.stringify(json)
  }
  return fetch(endpoint, { headers: headers, method: method, body: json }).then((response) => {
    return handleResponse(response)
  });
}

export function getUserData() {
  return request('GET', me);
}

export function editUserData(json) {
  return request('PATCH', me , json)
}

export function getCards() {
  return request('GET', cards)
}
