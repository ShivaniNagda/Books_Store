import { create } from "zustand";
import axios from "axios";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000/api/book"
    : "/api/book";

axios.defaults.withCredentials = true; // Enable sending cookies with requests
export const useBookStore = create((set, get) => ({
  book: [],
  error: null,
  loading: false,
  message: null,
  singleBook: null,

  // createBook:async(name, price, genre, description, inStock,image,pdf) => {
  //     set({loading:true,error:null});
  //     try{
  //         const response = await axios.post(`${API_URL}/`,{name, price, genre, description, inStock,image,pdf});
  //         set({book:response.data.book,loading:false});
  //         await get().getBooks();
  //         console.log("Create Book response:",response.data);
  //     }catch(error){
  //         console.error("Books error:",error.message);
  //         set({error:error.response.data.message || "Error Creating Book",loading:false});
  //         throw error;
  //     }
  // },

  createBook: async (bookData) => {
    set({ loading: true, error: null });

    try {
      const formData = new FormData();

      formData.append("name", bookData.name);
      formData.append("price", bookData.price);
      formData.append("genre", bookData.genre);
      formData.append("description", bookData.description);
      formData.append("inStock", bookData.inStock);
      console.log("bookData.image ", bookData.image);
      formData.append("image", bookData.image);
      formData.append("pdf", bookData.pdf);
      for (const pair of formData.entries()) {
        console.log("FORMDATA:", pair[0], pair[1]);
      }
      const res = await axios.post(`${API_URL}/`, formData);
      console.log(res);
      set({ book: res.data.book, loading: false });
      await get().getBooks();

      return res.data;
    } catch (err) {
      set({
        loading: false,
        error: err.response?.data?.message || "Create book failed",
      });
      throw err;
    }
  },

  getBooks: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}`);
      set({ book: response.data.books, loading: false, error: null });
      console.log("getBooks response:", response.data.books);
      // return response.data;
    } catch (error) {
      console.error("Login error:", error.message);
      set({
        error: error.response?.data?.message || "you can not fetched allbooks",
        loading: false,
      });
      throw error;
    }
  },
  getBookById: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      console.log("frontend logout : ", response);
      set({ singleBook: response.data.book, loading: false, error: null });
      console.log("getBookById response:", response.data);
      // return response.data;
    } catch (error) {
      console.error("getBookById error:", error.message);
      set({ error: "Error getBook By Id", loading: false });
      throw error;
    }
  },
  getBookByAuthorId: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/author/${id}`);
      console.log("getBookByAuthorId  : ", response);
      set({ book: response.data.books, loading: false, error: null });
      console.log("getBookByAuthorId response:", response.data);
      // return response.data;
    } catch (error) {
      console.error("getBookByAuthorId error:", error.message);
      set({ error: "Error get Book By Author Id ", loading: false });
      throw error;
    }
  },
  getBooksByGenre: async (genre) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/genre/${genre}`);
      console.log("getBooksByGenre  : ", response);
      set({ book: response.data.books, loading: false, error: null });
      console.log("getBooksByGenre response:", response.data);
      // return response.data;
    } catch (error) {
      console.error("getBooksByGenre error:", error.message);
      set({ error: "Error get Book By Genre Id ", loading: false });
      throw error;
    }
  },
  // updateBook: async (
  //   id,
  //   { name, price, genre, description, inStock, image, pdf }
  // ) => {
  //   set({ loading: true, error: null });
  //   try {
  //     // console.log("id", id, "update ",name, price, genre, description, inStock, image, pdf );
  //     const response = await axios.put(`${API_URL}/${id}`, {
  //       name,
  //       price,
  //       genre,
  //       description,
  //       inStock,
  //       image,
  //       pdf,
  //     });
  //     set({ user: response.data.book, loading: false });
  //     await get().getBooks();
  //     console.log(" updateBook response:", response.data);
  //     return response.data.message;
  //   } catch (error) {
  //     console.error("Verify updateBook error:", error.message);
  //     set({
  //       error: error.response?.data?.message || "Error updateBook ",
  //       loading: false,
  //     });
  //     return "Error updateBook ";
  //     // throw error;
  //   }
  // },

updateBook: async (bookData) => {
  set({ loading: true, error: null });

  try {
    const formData = new FormData();

    formData.append("name", bookData.name);
    formData.append("price", bookData.price);
    formData.append("genre", bookData.genre);
    formData.append("description", bookData.description);
    formData.append("inStock", bookData.inStock);

    // 🔥 ONLY append if File
    if (bookData.image instanceof File) {
      formData.append("image", bookData.image);
    }

    if (bookData.pdf instanceof File) {
      formData.append("pdf", bookData.pdf);
    }

    const res = await axios.put(`${API_URL}/${bookData.id}`, formData);

    set({ loading: false });
    await get().getBooks();

    return res.data.message;
  } catch (error) {
    set({
      loading: false,
      error: error.response?.data?.message || "Error updating book",
    });
    throw error;
  }
},

//   updateBook: async ( bookData) => {
//   set({ loading: true, error: null });

//   try {
//     const formData = new FormData();
//     console.log(bookData);
//     // Text fields
//     if (bookData.name) formData.append("name", bookData.name);
//     if (bookData.price) formData.append("price", bookData.price);
//     if (bookData.genre) formData.append("genre", bookData.genre);
//     if (bookData.description) formData.append("description", bookData.description);
//     if (bookData.inStock) formData.append("inStock", bookData.inStock);

//     // // 🔥 Files (ONLY if new file selected)
//     // if (bookData.image instanceof File) {
//       formData.append("image", bookData.image);
//     // }

//     // if (bookData.pdf instanceof File) {
//       formData.append("pdf", bookData.pdf);
//     // }

//     // DEBUG (remove later)
//     for (let pair of formData.entries()) {
//       console.log("UPDATE FORM DATA:", pair[0], pair[1]);
//     }
   

//     const response = await axios.put(`${API_URL}/${bookData.id}`, formData);

//     set({ loading: false });
//     await get().getBooks();

//     return response.data.message;
//   } catch (error) {
//     console.error("updateBook error:", error);

//     set({
//       error: error.response?.data?.message || "Error updating book",
//       loading: false,
//     });

//     throw error;
//   }
// },

  deleteBook: async (id) => {
    set({ error: null, loading: true });
    console.log("CheckAuth-fronten", id);

    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      console.log("CheckAuth-fronten", response.data);
      set({ user: response.data.userData, loading: false });
      await get().getBooks();
      return response.data.message;
    } catch (error) {
      console.error("Check auth error:", error);
      set({ error: null, loading: false });
      return "Error deleting book";
    }
  },
  rate: async ({ bookId, rating, comment }) => {
    set({ loading: true, error: null });
    console.log("Rate Book Response:", bookId, rating, comment);
    try {
      const response = await axios.post(`${API_URL}/rate`, {
        bookId,
        rating,
        comment,
      });
      console.log("Rate Book Response:", response);
      set({ message: response.data.message, loading: false });
      console.log("Rate Book Response:", response.data);
    } catch (error) {
      console.error("Rate Book Response:", error);
      set({
        error: error.response?.data?.message || "Error Rate Book Response",
        loading: false,
      });
      // throw error;
    }
  },
}));
