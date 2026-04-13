// src/utils/adminTranslations.js

export const adminTranslations = {
  // навигация
  'Dashboard': 'Панель управления',
  'Photos': 'Фотографии',
  'Blog': 'Блог',
  'Messages': 'Сообщения',
  'Services': 'Услуги',
  'Logout': 'Выйти',
  
  // общие
  'Manage Photos': 'Управление фотографиями',
  'Manage Blog Posts': 'Управление статьями',
  'Manage Services': 'Управление услугами',
  'Contact Messages': 'Сообщения из контактной формы',
  
  // кнопки
  'Add Photo': 'Добавить фото',
  'Add Service': 'Добавить услугу',
  'New Post': 'Новая статья',
  'Edit': 'Редактировать',
  'Delete': 'Удалить',
  'Cancel': 'Отмена',
  'Create': 'Создать',
  'Update': 'Обновить',
  'Save': 'Сохранить',
  'Upload': 'Загрузить',
  
  // формы
  'Title': 'Название',
  'Description': 'Описание',
  'Category': 'Категория',
  'Price': 'Цена',
  'Features': 'Особенности',
  'Image URL': 'URL изображения',
  'Thumbnail URL': 'URL миниатюры',
  'Content': 'Содержание',
  'Excerpt': 'Краткое описание',
  'Slug': 'URL-адрес',
  'Published': 'Опубликовано',
  'Active': 'Активно',
  
  // категории
  'Wedding': 'Свадьба',
  'Portrait': 'Портрет',
  'Nature': 'Природа',
  'Street': 'Улица',
  
  // статусы
  'Published': 'Опубликовано',
  'Draft': 'Черновик',
  'Read': 'Прочитано',
  'Unread': 'Не прочитано',
  'New': 'Новое',
  
  // сообщения
  'No messages yet': 'Пока нет сообщений',
  'No photos yet': 'Пока нет фотографий',
  'No posts yet': 'Пока нет статей',
  'No services yet': 'Пока нет услуг',
  
  // уведомления
  'Photo added successfully': 'Фотография успешно добавлена',
  'Photo updated successfully': 'Фотография успешно обновлена',
  'Photo deleted successfully': 'Фотография удалена',
  'Post created successfully': 'Статья успешно создана',
  'Post updated successfully': 'Статья успешно обновлена',
  'Post deleted successfully': 'Статья удалена',
  'Service created successfully': 'Услуга успешно создана',
  'Service updated successfully': 'Услуга успешно обновлена',
  'Service deleted successfully': 'Услуга удалена',
  'Message marked as read': 'Сообщение отмечено как прочитанное',
  'Message deleted': 'Сообщение удалено',
  
  // подтверждения
  'Are you sure?': 'Вы уверены?',
  'Delete this photo?': 'Удалить это фото?',
  'Delete this post?': 'Удалить эту статью?',
  'Delete this service?': 'Удалить эту услугу?',
  'Delete this message?': 'Удалить это сообщение?',
  
  // статистика
  'Total Photos': 'Всего фото',
  'Total Posts': 'Всего статей',
  'Total Messages': 'Всего сообщений',
  'Total Services': 'Всего услуг',
  'Unread Messages': 'Непрочитанных',
  'Recent Messages': 'Последние сообщения',
  'Recent Photos': 'Последние фото',
  'Recent Posts': 'Последние статьи',
  
  // форма логина
  'Admin Login': 'Вход в админку',
  'Email': 'Email',
  'Password': 'Пароль',
  'Login': 'Войти',
  'Invalid credentials': 'Неверный email или пароль',
  'demo: admin@photographer.com / admin123': 'демо: admin@photographer.com / admin123',
  
  // тема
  'Light Mode': 'Светлая тема',
  'Dark Mode': 'Тёмная тема',
  
  // Before/After
  'Before': 'До',
  'After': 'После',
}

export const t = (key) => {
  return adminTranslations[key] || key
}