export default (limit) => {
    const objects = ['Towel', 'Chair', 'Lamp', 'Book', 'Laptop', 'Window', 'Spoon', 'Fork', 'TV'];
    let result = {};

    let count = 0;

    while (count < limit) {
        let randomIndex = Math.floor(Math.random() * objects.length);

        while (result[randomIndex] !== "undefined")
            randomIndex = Math.floor(Math.random() * objects.length);

        result[count] = {
            object: objects[randomIndex],
            submission: 0,
            completed: false
        };
        count++;
    }

    return result;
}