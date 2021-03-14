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

        <button>Update Planner</button>
    </form>
</template>

<script>
export default {
    name: 'EditPlannerComponent',
    props: {
        id: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            stringTitle: '',
            stringDetails: '',
            urlRequest: `http://localhost:3000/projects/${this.id}`,
        };
    },
    methods: {
        async getDataProject() {
            try {
                const response = await fetch(this.urlRequest);
                const result = await response.json();
                console.log(result);
                this.setDataEdit(result);
            } catch (err) {
                console.warn(err);
            }
        },
        setDataEdit(result) {
            this.stringTitle = result.title;
            this.stringDetails = result.details;
        },
        sendDataSubmit() {},
    },
    mounted() {
        // Ambil project awalan
        this.getDataProject();
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
