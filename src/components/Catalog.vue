    <template>
        <div class="catalog-container">
            <span class="back-arrow" @click="goHome">←</span>

            <h1 class="title">Descubre tu fragancia ideal</h1>
            <p class="subtitle">Selecciona una categoría</p>

            <div class="button-group">
                <button class="btn" @click="selectCategory('mujer')">Para ellas</button>
                <button class="btn" @click="selectCategory('hombre')">Para ellos</button>
                <button class="btn" @click="selectCategory('unisex')">Unisex</button>
            </div>

            <div v-if="loading" class="loading">Cargando perfumes...</div>
            <div class="perfume-grid">
                <div v-for="perfume in perfumes" :key="perfume.id" class="perfume-card" @click="openPopup">
                    <img :src="perfume.imagen_url" :alt="perfume.nombre" class="perfume-image" />
                    <p>{{ perfume.nombre }}</p>
                </div>
            </div>

            <!-- Popup de presentaciones -->
            <div v-if="showPopup" class="popup-overlay" @click.self="closePopup">
                <div class="popup-content">
                    <h2>Presentaciones disponibles</h2>
                    <table class="price-table">
                        <thead>
                            <tr>
                                <th>Volumen (ml)</th>
                                <th>Precio ($)</th>
                                <th>Tipo de envase</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>30</td>
                                <td>18</td>
                                <td>Tarro clásico</td>
                            </tr>
                            <tr>
                                <td>50</td>
                                <td>25</td>
                                <td>Tarro clásico</td>
                            </tr>
                            <tr>
                                <td>60</td>
                                <td>28</td>
                                <td>Tarro clásico</td>
                            </tr>
                            <tr>
                                <td>100</td>
                                <td>36</td>
                                <td>Tarro clásico</td>
                            </tr>
                            <tr>
                                <td>100</td>
                                <td>40</td>
                                <td>Tarro original</td>
                            </tr>
                        </tbody>
                    </table>
                    <button class="close-btn" @click="closePopup">Cerrar</button>
                </div>
            </div>
        </div>
    </template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import { gql } from '@apollo/client/core'
import { apolloClient } from '../apollo/client'

const router = useRouter()

function goHome() {
    router.push('/')
}

const categoria = ref<'hombre' | 'mujer' | 'unisex' | null>(null)

function selectCategory(cat: 'hombre' | 'mujer' | 'unisex') {
    categoria.value = cat
}

const GET_PERFUMES_BY_GENERO = gql`
        query GetPerfumesByGenero($genero: String!) {
        perfumes_perfumes(where: { genero: { _eq: $genero } }, limit: 1000) {
            id
            nombre
            imagen_url
            genero
        }
        }
    `

const perfumes = ref<any[]>([])
const loading = ref(false)
const error = ref<any>(null)

const showPopup = ref(false)
function openPopup() {
    showPopup.value = true
}
function closePopup() {
    showPopup.value = false
}

watch(categoria, async (genero) => {
    if (!genero) return
    loading.value = true
    try {
        const { data } = await apolloClient.query({
            query: GET_PERFUMES_BY_GENERO,
            variables: { genero }
        })
        perfumes.value = data.perfumes_perfumes
    } catch (err) {
        console.error('Error consultando perfumes:', err)
        error.value = err
    } finally {
        loading.value = false
    }
})
</script>

<style scoped>
.catalog-container {
    min-height: 100vh;
    background-color: #000;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    text-align: center;
    position: relative;
}

.back-arrow {
    position: absolute;
    top: 20px;
    left: 20px;
    font-size: 24px;
    color: #fff;
    cursor: pointer;
    transition: opacity 0.3s ease;
}

.back-arrow:hover {
    opacity: 0.5;
}

.title {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 10px;
}

.subtitle {
    font-size: 16px;
    color: #bbb;
    margin-bottom: 40px;
}

.button-group {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 40px;
}

.btn {
    background-color: #fff;
    color: #000;
    border: none;
    border-radius: 30px;
    padding: 12px 24px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.btn:hover {
    background-color: #ddd;
}

.loading {
    font-size: 16px;
    color: #bbb;
}

.perfume-card {
    background-color: #111;
    border-radius: 10px;
    padding: 1rem;
    text-align: center;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.05);
    margin-bottom: 20px;
    cursor: pointer;
}

.perfume-image {
    width: 100%;
    max-height: 160px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 10px;
}

.popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
}

.popup-content {
    background-color: #222;
    padding: 2rem;
    border-radius: 12px;
    max-width: 400px;
    width: 100%;
    text-align: center;
    color: white;
}

.price-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
    margin-bottom: 1rem;
}

.price-table th,
.price-table td {
    border: 1px solid #666;
    padding: 8px;
    font-size: 14px;
}

.close-btn {
    background-color: #fff;
    color: #000;
    border: none;
    padding: 10px 20px;
    border-radius: 20px;
    cursor: pointer;
}

.close-btn:hover {
    background-color: #ddd;
}
.perfume-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
}

.perfume-card p {
  color: white;
  margin-top: 8px;
  font-size: 14px;
}
</style>
