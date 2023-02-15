let userId = location.search.substring(1);
console.log(userId);
let link = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;
trigger(link);
let itemsChecked = [];
let postsChecked = [];
let DeleteButton = document.createElement('button');
DeleteButton.addEventListener('click', function() {
    if(confirm("Do you want to delete?")){
        for(let j = 0;j<itemsChecked.length; j++){
            fetch(`https://jsonplaceholder.typicode.com/posts/${postsChecked[j]}`, {
                method: 'DELETE',
            })
            .then((res) => res.status)
            .then((res) => {
                if (res === 200) {
                    itemsChecked[j].remove();
                }
            })
        }
        DeleteButton.style.visibility = "hidden";
    }
    else{
        alert("Nice decision!!");
    }
});
async function trigger(link) {
    let posts = await fetch(link).then(users => users.json()).then(msg => msg);

    let body = document.getElementsByTagName('body')[0];
    let Parentdiv = document.createElement('div');
    Parentdiv.setAttribute('id', 'flexBox');
    body.append(DeleteButton);
    DeleteButton.setAttribute('id', 'delete');
    DeleteButton.innerText = "DELETE";
    body.append(Parentdiv);
    let div = [];
    for (let i = 0; i < posts.length; i++) {
        // getting each post comments
        link = `https://jsonplaceholder.typicode.com/posts/${posts[i].id}/comments`;
        let comments = await fetch(link).then(users => users.json()).then(msg => msg);
        div.push(document.createElement('div'));
        div[i].setAttribute('id', `id-${i + 1}`);
        div[i].innerHTML = `<div class = 'check-box'><input type = 'checkbox'> </div> <div class = 'icons'><a href = "#"><i class='fa-solid fa-trash trash'></i></a><a href="#"><i class='fa-solid fa-pen edit'></i></a> <a href = "#"><i class="fa-solid fa-floppy-disk save"></i></a></div> <div class = 'title'></div>  <div class = 'body'></div> <div class = 'comments'></div>`;

        let checkbox = div[i].getElementsByClassName('check-box')[0];
        checkbox = checkbox.getElementsByTagName('input')[0];
        checkbox.setAttribute('id', `check${i}`);
        let icons = div[i].getElementsByClassName('icons')[0];
        icons.style.marginTop = "15px";
        let trash = icons.getElementsByClassName('trash')[0];
        trash.setAttribute('id', `t${i}`);
        trash.style.margin = "0px 20px 0px 20px";
        div[i].style.padding = "10px";
        let edit = icons.getElementsByClassName('edit')[0];
        edit.style.color = "grey";
        let save = icons.getElementsByClassName('save')[0];
        save.style.color = "black";
        let title = div[i].getElementsByClassName("title")[0];
        title.innerHTML = "<h5>TITLE:</h5> <p class = 'my-para'></p>";
        let para = title.getElementsByClassName('my-para')[0];
        para.innerText = posts[i].title;
        let cardBody = div[i].getElementsByClassName('body')[0];
        cardBody.innerHTML = "<h5>BODY:</h5> <p class = my-para></p>";
        para = cardBody.getElementsByClassName('my-para')[0];
        para.innerText = posts[i].body;
        let commentTag = div[i].getElementsByClassName('comments')[0];
        commentTag.innerHTML = "<h5>COMMENTS:</h5>";
        for (let k = 0; k < 3; k++) {
            let singleComment = document.createElement('div');
            singleComment.innerHTML = "<div class = 'comments-name'></div> <div class = 'comments-body'></div> <div class = 'comments-email'></div>";
            let commentsName = singleComment.getElementsByClassName('comments-name')[0];
            commentsName.innerHTML = "<h5>NAME:</h5> <p class = 'my-para'></p>";
            let commentsBody = singleComment.getElementsByClassName('comments-body')[0];
            commentsBody.innerHTML = "<h5>BODY: </h5> <p class = 'my-para'></p>";
            let commentsEmail = singleComment.getElementsByClassName('comments-email')[0];
            commentsEmail.innerHTML = "<h5>EMAIL:<h5> <p class = 'my-para'></p>";
            para = commentsName.getElementsByClassName('my-para')[0];
            para.innerText = comments[k].name;
            para = commentsBody.getElementsByClassName('my-para')[0];
            para.innerText = comments[k].body;
            para = commentsEmail.getElementsByClassName('my-para')[0];
            para.innerText = comments[k].email;
            commentTag.append(singleComment);
        }
        Parentdiv.append(div[i]);
        trash.addEventListener('click', function () {
            if (confirm("Do you want to delete?")) {
                fetch(`https://jsonplaceholder.typicode.com/posts/${posts[i].id}`, {
                    method: 'DELETE',
                })
                    .then((res) => res.status)
                    .then((res) => {
                        if (res === 200) {
                            div[i].remove();
                        }
                    })
            }
            else {
                alert("nice decision");
            }
        });

        edit.addEventListener('click', function () {
            edit.style.color = "black";
            save.style.color = "grey";
            para = title.getElementsByClassName('my-para')[0];
            para.contentEditable = true;
            para = cardBody.getElementsByClassName('my-para')[0];
            para.contentEditable = true;
        });

        save.addEventListener('click', function () {
            edit.style.color = "grey";
            save.style.color = "black";
            para = title.getElementsByClassName('my-para')[0];
            para.contentEditable = false;
            para = cardBody.getElementsByClassName('my-para')[0];
            para.contentEditable = false;
        });

        checkbox.addEventListener('click', function (event) {
            if (event.target.checked) {
                itemsChecked.push(div[i]);
                postsChecked.push(posts[i].id);
                console.log(div[i]);
                div[i].style.transform = "scale(1.01)";
                DeleteButton.style.visibility = "visible";
                div[i].style.boxShadow = "10px 10px 10px 10px rgb(165, 159, 159)";
            }
            else if(event.target.checked === false){
                div[i].style.transform = "scale(1.0)";
                let index = itemsChecked.indexOf(div[i]);
                itemsChecked.splice(index,1);
                div[i].style.boxShadow = "0px 0px 0px 0px";
            }
            if(itemsChecked.length === 0){
                DeleteButton.style.visibility = "hidden";
            }
        });
    }
}