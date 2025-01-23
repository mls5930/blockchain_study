const ajax_get = document.querySelector('#ajax_get');
const ajax_post = document.querySelector('#ajax_post');
const msg = document.querySelector('#msg');

// request({ method: "get", path: "/users/5", body: "" }, ()=>{ ... })
const request = ({ method, path, body }, callback) => {
  const host = 'http://localhost:3000';
  const xhr = new XMLHttpRequest();
  // http://localhost:3000/users
  xhr.open(method, `${host}${path}`);
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.send(body);

  xhr.onload = () => {
    console.log(xhr);
    if (xhr.status === 200) {
      callback(xhr.response);
    }
  };
};

ajax_get.addEventListener('click', (e) => {
  request({ method: 'get', path: '/users' }, (response) => {
    console.log(response);
  });
});
