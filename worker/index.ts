`use strict`;

// self.__WB_DISABLE_DEV_LOGS = true;

self.addEventListener("install", (event) => {
  console.log("installed");
  alert(2);
});

self.addEventListener("load", (evt) => {
  console.log(evt);
  alert(1);
});

console.log("worker file");
