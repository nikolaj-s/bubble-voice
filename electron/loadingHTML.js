module.exports = `
<head>
<style>
  * { overflow: hidden; }
  body {
    display: flex;
    width: 405px;
    height: 230px;
    padding: 10px;
    color: white;
    font-family: 'Quicksand', sans-serif;
    background-color: rgb(57, 62, 70);
    margin: 0;
    border-radius: 10px;
  }
  h1 { margin: 5px 0; font-weight: 500; }
  .icon-container img { width: 50px; height: 50px; }
  .loading-container {
    width: 100%; height: 100%;
    display: flex; flex-direction: column;
    align-items: center; justify-content: space-evenly;
  }
  .lds-ring {
    position: relative; width: 80px; height: 80px;
  }
  .lds-ring div {
    box-sizing: border-box;
    position: absolute; width: 64px; height: 64px;
    margin: 8px; border: 8px solid white;
    border-radius: 50%; animation: lds-ring 1.2s infinite;
    border-color: white transparent transparent transparent;
  }
  .lds-ring div:nth-child(1) { animation-delay: -0.45s; }
  .lds-ring div:nth-child(2) { animation-delay: -0.3s; }
  .lds-ring div:nth-child(3) { animation-delay: -0.15s; }
  @keyframes lds-ring {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
<link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500&display=swap" rel="stylesheet">
</head>
<body>
  <div class="loading-container">
    <div class='icon-container'>
      <img src="https://res.cloudinary.com/drlkgoter/image/upload/v1707433341/logo512_zjz4vu.png" />
    </div>
    <h1>Loading Bubble</h1>
    <p>This Will Take Just A Second</p>
    <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
  </div>
</body>
`;