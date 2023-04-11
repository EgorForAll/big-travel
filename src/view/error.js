import Abstract from "./abstract"

const createErrorTemplate = () => {
    return `<p class="trip-events__err">Не удалось загрузить данные, попробуйте еще раз</p>`
}

export default class Error extends Abstract {
    getTemplate() {
        return createErrorTemplate();
    }
} 