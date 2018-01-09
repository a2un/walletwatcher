<html>
<head>
 <style type="text/css">
  #test{
    width:100px;height:100px;position:relative;margin-left:100px;margin-top:100px;
  }
 </style>
</head>
<body>
<script type="text/javascript">
let elem = document.getElementById("test");
elem.addEventListener('click', function(){
 console.log('this is clicked');
});
</script>
This is test 
 <input id="test" type="button" value="testing alert" onclick="alert()"/>
</body>
</html>
