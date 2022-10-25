
export const validate = (input) => {
    const error = {}

    //-- Nombre --------------------------------------------------------------------------------
    if (!input.name) {
        error.name = 'Ingrese un nombre'
    } else if (!/^[a-z]{1}/i.test(input.name)) {
        error.name = 'Los primeros 3 caracteres del nombre no puede ser espacios en blanco, digitos o caracteres especiales'
    } else if (/^[a-z](\d|\W|\s){1}/i.test(input.name)) {
        error.name = 'Los primeros 3 caracteres del nombre no puede ser espacios en blanco, digitos o caracteres especiales'
        // }else if (/^[a-z][a-z](\d|\W|\S){1}/i.test(input.name)){
        //     error.name = 'Los primeros 3 caracteres del nombre no puede ser espacios en blanco, digitos o caracteres especiales'
    } else if (input.name.trim().length < 3) {
        error.name = 'EL nombre debe contener al menos 3 letras'
    }

    //-- details     ------------------------------------------------------------------------------
    if (!input.details.length) {
        error.details = 'Ingresar una descripción'
    } else if (input.details.length > 10) {
        let borrar = input.details.length - 10;
        error.details = `Descripcion muy larga, borre ${borrar} caracteres`
    }

    if (!input.categories.length) {
        error.categories = 'Elegir al menos una categoría'
    }

    return error
}