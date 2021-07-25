import React from "react";
import Book from "./Book";

function BooksView({ books }) {
    return (
        <div className="row mt-30-reverse">
            {books.map(book => (
                <div className="col-lg-4 col-md-6 col-12 mt-30" key={book.id} >
                    <Book content={book} />
                </div>
            ))}
        </div>
    );
}

export default BooksView;
