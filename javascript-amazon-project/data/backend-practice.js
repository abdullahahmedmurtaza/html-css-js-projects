const xhr = new XMLHttpRequest;
// xhr.open('GET','https://supersimplebackend.dev');
// xhr.addEventListener('load',()=>{
//     console.log(xhr.response); 
// });
// xhr.send();
// We can also change the response using URL paths --> extra part after the URL.
// Backend supports only a set of URL paths


// xhr.open('GET', 'https://supersimplebackend.dev/products/not-supported');
xhr.addEventListener('load',()=>{
    console.log(xhr.response);
});
xhr.open('GET', 'https://supersimplebackend.dev/products/first');
xhr.send();

// All available URL paths are almost never revealed for security reasons, however there is a simple documentation page for all the useful ones related to a backend.

// A list of all available backend URLs is known as an API --> Application Programming Interface