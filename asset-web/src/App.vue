<script setup>

import  { ref, onMounted } from 'vue'
import axios from 'axios';

const API_URL = 'http://localhost:3000/asset'

const assets = ref([])
const form = ref({ asset_name: '', stock_quantity: 0, category: 'Consumable' })
const editingId = ref(null)
const errorMessage = ref('')

async function getAssets() {
  const res = await axios.get(API_URL)
  assets.value = res.data
}

function resetForm() {
  form.value = { asset_name: '', stock_quantity: 0, category: 'Consumable' }
  editingId.value = null
  errorMessage.value = ''
}

async function saveAsset() {
  errorMessage.value = ''
  try {
    const data = { ...form.value, stock_quantity:
      Number(form.value.stock_quantity)
     }

     if (editingId.value) {
      await axios.patch(`${API_URL}/${editingId.value}`, data) 
     } else {
      await axios.post(API_URL, data)
     }

     resetForm()
     getAssets()
  } catch (error) {
    const message = error.response?.data?.message
    errorMessage.value = Array.isArray(message) ? message.join(', ') :
    message || 'Terjadi Kesalahan'
  }
}

function editAsset(asset) {
  editingId.value = asset.asset_id
  form.value = {
    asset_name: asset.asset_name,
    stock_quantity: asset.stock_quantity,
    category: asset.category,
  }
}

async function deleteAsset(id) {
  if (!confirm('Yakin ingin menghapus?')) return
  await axios.delete(`${API_URL}/${id}`)
  getAssets()
}

onMounted(getAssets)
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-10">
    <div class="mx-auto max-w-4xl px-4">
      <h1 class="mb-6 text-2xl font-bold text-gray-800">
        Data Aset Fumindo
      </h1>

      <form @submit.prevent="saveAsset" class="mb-4 flex flex-wrap gap-3 rounded-lg bg-white p-4 shadow">
        <input 
          v-model="form.asset_name"
          placeholder="Nama asset"
          required
          class="flex-1 rounded border border-gray-300 px-3 py-2"
        />

        <input 
          v-model="form.stock_quantity"
          type="number"
          min="0"
          placeholder="Jumlah Stok"
          required
          class="w-32 rounded border border-gray-300 px-3 py-2"
        />
        <select v-model="form.category" class="rounded border border-gray-300 px-3 py-2" >
          <option value="Consumable">Consumable</option>
          <option value="Non-Consumable">Non-Consumable</option>
        </select>
        <button type="submit" class="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          {{ editingId ? 'Simpan Perubahan' : "Tambah" }}
        </button>
        <button
          v-if="editingId"
          type="button"
          @click="resetForm"
          class="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
        >
          Batal
        </button>
      </form>

      <p v-if="errorMessage" class="mb-4 text-sm text-red-600" >
        {{ errorMessage }}
      </p>

      <table class="w-full overflow-hidden rounded-lg bg-white shadow">
        <thead class="bg-gray-100 text-left text-sm text-gray-600">
          <tr>
            <th class="px-4 py-3">ID</th>
            <th class="px-4 py-3">Nama Aset</th>
            <th class="px-4 py-3">Stok</th>
            <th class="px-4 py-3">Kategori</th>
            <th class="px-4 py-3">Aksi</th>
          </tr>
        </thead>
        <tbody>
        <tr v-for="asset in assets" :key="asset.asset_id" class="border-t border-gray-100" >
          <td class="px-4 py-3">{{ asset.asset_id }}</td>
          <td class="px-4 py-3">{{ asset.asset_name }}</td>
          <td class="px-4 py-3">{{ asset.stock_quantity }}</td>
          <td class="px-4 py-3">{{ asset.category }}</td>
          <td class="space-x-2 px-4 py-3">
            <button @click="editAsset(asset)" class="rounded bg-yellow-400 px-3 py-1 text-sm hover:bg-yellow-500" >
              Edit
            </button>
            <button @click="deleteAsset(asset.asset_id)" class="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600" >
              Hapus
            </button>
          </td>
      q  </tr>
        <tr v-if="assets.length === 0">
          <td colspan="5" class="px-4 py-6 text-center text-gray-500">
            Belum ada asset
          </td>
        </tr>
      </tbody>
      </table>
    </div>
  </div>

</template>

<style scoped></style>
