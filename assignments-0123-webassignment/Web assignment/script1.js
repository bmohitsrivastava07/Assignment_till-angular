let link = "https://jsonplaceholder.typicode.com/users";
trigger(link);
async function trigger(link){
    let data = await fetch(link).then(users => users.json());
    let table = document.getElementsByTagName('table')[0];
    table.style.border = "1px solid black";
    for(let i = 0;i<data.length;i++){
        let row = document.createElement('tr');
        row.style.border = "1px solid black";
        for(let j = 0;j<5;j++){
            let col = document.createElement('td');
            row.append(col);
        }
        let col = row.getElementsByTagName('td')[0];
        col.innerText = data[i].name;
        col = row.getElementsByTagName('td')[1];
        col.innerText = data[i].email;
        col = row.getElementsByTagName('td')[2];
        col.innerText = data[i].phone;
        col = row.getElementsByTagName('td')[3];
        col.innerText = data[i].website;
        col = row.getElementsByTagName('td')[4];
        col.innerText = data[i].company.name;    
        table.append(row);
        row.addEventListener("click", () => {
            window.open(`second.html?${i+1}`);
        })
    }
}