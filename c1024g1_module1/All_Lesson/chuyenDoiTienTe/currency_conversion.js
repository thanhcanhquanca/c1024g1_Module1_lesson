function correntMoney() {
   let _number_input = document.getElementById("numberInput").value;
   let _origin_money = document.getElementById("originalNumber").value;
   let _to_money = document.getElementById("toMoney").value;
   let result = document.getElementById("result");

   let corrent_money = {
       "VND": {"USD":0.72838 , "EUR": 0.8223},
       "USD": {"VND":23000 , "EUR":0.97},
       "EUR": {"VND":26000 , "USD": 1.52},

   };

   if (_origin_money === _to_money){
       result.innerText = `${_number_input} ${_origin_money}`
   }

   let relt = _number_input * corrent_money[_origin_money][_to_money];

   result.innerText = `${relt} ${_to_money}`;
}