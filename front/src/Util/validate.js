
export const validate = (input) => {
    const error = {}

    //-- Nombre --------------------------------------------------------------------------------
    if (!input.name) {
        error.name = 'name is required'
    } else if (!/^[a-z]{1}/i.test(input.name)) {
        error.name = 'The first 3 characters of the name cannot be blank spaces, digits or special characters'
    } else if (/^[a-z](\d|\W|\s){1}/i.test(input.name)) {
        error.name = 'The first 3 characters of the name cannot be blank spaces, digits or special characters'
        // }else if (/^[a-z][a-z](\d|\W|\S){1}/i.test(input.name)){
        //     error.name = 'Los primeros 3 caracteres del nombre no puede ser espacios en blanco, digitos o caracteres especiales'
    } else if (input.name.trim().length < 3) {
        error.name = 'The name must contain at least 3 letters'
    }

    //-- details     ------------------------------------------------------------------------------
    if (!input.details.length) {
        error.details = 'enter a description'
    } else if (input.details.length > 10) {
        let clean = input.details.length - 10;
        error.details = `the description is too long, delete  ${clean} characters`
    }

    if (!input.categories.length) {
        error.categories = 'Choose at least one category'
    }

    return error
}