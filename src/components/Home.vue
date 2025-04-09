<template>
    <div class="container">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/fotosfamilia-e2cf5.appspot.com/o/perfumes%2FFB_IMG_1731316013495.jpg?alt=media&token=dd7fb72f-b2f0-4447-beb9-ddc872095384"
        alt="Logo"
        class="logo"
      />
      <h1 class="title">WhiskerScent</h1>
      <p class="subtitle">Fragancias únicas para todos los estilos</p>
      <!-- <button class="btn">Explorar perfumes</button> -->
      <router-link to="/catalog" class="btn">Explorar perfumes</router-link>

    </div>
  </template>
  
  <script setup>
  // No es necesario código JS para este diseño
  </script>
  
  <style scoped>
  /* Reset total para evitar espacios externos */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  /* Contenedor que cubre toda la pantalla sin espacios */
  .container {
    height: 100vh;
    width: 100vw;
    background-color: #000;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  
  /* Logo redondo con sombra */
  .logo {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 20px;
    border: 2px solid #fff;
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
    transition: all 0.3s ease;
  }
  
  /* Título principal */
  .title {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  /* Subtítulo */
  .subtitle {
    font-size: 1rem;
    color: #bbb;
    margin-bottom: 30px;
    max-width: 600px;
  }
  
  /* Botón */
  .btn {
    background-color: #fff;
    color: #000;
    border: none;
    border-radius: 30px;
    padding: 12px 30px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .btn:hover {
    background-color: #ddd;
  }
  
  /* Escalado suave para pantallas más grandes */
  @media (min-width: 768px) {
    .logo {
      width: 150px;
      height: 150px;
    }
  
    .title {
      font-size: 3rem;
    }
  
    .subtitle {
      font-size: 1.2rem;
    }
  
    .btn {
      font-size: 1.1rem;
      padding: 14px 36px;
    }
  }
  </style>
  