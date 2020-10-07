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

let baseUrl: string = "http://anbo-carsrest.azurewebsites.net/api/cars"

new Vue({
    el: "#app",
    data: {
        cars: [],
        vendorToGetBy: "",
        idToGetBy: -1,
        singleCar: null,
        deleteId: 0,
        deleteMessage: "",
        addData: { model: "", vendor: "", price: 0 },
        addMessage: "",
        updateData: { id: 0, model: "", vendor: "", price: 0 },
        updateMessage: ""
    },
    methods: {
        getAllCars() {
            this.helperGetAndShow(baseUrl)
        },
        getByVendor(vendor: string) {
            let url = baseUrl + "/vendor/" + vendor
            this.helperGetAndShow(url)
        },
        helperGetAndShow(url: string) { // helper metode: getAllCar + getByVendor are very similar
            axios.get<ICar[]>(url)
                .then((response: AxiosResponse<ICar[]>) => {
                    this.cars = response.data
                })
                .catch((error: AxiosError) => {
                    //this.message = error.message
                    alert(error.message) // https://www.w3schools.com/js/js_popup.asp
                })
        },
        getById(id: number) {
            let url: string = baseUrl + "/" + id
            axios.get<ICar>(url)
                .then((response: AxiosResponse<ICar>) => {
                    this.singleCar = response.data
                })
                .catch((error: AxiosError) => {
                    //this.message = error.message
                    alert(error.message) // https://www.w3schools.com/js/js_popup.asp
                })
        },
        deleteCar(deleteId: number) {
            let url: string = baseUrl + "/" + deleteId
            axios.delete<void>(url)
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
            axios.post<ICar>(baseUrl, this.addData)
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
            let url: string = baseUrl + "/" + this.updateData.id
            axios.put<ICar>(url, this.updateData)
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