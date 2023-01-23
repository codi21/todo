//URL API
const URL = 'http://192.168.1.104:3000/api/todo';
//Grab all html elments
const task_list = document.getElementById('task-list'); 
const buttonSendTask = document.getElementById("sendTask");
const inputTask = document.getElementById("task");
const doneList = document.getElementById("doneList");


const main  = async () => {
  addEventListener('DOMContentLoaded' , async ( event ) => {
    let data = await fetch(URL);
    let todo = await data.json();
    let list1 =await todo.filter((x)=>{
        if ( x.completed ) {
           return x 
        }
     });
     const list2 = todo.filter((x) => {
        if(!x.completed){
           return x
        }
     })
    //html
    let div1 = document.createElement('div'); 
    let div2 = document.createElement('div'); 
    
    div1.innerHTML = list1.map((value)=>{
       return  `
       <li class="tasktodo" id="${value.id}">
          <span class="text">
            ${value.description}
          </span> 
          <span class="iconoEliminar">
          <i class="bi bi-file-earmark-minus" id="${value.id}"></i>

          </span>
          <span class="iconoActualizar">
          <i class="bi bi-pen" id="${value.id}"></i>

          </span>
          <span class="iconoCompletado">
          <i class="bi bi-check-circle" id="${value.id}"></i>

          </span>


        </li>

       `
    }).join('');
   div2.innerHTML = list2.map((value)=>{
       return  `
       <li class="tasktodo" id="${value.id}">
          <span class="text">
            ${value.description}
          </span> 
          <span class="iconoEliminar">
          <i class="bi bi-file-earmark-minus" id="${value.id}"></i>

          </span>
          <span class="iconoActualizar">
          <i class="bi bi-pen" id="${value.id}"></i>

          </span>
          <span class="iconoCompletado">
          <i class="bi bi-check-circle" id="${value.id}"></i>

          </span>


        </li>

       `
    }).join('');
    task_list.appendChild(div2);
    doneList.appendChild(div1);


    // esucho botton eliminar 
    listenDeleteButton();
    //check todo
    checkAction();
    //updating todo
    updateTodo();

  });
   // send todo
   buttonSendTask.addEventListener('click', addTodo);
   
}
const listenDeleteButton = () => {
  const li =  document.getElementsByClassName("bi bi-file-earmark-minus");
   for(let x of li){
      x.addEventListener('click',async()=>{
       
       const deleted = await fetch(URL+`/${x.id}`,{
          method: "DELETE"
       });

         location.reload();
         })
   }

}
const addTodo = async(e) => {
   e.preventDefault();
   
   const text =inputTask.value; 
   const options = {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({
         description : text
      })
   }

   try {
      if(text.length > 0){
        const resp = await fetch(URL,options);
        location.reload();
      }else {
         new Error('Input has no value')
      }
   }catch(e){
      console.log(e.message);
   }
}
const checkAction = () => {
   const checkButtons = document.getElementsByClassName('bi bi-check-circle');
   for(let x of checkButtons){
      x.addEventListener('click',async(e)=>{
         e.preventDefault();
         const  elementDelete = ((x.parentNode).parentNode);
         const options = {
            method: 'PATCH',
            headers : {
               'Content-Type': 'application/json'
            },
            body : JSON.stringify({
               completed : 1
            })
         }
         const checkedElement = await fetch(URL+`/${elementDelete.id}`,options);
         location.reload();
         
               })
      
   }
}
const updateTodo = async () => {
   const updateIcons = document.getElementsByClassName('bi bi-pen');
   for ( let i of updateIcons ) {
      i.addEventListener('click', async(e) => {
        e.preventDefault(); 
         console.log(i.getBoundingClientRect()); 
        const { x , y } = i.getBoundingClientRect()
         console.log(x);
         console.log(y);
        const newHtml = `
         <form>
            <input type="text" id="updateText" autofocus>
            <input type="submit" value="Change Value" id="submitChange">
         </form>
        `
         const div = document.createElement('div');
         const { x1 , y1 } = document.body.getBoundingClientRect();
         console.log(x,y);
         div.innerHTML = newHtml;
         div.style.zIndex = '10000';
         div.style.position = 'absolute';
         div.style.top = `${y}px`;
         div.style.left= `${x}px`;
         window.document.body.appendChild(div);
         console.log(div.getBoundingClientRect());
         const changeText = document.getElementById('updateText')
         
         const submitChange = document.getElementById('submitChange')
         submitChange.addEventListener('click',(e)=>{
            e.preventDefault();
            const textValue = changeText.value;
            const options = {
               method: 'PATCH',
               headers: {
                  'Content-Type': 'application/json'
               },
               body: JSON.stringify({
                  description: textValue
               })

            }
            const sendNewValue = fetch(URL+`/${i.id}`,options);
            location.reload();
         })
      });
   }
}

main();
