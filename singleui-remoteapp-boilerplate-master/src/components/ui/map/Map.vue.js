import { ref, watch, onMounted, nextTick } from 'vue';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '@leaflet-extensions/locatecontrol';
import '@leaflet-extensions/locatecontrol/dist/leaflet-locatecontrol.css';
const props = defineProps({
    center: {
        type: Object,
        default: null,
    },
    radius: {
        type: Number,
        default: 0,
    },
});
const mapContainer = ref(null);
const emit = defineEmits(['distance-computed']);
let mapInstance = null;
let areaCircle = null;
let userMarker = null;
let distanceLine = null;
let distanceLabel = null;
let distanceValue = ref(null);
function getDistance(latlng1, latlng2) {
    return latlng1.distanceTo(latlng2); // hasil dalam meter
}
async function initMap() {
    await nextTick();
    if (!mapContainer.value)
        return;
    mapInstance = L.map(mapContainer.value).setView([-6.1754, 106.8246], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors',
    }).addTo(mapInstance);
    // Marker posisi user (default)
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
            const userLat = pos.coords.latitude;
            const userLng = pos.coords.longitude;
            userMarker = L.marker([userLat, userLng]).addTo(mapInstance).bindPopup('Posisi Anda');
            userMarker.openPopup();
            // Jika tidak ada center props, fokus ke posisi user
            if (!props.center) {
                mapInstance.setView([userLat, userLng], 15);
            }
        }, (error) => {
            console.error('Error mendapatkan posisi user:', error);
        });
    }
    if (L.control.locate) {
        L.control.locate({
            position: 'topleft',
            setView: 'once',
            flyTo: true,
            keepCurrentZoomLevel: true,
            cacheLocations: false,
            drawCircle: false,
            showPopup: false,
            strings: {
                title: 'Current Location',
                metersUnit: 'm',
            },
        }).addTo(mapInstance);
    }
    else {
        console.error('LocateControl tidak tersedia. Pastikan plugin ter-load.');
    }
}
function updateMap() {
    if (!mapInstance)
        return;
    // Hapus circle lama jika ada
    if (areaCircle) {
        mapInstance.removeLayer(areaCircle);
        areaCircle = null;
    }
    // Jika ada center dan radius > 0
    if (props.center && props.radius > 0 && props.center.lat != null && props.center.lng != null) {
        // Gambar circle baru
        areaCircle = L.circle([props.center.lat, props.center.lng], {
            color: '#681214',
            fillColor: '#681214',
            fillOpacity: 0.3,
            radius: props.radius,
        }).addTo(mapInstance);
        // Fokus ke area radius
        mapInstance.setView([props.center.lat, props.center.lng], 15);
        // Hapus garis lama jika ada
        if (distanceLine) {
            mapInstance.removeLayer(distanceLine);
            distanceLine = null;
        }
        // Hapus label jarak lama jika ada
        if (distanceLabel) {
            mapInstance.removeLayer(distanceLabel);
            distanceLabel = null;
        }
        const userLatLng = userMarker.getLatLng();
        const centerLatLng = L.latLng(props.center.lat, props.center.lng);
        distanceLine = L.polyline([
            userMarker.getLatLng(),
            areaCircle.getLatLng(),
        ], {
            color: 'blue',
            weight: 2,
        }).addTo(mapInstance);
        // Hitung jarak
        const dist = getDistance(userLatLng, centerLatLng);
        distanceValue = dist.toFixed(0);
        // Tempatkan label jarak di tengah garis
        const midpoint = L.latLng((userLatLng.lat + centerLatLng.lat) / 2, (userLatLng.lng + centerLatLng.lng) / 2);
        const distancePopup = L.popup({
            closeButton: true,
            autoClose: false,
            className: 'custom-distance-popup',
        })
            .setLatLng(midpoint)
            .setContent(`${dist.toFixed(2)} meter`);
        distanceLine.on('mouseover', () => {
            mapInstance.openPopup(distancePopup);
        });
        distanceLine.on('mouseout', () => {
            mapInstance.closePopup(distancePopup);
        });
        // Fokus ke area radius
        mapInstance.setView(centerLatLng, 15);
        emit('distance-computed', {
            user: { lat: userLatLng.lat, lng: userLatLng.lng },
            center: { lat: centerLatLng.lat, lng: centerLatLng.lng, radius: props.radius },
            distance: distanceValue
        });
    }
    else if (userMarker) {
        // Jika center/radius gak ada, fokus ke posisi user
        mapInstance.setView(userMarker.getLatLng(), 15);
    }
}
// Inisialisasi map saat mounted
onMounted(async () => {
    await initMap();
});
// Watch properti center & radius, jalankan update ulang map
watch(() => [props.center, props.radius], () => {
    updateMap();
}, { deep: true, immediate: true });
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "mapContainer",
    ref: "mapContainer",
    ...{ class: "w-full h-64 rounded border" },
});
/** @type {typeof __VLS_ctx.mapContainer} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['h-64']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            $props: __VLS_makeOptional(props),
            ...props,
            $emit: emit,
            mapContainer: mapContainer,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {
            $props: __VLS_makeOptional(props),
            ...props,
            $emit: emit,
        };
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=Map.vue.js.map