// 第一題
let input_task_name = document.getElementsByClassName("task_name")[0];
input_task_name.addEventListener("focus", function(){
    // console.log("focus");
    this.closest("div.task_add_block").classList.add("-on");
});

input_task_name.addEventListener("blur", function(){
    this.closest("div.task_add_block").classList.remove("-on");

})

// 第二題

  // 按下新增按Enter
let task_add = document.getElementsByClassName("task_add")[0];

input_task_name.addEventListener("keydown", function(e) {
  // 檢查是否按下的是「Enter」鍵且輸入框有值
  if (e.key === "Enter") {
    let inputText = input_task_name.value.trim();
    
    if (inputText == ""){
        return; 
    }
  let html = 
  `<li>
  <div class="item_flex">
    <div class="left_block">
      <div class="btn_flex">
        <button type="button" class="btn_up">往上</button>
        <button type="button" class="btn_down">往下</button>
      </div>
    </div>
    <div class="middle_block">
      <div class="star_block">
        <span class="star" data-star="1"><i class="fas fa-star"></i></span>
        <span class="star" data-star="2"><i class="fas fa-star"></i></span>
        <span class="star" data-star="3"><i class="fas fa-star"></i></span>
        <span class="star" data-star="4"><i class="fas fa-star"></i></span>
        <span class="star" data-star="5"><i class="fas fa-star"></i></span>
      </div>
      <p class="para">${inputText}</p>
      <input type="text" class="task_name_update -none" placeholder="更新待辦事項…" value="${inputText}">   
    </div>
    <div class="right_block">
      <div class="btn_flex">
        <button type="button" class="btn_update">更新</button>
        <button type="button" class="btn_delete">移除</button>
      </div>
    </div>
  </div>
</li>`

  let task_list= document.getElementsByClassName("task_list")[0];
  
  task_list.insertAdjacentHTML("afterbegin", html);
  input_task_name.value = "";
}

  
});

  // 按下新增按鈕
task_add.addEventListener("click",function(){
  
    let inputText = input_task_name.value.trim();
    
    if (inputText == ""){
        return; 
    }
    
  let item_id = Date.now(); // timestamp 當做該項的 id
  let html = 
  `<li data-id="${item_id}">
  <div class="item_flex">
    <div class="left_block">
      <div class="btn_flex">
        <button type="button" class="btn_up">往上</button>
        <button type="button" class="btn_down">往下</button>
      </div>
    </div>
    <div class="middle_block">
      <div class="star_block">
        <span class="star" data-star="1"><i class="fas fa-star"></i></span>
        <span class="star" data-star="2"><i class="fas fa-star"></i></span>
        <span class="star" data-star="3"><i class="fas fa-star"></i></span>
        <span class="star" data-star="4"><i class="fas fa-star"></i></span>
        <span class="star" data-star="5"><i class="fas fa-star"></i></span>
      </div>
      <p class="para">${inputText}</p>  
      <input type="text" class="task_name_update -none" placeholder="更新待辦事項…" value="${inputText}"> 
    </div>
    <div class="right_block">
      <div class="btn_flex">
        <button type="button" class="btn_update">更新</button>
        <button type="button" class="btn_delete">移除</button>
      </div>
    </div>
  </div>
</li>`

  let task_list= document.getElementsByClassName("task_list")[0];
  
  task_list.insertAdjacentHTML("afterbegin", html);
  input_task_name.value ="";


/////儲存////
  let task = {
    "item_id": item_id,
    "name": inputText, // 新增的待辦事項文字
    "star": 0 // 預設 0
  };
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  if(tasks){ // 若存在
    tasks.unshift(task);
  }else{ // 若不存在
    tasks = [task];
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
})

// 移除//////

document.addEventListener("click", function(e){
  if(e.target.classList.contains("btn_delete")){
    let r = confirm("確任移除嗎?");
    if(r){
      

      // 從localStorage移除資料

      let item_id = e.target.closest("li").getAttribute("data-id");
      //id= 1

      let tasks = JSON.parse(localStorage.getItem("tasks"));
      //  console.log(tasks)

      let updated_tasks = tasks.filter(function(item, i){
        return item_id != item.item_id;
  
      });

      // console.log(updated_tasks)



      localStorage.setItem("tasks", JSON.stringify(updated_tasks));
      e.target.closest("li").classList.add("fade_out");
      setTimeout(function(){
        e.target.closest("li").remove();     
       }, 1000);

    }
  }

});//END

// 清空///////

let btn_empty_el = document.getElementsByClassName("btn_empty")[0];
btn_empty_el .addEventListener("click", function(){
  let r = confirm("確定要清空嗎?");
  
  
  
  if(r){
      localStorage.clear();
      let task_list= document.getElementsByClassName("task_list")[0];
      
      for(let i = 0; i <task_list.children.length; i++){
        task_list.children[i].classList.add("fade_out");
      }

      setTimeout(function(){
        task_list.innerHTML="";
      },1000);
 
  }
})


/***************** 第四步：更新待辦事項 ********/

document.addEventListener("click", function(e){
  if(e.target.classList.contains("btn_update")){
    
    if(e.target.getAttribute("data-edit") == null){
      e.target.setAttribute("data-edit", true); 

      let li_el = e.target.closest("li");
      li_el.querySelector("p.para").classList.toggle("-none");
      li_el.querySelector("input.task_name_update").classList.toggle("-none");

    }else{
      let update_task_name = (e.target.closest("li").querySelector("input.task_name_update").value).trim();

      if(update_task_name == ""){
        alert("請輸入待辦事項");
      }else{
        let p_el = e.target.closest("li").querySelector("p.para");
        p_el.innerHTML = update_task_name;
        p_el.classList.toggle("-none");

        let input_update_el = e.target.closest("li").querySelector("input.task_name_update");
        input_update_el.value = update_task_name;
        input_update_el.classList.toggle("-none");
        e.target.removeAttribute("data-edit");


        // 取得待辦事項的 id////////////////////
        let item_id = e.target.closest("li").getAttribute("data-id");
        // 從 localStorage 取得資料
        let tasks = JSON.parse(localStorage.getItem("tasks"));
        tasks.forEach(function(task, i){

          if(item_id == task.item_id){
            tasks[i].name = update_task_name;
          }
          
        });
        // 回存至 localStorage
        localStorage.setItem("tasks", JSON.stringify(tasks));

      }

    }

  }
});//END


/***************** 第五步：排序 ********/
document.addEventListener("click", function(e){

  ////////////// 往上/////////////////
  //console.log( e.target.closest("li").previousElementSibling );
  if(e.target.classList.contains("btn_up") && e.target.closest("li").previousElementSibling ){

    let li_el = e.target.closest("li");
    let item_id = li_el.getAttribute("data-id");

    let clone_html = li_el.outerHTML; 
    li_el.previousElementSibling.insertAdjacentHTML("beforebegin", clone_html);
    li_el.remove();

    // 更新 //
    items_sort(item_id, "up");
  }

  //////////// 往下/////////
  if(e.target.classList.contains("btn_down") && e.target.closest("li").nextElementSibling){
    let li_el = e.target.closest("li");
    let item_id = li_el.getAttribute("data-id");

    let clone_html = li_el.outerHTML; 
    li_el.nextElementSibling.insertAdjacentHTML("afterend", clone_html);
    li_el.remove();

    //  更新 //
    items_sort(item_id, "down");
  }

});


/***************** 第六步：重要性的星號********/
document.addEventListener("click", function(e){

  //console.log(e.target);
  //console.log(e.target.closest("span"));


  if(e.target.closest("span")){

    let span_el = e.target.closest("span");
    if(span_el.classList.contains("star")){

      let current_star = parseInt(span_el.getAttribute("data-star"));

      let star_span = span_el.closest("div.star_block").querySelectorAll("span.star");
      //console.log(star_span);
      // [span, span, span, span, span]
      star_span.forEach(function(star_item, i){

        if( parseInt(star_item.getAttribute("data-star")) <= current_star ){
          star_span[i].classList.add("-on");
        }else{
          star_span[i].classList.remove("-on");
        }

      });

      //  更新 //
      let item_id = span_el.closest("li").getAttribute("data-id");

      let tasks = JSON.parse(localStorage.getItem("tasks"));

      tasks.forEach(function(task, i){
        if(item_id == task.item_id){
          tasks[i].star = current_star;
        }
      });

      localStorage.setItem("tasks", JSON.stringify(tasks));
      


    }
  }

});