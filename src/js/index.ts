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

// use https (http secure).
// http (non secure) will make the app complain about mixed content when running the app from Azure
let baseUrl: string = "https://carzealand.azurewebsites.net/api/localCars"
 
new Vue({
    el: "#app",
    data: {
        idToUpdate: null,
        cars: [],
        vendorToGetBy: "",
        idToGetBy: 1,
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
        updateCar(id: number): void {
            let uri: string = baseUrl + "/" + id
            console.log("update Car" + uri)
            axios.put<number>(uri, this.updateData)
                .then((response: AxiosResponse<number>) => {
                    let message: string = "response " + response.status + " " + response.statusText
                    this.updateMessage = message
                    this.getAllCars()
                })
                .catch((error: AxiosError) => {
                    alert(error.message)
                })
        }
    }
})