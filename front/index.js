const URL = "http://localhost:3000/api/todo";
const buttonSave = document.getElementById("sendTask");
const inputText = document.getElementById("task");
const iDelete = document.getElementById("delete");
const deleteList = document.getElementsByClassName('bi bi-file-earmark-minus');
const updateList = document.getElementsByClassName('bi bi-pen');
addEventListener('DOMContentLoaded', (event) => {
  // Create an XMLHttpRequest object
  const xhttp = new XMLHttpRequest();
  // Define a callback function
  xhttp.onload = async function() {
    await printData(xhttp.responseText);
    
  }

  // Send a request
  xhttp.open("GET",URL,true);
  xhttp.send();



});

function printData(data){
  const todo = JSON.parse(data);
  const todoUList = document.getElementById('task-list');
  for(let i = 0 ; i < todo.length; i ++ ){
    //li
    const li = document.createElement('li');
    //span
    const span = document.createElement('span');
    //text
    const textSpan = todo[i].description;
    //icons

    const iconDelete=document.createElement('i');
    const iconUpdate=document.createElement('i');
    const iconCheck=document.createElement('i');
    iconDelete.classList = "bi bi-file-earmark-minus"
    iconDelete.id =`${todo[i].id}`
    iconUpdate.classList = "bi bi-pen"
    iconCheck.classList = "bi bi-check-circle"
    span.innerHTML = textSpan;
    li.appendChild(span);
    span.appendChild(iconDelete);
    span.appendChild(iconUpdate);
    span.appendChild(iconCheck);
    li.appendChild(span);
    todoUList.appendChild(li);
    deleteList[i].addEventListener('click',(e)=>{
      e.preventDefault();
      //voy a tener que hacer un get by descrption check the id and then delete; 
      const xhttp = new XMLHttpRequest();
      xhttp.onload=function(){console.log(xhttp.responseText)};
      xhttp.open('DELETE',URL+`/${deleteList[i].id}`,true);
      xhttp.send();
      location.reload();
    });

  }
}

buttonSave.addEventListener('click', sendTask)
function sendTask(event){
  event.preventDefault();
  const description = inputText.value;

  if(description.length > 1){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = () =>{
      let res = JSON.parse(xhttp.responseText);

    }
    xhttp.open("POST", URL,true);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    let test = {
      description : description 
    }
    let test2 = JSON.stringify(test);
    xhttp.send(test2);
  }else{
    console.log("You can't send an empty value");
  }
}



