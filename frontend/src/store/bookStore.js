import {create} from "zustand";
import axios from "axios";

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:3000/api/book" : "/api/book";

axios.defaults.withCredentials = true; // Enable sending cookies with requests
export const useBookStore = create((set) =>({
    book:null,
    isAuthenticated:false,
    error:null,
    loading:false,
    isCheckingAuth:true,
    message:null,
    singleBook:null,

    createBook:async(name, price, genre, description, inStock,image,pdf) => {
        set({loading:true,error:null});
        try{
            const response = await axios.post(`${API_URL}/`,{name, price, genre, description, inStock,image,pdf});
            set({book:response.data.book,isAuthenticated:true,loading:false});
            console.log("Create Book response:",response.data);
        }catch(error){
            console.error("Books error:",error.message);
            set({error:error.response.data.message || "Error Creating Book",loading:false});
            throw error;
        }
    },
    getBooks:async() => {
        set({loading:true,error:null});
        try{
            const response = await axios.get(`${API_URL}`);
            set({book:response.data.books,isAuthenticated:true,loading:false,error:null});
            console.log("getBooks response:",response.data.books);
            // return response.data;
        }catch(error){

            console.error("Login error:",error.message);
            set({error:error.response?.data?.message || "you can not fetched allbooks",loading:false});
            throw error;
        }
    },
    getBookById:async(id) => {
        set({loading:true,error:null});
        try{
            const response = await axios.get(`${API_URL}/${id}`);
            console.log("frontend logout : ",response);
              set({singleBook:response.data.book,isAuthenticated:true,loading:false,error:null});
            console.log("getBookById response:",response.data);
            // return response.data;
        }catch(error){
            console.error("getBookById error:",error.message);
            set({error: "Error getBook By Id",loading:false});
            throw error;
        }},
    getBookByAuthorId:async(id) => {
        set({loading:true,error:null});
        try{
            const response = await axios.get(`${API_URL}/author/${id}`);
            console.log("getBookByAuthorId  : ",response);
              set({book:response.data.books,isAuthenticated:true,loading:false,error:null});
            console.log("getBookByAuthorId response:",response.data);
            // return response.data;
        }catch(error){
            console.error("getBookByAuthorId error:",error.message);
            set({error: "Error get Book By Author Id ",loading:false});
            throw error;
        }},
    getBooksByGenre:async(genre) => {
        set({loading:true,error:null});
        try{
            const response = await axios.get(`${API_URL}/genre/${genre}`);
            console.log("getBooksByGenre  : ",response);
              set({book:response.data.books,isAuthenticated:true,loading:false,error:null});
            console.log("getBooksByGenre response:",response.data);
            // return response.data;
        }catch(error){
            console.error("getBooksByGenre error:",error.message);
            set({error: "Error get Book By Genre Id ",loading:false});
            throw error;
        }},
    updateBook :async({id,updates}) => {
        set({loading:true,error:null});
        try{
            const response = await axios.put(`${API_URL}/${id}`,{updates});
            set({user:response.data.book,isAuthenticated:true,loading:false});
            console.log(" updateBook response:",response.data);
            return response.data.message;
        }catch(error){
            console.error("Verify updateBook error:",error.message);
            set({error:error.response?.data?.message || "Error updateBook ",loading:false});
            return "Error updateBook ";
            // throw error;
        }
    },
    deleteBook: async (id) => {
    

        set({isCheckingAuth: true, error: null, loading: true});
        console.log("CheckAuth-fronten",id);
        
        try {
            const response = await axios.delete(`${API_URL}/${id}`);
            console.log("CheckAuth-fronten",response.data);
            set({user: response.data.userData, isAuthenticated: true, isCheckingAuth: false,loading:false});
            return response.data.message;
        }catch (error) {
            console.error("Check auth error:", error);
            set({error: null, isAuthenticated: false, isCheckingAuth: false , loading:false});
            return "Error deleting book";
        }
    },
    rate :async({bookId,rating,comment}) => {
       
        set({loading:true,error:null});
         console.log("Rate Book Response:",bookId,rating,comment);
        try{
            const response = await axios.post(`${API_URL}/rate`,{bookId,rating,comment});
            console.log("Rate Book Response:",response);
            set({message:response.data.message,loading:false});
            console.log("Rate Book Response:",response.data);
        }catch(error){
            console.error("Rate Book Response:",error);
            set({error:error.response?.data?.message || "Error Rate Book Response",loading:false});
            // throw error;
        }
    },
  
}));