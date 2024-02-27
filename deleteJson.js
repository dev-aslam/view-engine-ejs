const fs = require('fs').promises;

async function updateMovies() {
    try {
        // Read the content of db.json asynchronously
        const data = await fs.readFile("db.json", 'utf8');
        const jsonData = JSON.parse(data);
        const updatedMovies = [];
    
        // Filter out movies with invalid posterUrls
        for (const movie of jsonData.movies) {
            const url = movie.posterUrl;
            try {
                const response = await fetch(url, { method: 'HEAD' });
                await sleep(100);
                if(response.ok) {
                    updatedMovies.push(movie);
                    console.log(true)
                }
            } catch (error) {
                console.error("Error fetching URL:", error);
            }
        }
        // Update the movies array with filtered results
        console.log(updatedMovies.length)
        jsonData.movies = updatedMovies;

        // Write the updated JSON back to db.json
        await fs.writeFile("db.json", JSON.stringify(jsonData, null, 2));
    
        console.log("Movies updated successfully.");
    }
    catch (err) {
        console.log("Error reading or writing the file: ", err);
    }
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
};

updateMovies();
