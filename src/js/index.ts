import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index"

interface ICar {
    id: number
    model: string
    vendor: string
    price: number
}

let baseUri: string = "http://anbo-carsrest.azurewebsites.net/api/cars"

new Vue({
    el: "#app",
    data: {
        cars: [],
        deleteId: 0,
        deleteMessage: "",
        formData: { model: "", vendor: "", price: 0 },
        addMessage: "",
        updateData: { id: 0, model: "", vendor: "", price: 0 },
        updateMessage: ""
    },
    methods: {
        getAllCars() {
            axios.get<ICar[]>(baseUri)
                .then((response: AxiosResponse<ICar[]>) => {
                    this.cars = response.data
                })
                .catch((error: AxiosError) => {
                    //this.message = error.message
                    alert(error.message) // https://www.w3schools.com/js/js_popup.asp
                })
        },
        deleteCar(deleteId: number) {
            let uri: string = baseUri + "/" + deleteId
            axios.delete<void>(uri)
                .then((response: AxiosResponse<void>) => {
                    this.deleteMessage = response.status + " " + response.statusText
                    this.getAllCars()
                })
                .catch((error: AxiosError) => {
                    //this.deleteMessage = error.message
                    alert(error.message)
                })
        },
        addCar() {
            axios.post<ICar>(baseUri, this.formData)
                .then((response: AxiosResponse) => {
                    let message: string = "response " + response.status + " " + response.statusText
                    this.addMessage = message
                    this.getAllCars()
                })
                .catch((error: AxiosError) => {
                    // this.addMessage = error.message
                    alert(error.message)
                })
        },
        updateCar() {
            let uri: string = baseUri + "/" + this.updateData.id
            axios.put<ICar>(uri, this.updateData)
                .then((response: AxiosResponse) => {
                    let message: string = "response " + response.status + " " + response.statusText
                    this.updateMessage = message
                    this.getAllCars()
                })
                .catch((error: AxiosError) => {
                    // this.addMessage = error.message
                    alert(error.message)
                })
        }
    }
})