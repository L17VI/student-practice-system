// Заглушка для сервисов документов
export default {
  fetchDocument(id) {
    return Promise.resolve({ id, content: 'Документ (заглушка)' })
  }
}

