<template>
    <div class="p-4 border rounded-xl shadow-md mb-4">
      <h2 class="text-lg font-bold">{{ perfume.nombre }}</h2>
      <p class="text-sm text-gray-600">{{ perfume.equivalente }}</p>
      <p class="my-1">{{ perfume.descripcion }}</p>
  
      <div v-for="p in perfume.presentaciones" :key="p.volumen_ml" class="text-sm mt-1">
        🧴 {{ p.volumen_ml }}ml - {{ p.tipo_envase }} – <strong>${{ p.precio_venta }}</strong>
      </div>
  
      <button class="mt-3 text-blue-500 underline text-sm" @click="compartir()">
        📤 Compartir por WhatsApp
      </button>
    </div>
  </template>
  
  <script lang="ts" setup>
  defineProps<{
    perfume: {
      nombre: string
      equivalente: string
      descripcion: string
      presentaciones: {
        volumen_ml: number
        tipo_envase: string
        precio_venta: number
      }[]
    }
  }>()
  
  const compartir = () => {
    const mensaje = `📦 *${perfume.nombre}*\nEquivalente: ${perfume.equivalente}\n\nPresentaciones:\n` +
      perfume.presentaciones.map(p => `- ${p.volumen_ml}ml (${p.tipo_envase}): $${p.precio_venta}`).join('\n')
  
    const url = `https://wa.me/?text=${encodeURIComponent(mensaje)}`
    window.open(url, '_blank')
  }
  </script>
  