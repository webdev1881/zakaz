let v = console;
(function(){
	let data = (localStorage.getItem('orderList')) ? JSON.parse(localStorage.getItem('orderList')):{
	  ids: [],
	  nams: [],
	  komms: [],
	  dats: []
	};
	let now	= function(){
		let dat = new Date(),
		month = (dat.getMonth()+1),
		date = dat.getDate();
		if(month<=9){month="0"+month};
		if(date<=9){date="0"+date};
		return date+"-"+month+"-"+dat.getFullYear();
	}();
	renderOrderoList();
	function modalFocus(){
		setTimeout(function (){nam.focus()},0);
	};
	openModal.addEventListener("click", function(){
		modalFocus();
		add.style.display = "inline";
		save.style.display = "none";
		clearModal();
	});
	let id = function(){		
		if(data.ids.length == 0){return 1}else{
			return Math.max.apply(data, data.ids)+1;					
		};
	};	
	add.addEventListener("click", function(){
		let namValue = document.getElementById('nam').value;
		let kommValue = document.getElementById('komm').value;
		add.setAttribute("data-dismiss", "modal");
		if (namValue) {
			namValue = nam.value.charAt(0).toUpperCase() + nam.value.slice(1);
			addOrder(id(), namValue, kommValue, now);
		} else{nonEmptyName()};
	});
	function addOrder(id, namValue, kommValue, now){
		addOrderToDOM(id, namValue, kommValue, now);
		data.ids.push(id);
		data.nams.push(namValue);
		data.komms.push(kommValue);
		data.dats.push(now);	
		refreshStorage();
		clearModal();
		counter();
	};
	function renderOrderoList() {
	  if (!data.ids.length) return;
	  for (let i = 0; i < data.ids.length; i++) {
		let a = data.ids[i];
		let b = data.nams[i];
		let c = data.komms[i];
		let d = data.dats[i];
		addOrderToDOM(a,b,c,d,i);
		counter();
		};
	};
	function clearModal(){
		nam.value = "";
		komm.value = "";
	};
	function nonEmptyName(){
			alert("поле Имя не может быть пустым");
			add.setAttribute("data-dismiss", "null");
			modalFocus();
	};	
	function addOrderToDOM(id,namValue,kommValue,now,i){
		let newRow = `<td class="col-xs-1">${id}</td><td class="col-xs-3">${namValue}</td><td class="col-xs-4">${kommValue}</td><td class="col-xs-2">${now}</td><td class="col-xs-2 eddel"><div class="btn btn-centered btn-default edt" data-toggle="modal" data-target="#myModal">Edit</div><div class="btn btn-centered btn-default del">Delete</div></td>`		
		let tr = document.createElement('tr');
		let tbody = document.getElementById("tbody");
		tbody.insertBefore(tr, tbody.firstChild);	
		tr.innerHTML = newRow;
		tr.getElementsByClassName("del")[0].addEventListener("click", removeOrder);
		tr.getElementsByClassName("edt")[0].addEventListener("click", editOrder);
	};
	function refreshStorage(){
		localStorage.setItem('orderList', JSON.stringify(data));
	};
	function counter(){
		document.getElementById("qty").innerHTML = (data.ids.length);
	};		
	function removeOrder() {
		let item = this.parentNode.parentNode;
		let orderName = item.firstChild.nextSibling.innerHTML;
		if( confirm("Удалить заказ " + orderName + " ?" ) ){			
		item.remove();
		let ir = item.firstChild.innerHTML;
		data.ids.forEach(function(key, i) {		
			if(ir==key){											
				let index = data.ids.indexOf(key)
				data.ids.splice(index,1);
				data.nams.splice(index,1);
				data.komms.splice(index,1);
				data.dats.splice(index,1);
			};
		});
		} else{return}
			refreshStorage();
			counter();
	};
	function editOrder(){
		modalFocus();
		add.style.display = "none";
		save.style.display = "inline";		
		let item = this.parentNode.parentNode;	
		let ir = item.firstChild.innerHTML;
		nam.value = item.firstChild.nextSibling.innerHTML;
		console.log(item)
		komm.value = item.firstChild.nextSibling.nextSibling.innerHTML;
		save.onclick = function(){
			data.ids.forEach(function(key, i) {		
			if(ir==key){
				let index = data.ids.indexOf(key);
				data.nams[index] = nam.value;
				data.komms[index] = komm.value;
				};
			});
			item.firstChild.nextSibling.innerHTML = nam.value;
			item.firstChild.nextSibling.nextSibling.innerHTML = komm.value;
			refreshStorage();
		};
	};
	test.addEventListener("click", loadTest);
	function loadTest(){
		localStorage.setItem('orderList', JSON.stringify(testJSON));
		data = JSON.parse(localStorage.getItem('orderList'))
		renderOrderoList();
	};

                loadTest();
}())



