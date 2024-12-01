import React, { useEffect, useState } from 'react'

function Posts() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;

    async function getPosts(url) {
        try {
            const response = await fetch(url);
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    }

    useEffect(() => {
        getPosts('https://jsonplaceholder.typicode.com/posts');
    }, []);

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = data.slice(startIndex, endIndex);

    const isPrevDisabled = page === 1;
    const isNextDisabled = endIndex >= data.length;

    return (
        <div>
            <h1>Posts</h1>
            {data.length > 0 ? (
                <ul>
                    {paginatedData.map((post) => (
                        <li key={post.id} style={{ marginBottom: '15px', listStyle: 'none' }}>
                            <strong>ID:</strong> {post.id}
                            <br />
                            <strong>Title:</strong> {post.title}
                            <br />
                            <strong>Body:</strong> {post.body}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Loading posts...</p>
            )}

            <div style={{marginTop: '20px'}}>
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={isPrevDisabled}
                >
                    Previous
                </button>
                <span style={{ margin: '0 10px' }}>Page {page}</span>
                <button
                    onClick={() => setPage((prev) => prev + 1, 1)}
                    disabled={isNextDisabled}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default Posts