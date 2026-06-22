let tasks =
JSON.parse(localStorage.getItem("kanbanTasks")) || [];

// asegurar render cuando carga la página
window.addEventListener("load", renderTasks);

function renderTasks(){

document.getElementById("pendingTasks").innerHTML="";
document.getElementById("progressTasks").innerHTML="";
document.getElementById("completedTasks").innerHTML="";

tasks.forEach(task=>{

let card=document.createElement("div");
card.className="card";

card.innerHTML=`
<div class="card-title">
${task.title}
</div>

<div class="card-desc">
${task.desc || "-"}
</div>

<div class="card-actions">

<select onchange="changeStatus(${task.id},this.value)">
<option value="pending" ${task.status==="pending"?"selected":""}>Pendiente</option>
<option value="progress" ${task.status==="progress"?"selected":""}>En proceso</option>
<option value="completed" ${task.status==="completed"?"selected":""}>Completada</option>
</select>

<button onclick="editTask(${task.id})">
✏️
</button>

<button class="danger"
onclick="deleteTask(${task.id})">
🗑
</button>

</div>
`;

if(task.status==="pending"){
document.getElementById("pendingTasks").appendChild(card);
}

if(task.status==="progress"){
document.getElementById("progressTasks").appendChild(card);
}

if(task.status==="completed"){
document.getElementById("completedTasks").appendChild(card);
}

});

}

function openModal(){

document.getElementById("taskModal").style.display="flex";

document.getElementById("taskId").value="";
document.getElementById("taskTitle").value="";
document.getElementById("taskDesc").value="";
document.getElementById("taskStatus").value="pending";

}

function closeModal(){
document.getElementById("taskModal").style.display = "none";
}

function saveTask(){

let id=document.getElementById("taskId").value;
let title=document.getElementById("taskTitle").value;
let desc=document.getElementById("taskDesc").value;
let status=document.getElementById("taskStatus").value;

if(title.trim()===""){
alert("Ingrese una tarea");
return;
}

if(id){

let task=tasks.find(t=>t.id==id);

task.title=title;
task.desc=desc;
task.status=status;

}else{

tasks.push({
id:Date.now(),
title,
desc,
status
});

}

// 🔥 GUARDADO AUTOMÁTICO (clave)
saveTasks();

document.getElementById("taskModal").style.display="none";

renderTasks();

}

function editTask(id){

let task=tasks.find(t=>t.id===id);

document.getElementById("taskId").value=task.id;
document.getElementById("taskTitle").value=task.title;
document.getElementById("taskDesc").value=task.desc;
document.getElementById("taskStatus").value=task.status;

document.getElementById("taskModal").style.display="flex";

}

function deleteTask(id){

if(confirm("¿Eliminar tarea?")){

tasks=tasks.filter(t=>t.id!==id);

saveTasks();

renderTasks();

}

}

function changeStatus(id,status){

let task=tasks.find(t=>t.id===id);

task.status=status;

saveTasks();

renderTasks();

}

// 💾 “base de datos local”
function saveTasks(){

localStorage.setItem(
"kanbanTasks",
JSON.stringify(tasks)
);

}

window.onclick=function(e){

if(e.target.id==="taskModal"){
document.getElementById("taskModal").style.display="none";
}

}
