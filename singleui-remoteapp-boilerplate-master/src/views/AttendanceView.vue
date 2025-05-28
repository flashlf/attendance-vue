<script setup lang="ts">
import Map from '@/components/ui/map/Map.vue';
import Button from '@/components/ui/button/Button.vue';
import Input from '@/components/ui/input/Input.vue';
import { ref, watch, onMounted, computed } from 'vue';
import type { AttendanceValidationResponse } from '@/types/Attendance';
import { validateAttendance, checkIn, checkOut } from '@/api/feature/attendance';
import { sanitize } from '@/lib/utils';
import { toast } from 'vue-sonner';

const patternsDesc = [
  /[^\w\s.,!?-]/g,
  /\r?\n|\r/g,
  /\s+/g
];

const selectedDate = ref<string>('');
const currentTime = ref<string>('');

const _descInput = ref('');
const descInput = computed({
  get: () => _descInput.value,
  set: (val: string) => {
    const cleaned = sanitize(val, patternsDesc);
    _descInput.value = cleaned;
  }
});

const refLocId = ref('loc_1');
const refLoc = ref<typeof lokasiAbsensi | null>(null);
const lokasiAbsensi = {
  lat: -6.182591,
  lng: 106.844071,
  radius: 300
};

const lastDistance = ref<number | null>(null);
const lastUserPos = ref<{ lat: number | null; lng: number | null }>({ lat: null, lng: null });

const canAttend = ref<boolean | null>(null);
const validationInfo = ref<AttendanceValidationResponse | null>(null);
const error = ref<string | null>(null);
const loading = ref(true);

const checkingIn = ref(false);
const checkingOut = ref(false);

function updateCurrentDateTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  currentTime.value = `${hours}:${minutes}`;
}

function onDistanceComputed({ user, center, distance }: { user: any; center: any; distance: number }) {
  try {
    lastDistance.value = distance;
    lastUserPos.value = user;
  } catch (e) {
    toast.error('Gagal menghitung jarak');
    console.error('Gagal memproses distance-computed event:', e);
  }
}

function locationIsEnabled(value) {
    canAttend.value = value
}

watch(refLocId, async () => {
  try {
    const response = await fetch(`/${refLocId.value}.json`);
    if (!response.ok) {
      toast.error('Gagal mengambil area absensi');
      throw new Error('Gagal memuat data lokasi');
    }
    const data = await response.json();
    if (data?.lat != null && data?.lng != null) {
      refLoc.value = data;
    } else {
      console.warn('Data lokasi tidak valid:', data);
      refLoc.value = null;
    }
  } catch (err) {
    error.value = 'Gagal memuat data lokasi';
    refLoc.value = null;
  }
}, { immediate: true });

let validated = false;
onMounted(async () => {

  if (validated) return;
  validated = true;

  try {
    updateCurrentDateTime();
    toast.info('Memvalidasi absensi...');
    const result = await validateAttendance();
    if (result.status) {
      toast.success('Anda bisa melakukan absensi')
      canAttend.value = result.status;
    }
    validationInfo.value = result;
  } catch (err: any) {
    if (err.response?.status !== 200 && err.response?.status !== 403) {
      error.value = err.response?.data?.message || err.message || 'Terjadi kesalahan';
      toast.error(`Failed: Service Attendance Unavailable`)
    }
    if (err.response?.status === 403) {
      canAttend.value = err.response?.data?.status;
      validationInfo.value = err.response?.data;
      toast.warning('Anda sudah melakukan absensi')
    }
  } finally {
    loading.value = false;
  }
});

async function doCheckIn() {
  checkingIn.value = true;
  error.value = null;
  try {
    const permissionStatus = await navigator.permissions.query({ name: 'geolocation' as PermissionName });

    if (permissionStatus.state !== 'granted') {
      toast.info('Izin lokasi belum diberikan. Mohon aktifkan lokasi di browser Anda.');
      error.value = 'Izin lokasi belum diberikan. Mohon aktifkan lokasi di browser Anda.';
      checkingIn.value = false;
      return;
    }

    const res = await checkIn({
      latitude: lastUserPos.value.lat,
      longitude: lastUserPos.value.lng,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      description: descInput.value
    });

    if (res.status) {
      toast.success('Absensi Berhasil');
      checkingOut.value = true;
    } else {
      toast.error('Absensi Gagal');
    }
  } catch (err: any) {
    error.value = err.response?.data?.message || err.message || 'Terjadi kesalahan';
    if (err.response?.status === 403) {
      canAttend.value = err.response?.data?.status;
      validationInfo.value = err.response?.data;
      toast.warning(`${validationInfo.value?.message}`);
    } else {
        toast.error(`Failed : Service Attendance Unavailable`);
    }
  } finally {
    checkingIn.value = false;
  }
}

async function doCheckOut() {
  checkingOut.value = true;
  error.value = null;
  try {
    const res = await checkOut({
      latitude: lastUserPos.value.lat,
      longitude: lastUserPos.value.lng,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      description: descInput.value
    });
    if (res.status) {
      toast.success('Absen Pulang berhasil');
      checkingOut.value = true;
    } else {
      toast.error('Absen Pulang gagal');
    }
  } catch (err: any) {
    error.value = err.response?.data?.message || err.message || 'Terjadi kesalahan';
    toast.error(`Failed : ${error.value}`);
  } finally {
    checkingOut.value = false;
  }
}
</script>

<template>
  <div class="max-w-6xl mx-auto p-6 sm:p-8 space-y-6">
    <div class="flex items-center space-x-2 text-[#252528]">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      <h2 class="text-2xl">Absensi</h2>
    </div>

    <div class="flex flex-col lg:flex-row border rounded-xl shadow-sm overflow-hidden">
      <!-- LEFT -->
      <section class="w-full lg:w-1/2 bg-white p-6 space-y-6 border-b lg:border-b-0 lg:border-r border-gray-200">
        <div>
          <label for="attendance-date" class="block text-sm font-semibold text-gray-700 mb-1">Tanggal</label>
          <Input
            id="attendance-date"
            type="date"
            v-model="selectedDate"
            class="w-full shadow-sm focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <div>
          <label for="attendance-time" class="block text-sm font-semibold text-gray-700 mb-1">Jam Masuk</label>
          <Input
            id="attendance-time"
            type="time"
            :modelValue="currentTime"
            disabled
            class="w-full bg-gray-100 cursor-not-allowed"
            @update:modelValue="() => {}"
          />
        </div>

        <div>
          <label for="description" class="block text-sm font-semibold text-gray-700 mb-1">Deskripsi</label>
          <!-- Gunakan textarea native jika Input.vue belum support textarea -->
          <textarea
            id="description"
            v-model="descInput"
            rows="4"
            class="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:ring-green-500 focus:border-green-500"
          ></textarea>
        </div>
      </section>

      <!-- RIGHT -->
      <section class="w-full lg:w-1/2 bg-white p-6 space-y-6">
        <div>
          <label for="location" class="block text-sm font-semibold text-gray-700 mb-1">Pilih Lokasi</label>
          <select
            id="location"
            v-model="refLocId"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500"
          >
            <option value="loc_1">Kantor Jakarta</option>
            <option value="loc_2">Kantor Bandung</option>
            <option value="loc_3">Pegadaian</option>
            <option value="loc_4">Dummy</option>
          </select>
        </div>

        <!-- Status Absensi -->
        <!-- <div>
          <div v-if="loading" class="text-sm text-gray-500">🔄 Memuat data validasi...</div>
          <div v-else-if="error" class="text-sm text-red-600">❌ {{ error }}</div>
          <div v-else class="text-sm">
            <p v-if="canAttend" class="text-green-600">✅ Anda bisa melakukan absensi</p>
            <p v-else class="text-red-600">
              ❌ Tidak bisa absensi: {{ validationInfo?.message }}
              <br />
              <span class="text-xs text-gray-500">{{ validationInfo?.data?.createdAt }}</span>
            </p>
          </div>
        </div> -->

        <!-- Map -->
        <Map
          v-if="refLoc && refLoc.lat && refLoc.lng"
          :center="{ lat: refLoc.lat, lng: refLoc.lng }"
          :radius="refLoc.radius"
          :area="true"
          :calculate="true"
          @distance-computed="onDistanceComputed"
          :key="refLocId"
        />
        <Map
          v-else
          :center="{ lat: lokasiAbsensi.lat, lng: lokasiAbsensi.lng }"
          :radius="lokasiAbsensi.radius"
          :area="true"
          :calculate="true"
          @distance-computed="onDistanceComputed"
          :key="'fallback-' + refLocId"
        />

        <div v-if="lastDistance !== null" class="text-center text-sm text-gray-600 mt-2">
          <i>Jarak Anda ke lokasi:
            <span :class="{ 'text-green-700 font-semibold': lastDistance < 300, 'text-red-700 font-semibold': lastDistance > 300 }">
              {{ lastDistance }} meter
            </span>
          </i>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-end mt-4">
          <Button
            v-if="canAttend"
            @click="doCheckIn"
            class="bg-green-700 hover:bg-green-800 text-white rounded-lg shadow px-4 py-2"
          >
            Check In
          </Button>
          <Button
            v-if="checkingOut"
            @click="doCheckOut"
            class="bg-red-700 hover:bg-red-800 text-white rounded-lg shadow px-4 py-2"
          >
            Check Out
          </Button>
        </div>
      </section>
    </div>
  </div>
</template>
