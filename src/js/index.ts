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
        deleteId: 0,
        deleteMessage: "",
        vendorToGetBy: "",
        formData: { model: "", vendor: "", price: 0 },
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
        helperGetAndShow(url: string) {
            axios.get<ICar[]>(url)
                .then((response: AxiosResponse<ICar[]>) => {
                    this.cars = response.data
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
            axios.post<ICar>(baseUrl, this.formData)
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