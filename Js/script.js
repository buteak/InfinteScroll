const postContainer = document.getElementById('post-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');


let limit = 5;
let page = 1;


async function display (){
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
  
  const result = await res.json();
  console.log(result)

    return result;
}



async function showPost(){
    const posts= await display();
    posts = posts.map((post)=> {
        const postEl = document.createElement('div');
        postEl.classList.add('post');
        postEl.innerHTML =`
             <div class="number">${post.id}</div>
             <div class="post-info">
             <h2 class="post-title">${post.title}</h2>
             <p class="post-body">${post.body}</p>
        `
        postContainer.appendChild(postEl)
    })
    
    
    
    // return(postContainer.innerHTML = posts.map((post) =>{
    //     let {body,id,title} = post;
    //     return `<div class="post">
    //     <div class="number">${id}</div>
    //     <div class="post-info">
    //         <h2 class="post-title">P${title}</h2>
    //         <p class="post-body">${body}</p>
    //     </div>
    // </div>`;

    // }).join(''))
        
      

    }



function filterPost(e){
  const term =e.target.value.toUpperCase();
}


function showLoading(){
    loading.classList.add('show');
    setTimeout(() =>{
        loading.classList.remove('show');

        setTimeout(() =>{
         page++
         showPost();
        },300)
    },1000)
}
showPost();

window.addEventListener('scroll', () =>{
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
    if(scrollTop + clientHeight >= scrollHeight -200    ){
    showLoading();
    }
})

filter.addEventListener('input', filterPost)