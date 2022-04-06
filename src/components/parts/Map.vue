<template>
    <div>
        <div style="max-width: 800px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between">
            <div>
                <h1>Koordinátáid:</h1>
                <p>Szélesség: {{ myCoordinates.lat }} <br> Hosszúság: {{ myCoordinates.lng }}</p>
            </div>
            <div>
                <h1>Térkép Koordinátái:</h1>
                <p>{{ mapCoordinates.lat }}, {{ mapCoordinates.lng }}</p>
            </div>
        </div>
        <GmapMap
            :center="myCoordinates"
            :zoom="zoom"
            style="width:1200px; height:700px; margin: 50px auto;"
            ref="mapRef"
            @dragend="handleDrag"
        ></GmapMap>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                map: null,
                myCoordinates: {
                    lat: 0,
                    lng: 0
                },
                zoom: 7
            }
        },

        created() {
            if(localStorage.center) {
                this.myCoordinates = JSON.parse(localStorage.center);
            } else {
                this.$getLocation({})
                    .then(coordinates => {
                        this.myCoordinates = coordinates;
                    })
                    .catch(error => alert(error));
            }
            if(localStorage.zoom) {
                this.zoom = parseInt(localStorage.zoom);
            }
        },

        mounted() {
            this.$refs.mapRef.$mapPromise.then(map => this.map = map);
        },

        methods: {
            handleDrag() {
                let center = {
                    lat: this.map.getCenter().lat(),
                    lng: this.map.getCenter().lng()
                };
                let zoom = this.map.getZoom();
                localStorage.center = JSON.stringify(center);
                localStorage.zoom = zoom;
            }
        },
        
        computed: {
            mapCoordinates() {
                if(!this.map) {
                    return {
                        lat: 0,
                        lng: 0
                    };
                }
                return {
                    lat: this.map.getCenter().lat().toFixed(4),
                    lng: this.map.getCenter().lng().toFixed(4)
                }
            }
        }
    }
</script>