export default (limit) => {
    const objects = ['Keyboard', 'Chair', 'Lamp', 'Book', 'Laptop', 'Window', 'Spoon', 'Fork', 'TV'];
    let result = {};

    let count = 0;

    while (count < limit) {

        result[count] = {
            object: objects[count],
            submission: 0
        };

        count++;
    }

    return result;
}