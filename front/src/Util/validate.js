
export const validate = (input) => {
    const error = {}

    //-- Name --------------------------------------------------------------------------------
    if (!input.name) {
        error.name = 'Enter a name'
    } else if (!/^[a-z]{1}/i.test(input.name)) {
        error.name = 'The first 3 characters cannot be blank spaces, digits or special characters'
    } else if (/^[a-z](\d|\W|\s){1}/i.test(input.name)) {
        error.name = 'The first 3 characters cannot be blank spaces, digits or special characters'
        // }else if (/^[a-z][a-z](\d|\W|\S){1}/i.test(input.name)){
        //     error.name = 'Los primeros 3 caracteres del nombre no puede ser espacios en blanco, digitos o caracteres especiales'
    } else if (input.name.trim().length < 3) {
        error.name = 'Must contain at least 3 letters'
    }

    //-- Details     ------------------------------------------------------------------------------
    if (!input.details.length) {
        error.details = 'Enter a details'
    } else if (input.details.length > 500) {
        let borrar = input.details.length - 500;
        error.details = `Delete ${borrar} characters, it's a very long detail`
    }

    // -- Categories   ---------------------------------------------------------------------------------
    if (!input.categories.length) {
        error.categories = 'Choose one category at least'
    }

    // -- Price   --------------------------------------------------------------------------------------
    if (input.price < 0) {
        error.price = "Negative number are not allow"
    } else if (input.price == 0) {
        error.price="Can't be zero"
    } else if (input.price > 1000000) {
        error.price = "Very high number"
    }

    // -- Stock   --------------------------------------------------------------------------------------
    if (input.stock < 0) {
        error.stock = "Negative number are not allow"
    } else if (input.stock == 0) {
        error.stock="Can't be zero"
    } else if (input.stock > 1000000) {
        error.stock = "Very high number"
    }

    // -- Size   --------------------------------------------------------------------------------------
    if (!input.size.length) {
        error.size = 'Choose one size'
    }



    return error
}