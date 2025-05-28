<template>
  <div class="max-w-6xl mx-auto p-6 sm:p-8 space-y-6">
    <!-- Judul di luar shadow -->
    <div class="flex items-center space-x-2 text-[#252528]">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      <h2 class="text-2xl">Konfirmasi Absen</h2>
    </div>

    <!-- Box putih dengan border, rounded, shadow -->
    <div class="bg-white rounded-xl border shadow-sm p-6 space-y-6">
      <!-- Baris tanggal mulai dan jenis konfirmasi absen jadi dua kolom -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1">Tanggal Mulai</label>
          <input
            type="date"
            v-model="tanggalMulai"
            class="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1">Jenis Konfirmasi Absen</label>
          <select
            v-model="jenisKonfirmasi"
            class="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:ring-green-500 focus:border-green-500"
          >
            <option value="">Pilih Jenis</option>
            <option value="WFA">WFA</option>
            <option value="WFO">WFO</option>
          </select>
        </div>
      </div>

      <!-- Deskripsi -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-1">Deskripsi</label>
        <textarea
          v-model="deskripsi"
          rows="4"
          class="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:ring-green-500 focus:border-green-500"
        ></textarea>
      </div>

      <!-- Upload Evidence -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-1">Upload Evidence</label>
        <file-pond
          name="file"
          label-idle='Drag & Drop file di sini atau <span class="filepond--label-action">browse</span>'
          allow-multiple="false"
          accepted-file-types="image/*,application/pdf"
          :server="null"
          class="rounded-md border border-gray-300"
          @updatefiles="handleFileUpdate"
        />
      </div>

      <!-- Persetujuan Atasan -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-1">Persetujuan Atasan</label>
        <select
          v-model="atasan"
          class="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:ring-green-500 focus:border-green-500"
        >
          <option value="">Pilih Atasan</option>
          <option v-for="a in daftarAtasan" :key="a.id" :value="a.nama">
            {{ a.nama }}
          </option>
        </select>
      </div>

      <!-- Submit button -->
      <div class="text-right mt-4">
        <button
          @click="submitKonfirmasi"
          class="bg-green-700 hover:bg-green-800 text-white rounded-lg shadow px-4 py-2"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import vueFilePond from 'vue-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

// Optional plugin for images:
// import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
// import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

const FilePond = vueFilePond(FilePondPluginFileValidateType);

export default {
  components: {
    FilePond,
  },
  data() {
    return {
      tanggalMulai: '',
      jenisKonfirmasi: '',
      deskripsi: '',
      atasan: '',
      fileEvidence: null,
      daftarAtasan: [
        { id: 1, nama: 'Pak Budi' },
        { id: 2, nama: 'Bu Sari' },
        { id: 3, nama: 'Pak Dedi' },
      ],
    };
  },
  methods: {
    handleFileUpdate(files) {
      this.fileEvidence = files[0]?.file || null;
    },
    submitKonfirmasi() {
      console.log({
        tanggal: this.tanggalMulai,
        jenis: this.jenisKonfirmasi,
        deskripsi: this.deskripsi,
        atasan: this.atasan,
        file: this.fileEvidence,
      });
      alert('Konfirmasi berhasil dikirim!');
    },
  },
};
</script>
