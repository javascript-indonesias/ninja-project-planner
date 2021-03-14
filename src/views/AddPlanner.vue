<template>
    <form action="" @submit.prevent="sendDataSubmit">
        <label for="input_title">Title</label>
        <input
            type="text"
            name="input_title"
            id="input_title"
            placeholder="insert your title here"
            required
            v-model="stringTitle"
        />

        <label for="inputdetail">Details</label>
        <textarea
            name="inputdetail"
            id="inputdetail"
            cols="30"
            rows="10"
            placeholder="insert project detail here"
            required
            v-model="stringDetails"
        ></textarea>

        <button>Add Planner</button>
    </form>
</template>

<script>
export default {
    name: 'AddPlannerComponent',
    setup() {
        return {};
    },
    data() {
        return {
            stringTitle: '',
            stringDetails: '',
            urlRequest: `http://localhost:3000/projects`,
        };
    },
    methods: {
        async sendDataSubmit() {
            // JSON Server otomatis menambahkan id ke dalam data
            const projectItem = {
                title: this.stringTitle,
                details: this.stringDetails,
                complete: false,
            };
            try {
                const response = await fetch(this.urlRequest, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                    },
                    body: JSON.stringify(projectItem),
                });

                // Navigasi ke halaman daftar planner
                if (response.status >= 200 && response.status <= 205) {
                    this.navigateToListPlanner();
                } else {
                    throw new Error(`Gagal mengirim planner terbaru ${response.status}`);
                }
            } catch (err) {
                console.warn(err);
            }
        },
        navigateToListPlanner() {
            this.$router.replace({ name: 'Homepage' });
        },
    },
};
</script>

<style lang="scss">
form {
    background: white;
    padding: 20px;
    border-radius: 10px;
}
label {
    display: block;
    color: #bbb;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 1px;
    margin: 20px 0 10px 0;
}
input {
    padding: 10px;
    border: 0;
    border-bottom: 1px solid #ddd;
    width: 100%;
    box-sizing: border-box;
}
textarea {
    border: 1px solid #ddd;
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
    height: 100px;
}
form button {
    display: block;
    margin: 20px auto 0;
    background: #00ce89;
    color: white;
    padding: 10px;
    border: 0;
    border-radius: 6px;
    font-size: 16px;
}
</style>
