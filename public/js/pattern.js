function Car(e){this.doors=e.doors||4,this.state=e.state||"brand new",this.color=e.color||"silver"}function Truck(e){this.state=e.state||"used",this.wheelSize=e.wheelSize||"large",this.color=e.color||"blue"}function VehicleFactory(){}function readTextFile(e){var t=new XMLHttpRequest;t.open("GET",e,!1),t.onreadystatechange=function(){if(4===t.readyState&&(200===t.status||0==t.status)){var e=t.responseText;menu_result=e,document.getElementById("main").innerHTML=e}},t.send(null)}VehicleFactory.prototype.vehicleClass=Car,VehicleFactory.prototype.createVehicle=function(e){switch(e.vehicleType){case"car":this.vehicleClass=Car;break;case"truck":this.vehicleClass=Truck}return new this.vehicleClass(e)};var carFactory=new VehicleFactory,car=carFactory.createVehicle({vehicleType:"car",color:"yellow",doors:6});console.log(car instanceof Car),console.log(car);var menu_result;