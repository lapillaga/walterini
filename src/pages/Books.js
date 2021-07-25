import { Helmet } from "react-helmet";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Sectiontitle from "../components/Sectiontitle";
import Layout from "../components/Layout";
import Pagination from "../components/Pagination";
import BooksView from "../components/BooksView";

function Books() {
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(9);

    useEffect(() => {
        let mounted = true;
        axios.get("/api/books").then((response) => {
            if (mounted) {
                setBooks(response.data);
            }
        });
        return () => (mounted = false);
    }, [books]);

    const indexOfLastBooks = currentPage * booksPerPage;
    const indexOfFirstBooks = indexOfLastBooks - booksPerPage;
    const currentBooks = books.slice(
        indexOfFirstBooks,
        indexOfLastBooks
    );

    const paginate = (e, pageNumber) => {
        e.preventDefault();
        setCurrentPage(pageNumber);
    };

    return (
        <Layout>
            <Helmet>
                <title>Libros - Walterini</title>
                <meta
                    name="description"
                    content="Libros leidos walterini"
                />
            </Helmet>
            <div className="mi-about mi-section mi-padding-top mi-padding-bottom">
                <div className="container">
                    <Sectiontitle title="Libros leidos" />
                    {<BooksView books={currentBooks} />}
                    {!(books.length > booksPerPage) ? null : (
                        <Pagination
                            className="mt-50"
                            itemsPerPage={booksPerPage}
                            totalItems={books.length}
                            paginate={paginate}
                            currentPage={currentPage}
                        />
                    )}
                </div>
            </div>
        </Layout>
    );
}

export default Books;